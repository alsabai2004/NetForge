export type SecurityCategory =
  | 'Fundamentals'
  | 'Firewall'
  | 'ACL'
  | 'Secure Management'
  | 'Network Defense'
  | 'Hardening'
  | 'Threats'
  | 'Troubleshooting'

export interface SecurityItem {
  id: string
  title: string
  category: SecurityCategory
  severity: 'Info' | 'Low' | 'Medium' | 'High' | 'Critical'
  summary: string
  details: string[]
  recommendations: string[]
  tags: string[]
}

export const securityData: SecurityItem[] = [
  {
    id: 'defense-in-depth',
    title: 'Defense in Depth',
    category: 'Fundamentals',
    severity: 'Info',
    summary:
      'Use multiple independent security controls so that failure of one control does not expose the entire network.',
    details: [
      'Security should not depend on a single firewall, password, or access control mechanism.',
      'Controls can include segmentation, authentication, firewalls, ACLs, monitoring, backups, and endpoint protection.',
      'Different security layers should protect different parts of the infrastructure.',
    ],
    recommendations: [
      'Use multiple security controls at important network boundaries.',
      'Separate user, server, management, and guest networks where appropriate.',
      'Regularly review whether each security layer is still effective.',
    ],
    tags: ['defense-in-depth', 'security', 'layers', 'network-security'],
  },

  {
    id: 'least-privilege',
    title: 'Principle of Least Privilege',
    category: 'Fundamentals',
    severity: 'High',
    summary:
      'Users, services, and devices should receive only the permissions required to perform their intended tasks.',
    details: [
      'Excessive privileges increase the impact of compromised accounts and systems.',
      'Administrative access should be restricted to trusted users and management networks.',
      'Network policies should permit only required protocols, ports, and destinations.',
    ],
    recommendations: [
      'Avoid using administrator accounts for routine tasks.',
      'Restrict management services to authorized networks.',
      'Review access permissions periodically.',
    ],
    tags: ['least-privilege', 'access-control', 'permissions', 'security'],
  },

  {
    id: 'network-segmentation',
    title: 'Network Segmentation',
    category: 'Network Defense',
    severity: 'High',
    summary:
      'Separate network resources into logical security zones to limit unnecessary communication and reduce attack impact.',
    details: [
      'VLANs can separate users, servers, guests, and management devices at Layer 2.',
      'Routing and firewall policies can control communication between security zones.',
      'Segmentation can reduce lateral movement after a device is compromised.',
    ],
    recommendations: [
      'Separate management traffic from normal user traffic.',
      'Restrict communication between VLANs to required services.',
      'Use dedicated guest networks when appropriate.',
    ],
    tags: ['segmentation', 'vlan', 'zones', 'lateral-movement'],
  },

  {
    id: 'firewall-basics',
    title: 'Firewall Fundamentals',
    category: 'Firewall',
    severity: 'High',
    summary:
      'Firewalls control network traffic according to defined security policies.',
    details: [
      'Rules can match source and destination addresses, protocols, ports, interfaces, and connection state.',
      'Stateful firewalls track active connection states.',
      'Firewall policies should distinguish between trusted, untrusted, and restricted network zones.',
    ],
    recommendations: [
      'Allow only traffic that is required.',
      'Place more specific rules before broader rules when the platform evaluates rules sequentially.',
      'Document important firewall rules.',
      'Remove obsolete rules after verifying that they are no longer required.',
    ],
    tags: ['firewall', 'filtering', 'stateful', 'security-policy'],
  },

  {
    id: 'default-deny',
    title: 'Default Deny',
    category: 'Firewall',
    severity: 'High',
    summary:
      'A default-deny security posture blocks traffic that has not been explicitly permitted.',
    details: [
      'Allow rules should define the traffic that is required for normal operation.',
      'Unmatched traffic should normally be denied at security boundaries.',
      'The exact implementation depends on the firewall or router platform.',
    ],
    recommendations: [
      'Start security policies from a restrictive baseline.',
      'Add explicit exceptions for legitimate services.',
      'Monitor denied traffic to identify required services and suspicious activity.',
    ],
    tags: ['default-deny', 'firewall', 'deny', 'allowlist'],
  },

  {
    id: 'stateful-firewall',
    title: 'Stateful Firewall Inspection',
    category: 'Firewall',
    severity: 'Medium',
    summary:
      'Stateful inspection evaluates traffic in the context of active connections.',
    details: [
      'The firewall maintains information about connection state.',
      'Return traffic for an allowed connection can be handled differently from unsolicited traffic.',
      'Stateful inspection is useful for controlling inbound and outbound communication.',
    ],
    recommendations: [
      'Understand the connection-state model of the platform being configured.',
      'Use established and related connection handling where supported and appropriate.',
      'Review invalid or unexpected connection states.',
    ],
    tags: ['stateful', 'connection-state', 'firewall', 'inspection'],
  },

  {
    id: 'standard-acl',
    title: 'Standard ACL Security',
    category: 'ACL',
    severity: 'Medium',
    summary:
      'Standard ACLs commonly control traffic primarily according to source IPv4 addresses.',
    details: [
      'They are useful when the security decision depends mainly on the source network or host.',
      'Rule order can affect the final result.',
      'Many ACL systems apply an implicit deny when no rule matches.',
    ],
    recommendations: [
      'Place ACLs where they provide the intended traffic control.',
      'Use clear rule numbering and descriptions where supported.',
      'Verify the ACL behavior after deployment.',
    ],
    tags: ['acl', 'standard-acl', 'ipv4', 'filtering'],
  },

  {
    id: 'extended-acl',
    title: 'Extended ACL Security',
    category: 'ACL',
    severity: 'High',
    summary:
      'Extended ACLs can make more detailed filtering decisions using addresses, protocols, and ports.',
    details: [
      'Rules can match source and destination addresses.',
      'Rules can commonly match protocols such as TCP, UDP, and ICMP.',
      'TCP and UDP destination or source ports can be used for service-level filtering.',
      'Rule order is important because entries are generally evaluated sequentially.',
    ],
    recommendations: [
      'Permit only required protocols and ports.',
      'Place specific rules before broad rules.',
      'Document the purpose of important ACL entries.',
      'Test both permitted and denied traffic.',
    ],
    tags: ['acl', 'extended-acl', 'tcp', 'udp', 'ports'],
  },

  {
    id: 'ssh-security',
    title: 'SSH Secure Management',
    category: 'Secure Management',
    severity: 'High',
    summary:
      'SSH provides encrypted remote administration for network devices and servers.',
    details: [
      'SSH commonly uses TCP port 22.',
      'SSH protects management traffic against simple plaintext interception.',
      'Network devices should restrict SSH access to trusted management sources.',
      'Key-based authentication can provide stronger authentication than password-only access.',
    ],
    recommendations: [
      'Disable insecure plaintext management protocols when possible.',
      'Restrict SSH access using management ACLs or firewall policies.',
      'Use strong credentials or key-based authentication.',
      'Keep device software and SSH implementations updated.',
    ],
    tags: ['ssh', 'secure-management', 'port-22', 'remote-access'],
  },

  {
    id: 'telnet-risk',
    title: 'Telnet Security Risk',
    category: 'Secure Management',
    severity: 'High',
    summary:
      'Telnet transmits management communication without the protections provided by SSH encryption.',
    details: [
      'Credentials and session data can be exposed when Telnet traffic is intercepted.',
      'Telnet may still exist on legacy infrastructure but should not normally be preferred for modern administration.',
      'Replacing Telnet with SSH reduces management-plane exposure.',
    ],
    recommendations: [
      'Prefer SSH for remote administration.',
      'Disable Telnet where it is not required.',
      'If legacy access is unavoidable, isolate and restrict it as much as possible.',
    ],
    tags: ['telnet', 'ssh', 'management', 'plaintext'],
  },

  {
    id: 'management-plane',
    title: 'Management Plane Protection',
    category: 'Secure Management',
    severity: 'High',
    summary:
      'Protect administrative interfaces and services from unnecessary network access.',
    details: [
      'Management access should be separated from ordinary user traffic when practical.',
      'Only authorized administrators should reach device management services.',
      'Management protocols include SSH, HTTPS, SNMP, and platform-specific administration services.',
    ],
    recommendations: [
      'Use a dedicated management VLAN or subnet where appropriate.',
      'Restrict management services with ACLs or firewall policies.',
      'Disable unused management services.',
      'Monitor administrative access attempts.',
    ],
    tags: ['management-plane', 'administration', 'ssh', 'snmp', 'security'],
  },

  {
    id: 'device-hardening',
    title: 'Network Device Hardening',
    category: 'Hardening',
    severity: 'High',
    summary:
      'Reduce the attack surface of routers, switches, firewalls, and other network devices.',
    details: [
      'Unused services and interfaces can increase the attack surface.',
      'Weak or default credentials create unnecessary security risk.',
      'Software updates can address known vulnerabilities and improve device security.',
      'Logging and time synchronization improve incident investigation.',
    ],
    recommendations: [
      'Change default credentials before deployment.',
      'Disable unused services and interfaces.',
      'Keep device firmware or operating systems updated.',
      'Use secure management protocols.',
      'Enable appropriate logging and time synchronization.',
    ],
    tags: ['hardening', 'router', 'switch', 'firmware', 'security'],
  },

  {
    id: 'port-security',
    title: 'Switch Port Security',
    category: 'Hardening',
    severity: 'High',
    summary:
      'Port security can restrict which devices are allowed to use a switch access port.',
    details: [
      'MAC address restrictions can reduce unauthorized device access.',
      'Violation actions vary by platform and configuration.',
      'Port security is most commonly applied to edge or access ports.',
    ],
    recommendations: [
      'Apply port security where the network design requires endpoint restrictions.',
      'Avoid applying incompatible settings to trunks or special-purpose ports.',
      'Monitor security violations and investigate unexpected devices.',
    ],
    tags: ['port-security', 'switch', 'mac', 'access-port'],
  },

  {
    id: 'dhcp-security',
    title: 'DHCP Security',
    category: 'Network Defense',
    severity: 'High',
    summary:
      'Protect DHCP infrastructure against unauthorized servers and malicious DHCP responses.',
    details: [
      'A rogue DHCP server can provide incorrect gateways, DNS servers, or IP addresses.',
      'DHCP snooping is a switch security feature available on many enterprise platforms.',
      'Trusted interfaces can be used for legitimate DHCP server paths.',
    ],
    recommendations: [
      'Use DHCP snooping where supported and appropriate.',
      'Trust only interfaces that should carry legitimate DHCP server responses.',
      'Monitor unexpected DHCP server activity.',
    ],
    tags: ['dhcp', 'dhcp-snooping', 'rogue-dhcp', 'switch-security'],
  },

  {
    id: 'arp-security',
    title: 'ARP Security',
    category: 'Network Defense',
    severity: 'High',
    summary:
      'ARP-based attacks can manipulate local address resolution and redirect traffic.',
    details: [
      'ARP does not inherently authenticate address-resolution messages.',
      'An attacker on a local network may attempt ARP spoofing or poisoning.',
      'Some managed switches provide Dynamic ARP Inspection and related protections.',
    ],
    recommendations: [
      'Use DHCP snooping as a foundation for Dynamic ARP Inspection where supported.',
      'Segment untrusted devices appropriately.',
      'Monitor unusual ARP behavior.',
    ],
    tags: ['arp', 'arp-spoofing', 'dynamic-arp-inspection', 'layer-2'],
  },

  {
    id: 'dos-defense',
    title: 'Denial-of-Service Defense',
    category: 'Threats',
    severity: 'High',
    summary:
      'DoS attacks attempt to exhaust network, system, or service resources.',
    details: [
      'An attack can target bandwidth, CPU, memory, connection tables, or application resources.',
      'Rate limiting and traffic filtering can reduce the impact of some attacks.',
      'Monitoring helps identify unusual traffic volumes and service degradation.',
    ],
    recommendations: [
      'Use appropriate rate limiting and filtering controls.',
      'Monitor traffic and device resource utilization.',
      'Maintain redundancy for critical services where practical.',
      'Coordinate with upstream providers for large-scale attacks.',
    ],
    tags: ['dos', 'ddos', 'rate-limit', 'availability'],
  },

  {
    id: 'brute-force',
    title: 'Brute-Force Protection',
    category: 'Threats',
    severity: 'High',
    summary:
      'Brute-force attacks repeatedly attempt credentials or authentication values until access is obtained.',
    details: [
      'Internet-facing management services are common targets.',
      'Repeated failed authentication attempts can indicate automated attacks.',
      'Strong authentication and access restrictions reduce exposure.',
    ],
    recommendations: [
      'Restrict management access to trusted sources.',
      'Use strong passwords or key-based authentication.',
      'Enable multi-factor authentication where supported.',
      'Monitor repeated authentication failures.',
    ],
    tags: ['brute-force', 'authentication', 'password', 'ssh'],
  },

  {
    id: 'network-scanning',
    title: 'Network Scanning Awareness',
    category: 'Threats',
    severity: 'Medium',
    summary:
      'Network scanning is commonly used to discover reachable hosts, ports, and services.',
    details: [
      'Scanning can be used for legitimate inventory and security assessment.',
      'Unauthorized scanning may indicate reconnaissance activity.',
      'Open ports should be reviewed to determine whether they are required.',
    ],
    recommendations: [
      'Maintain an inventory of authorized services.',
      'Close unnecessary ports and disable unused services.',
      'Monitor unusual scanning patterns where monitoring is available.',
    ],
    tags: ['scanning', 'reconnaissance', 'ports', 'discovery'],
  },

  {
    id: 'dns-security',
    title: 'DNS Security',
    category: 'Network Defense',
    severity: 'Medium',
    summary:
      'DNS is a critical network service and should be protected against misuse and unauthorized changes.',
    details: [
      'Incorrect DNS responses can redirect users to unintended destinations.',
      'DNS infrastructure should be limited to authorized administrative access.',
      'DNS logging can help investigate suspicious resolution activity.',
    ],
    recommendations: [
      'Use trusted DNS resolvers and secure DNS administration.',
      'Restrict unauthorized access to DNS servers.',
      'Monitor unusual DNS queries and configuration changes.',
    ],
    tags: ['dns', 'dns-security', 'resolution', 'monitoring'],
  },

  {
    id: 'nat-security',
    title: 'NAT and Security Boundaries',
    category: 'Network Defense',
    severity: 'Medium',
    summary:
      'NAT can alter address visibility but should not be treated as a complete security control.',
    details: [
      'PAT can hide private IPv4 addresses behind a public address.',
      'Destination NAT or port forwarding can intentionally expose internal services.',
      'Firewall policies should provide the actual access-control decision.',
    ],
    recommendations: [
      'Do not rely on NAT alone as a firewall.',
      'Restrict port forwarding to required services.',
      'Review exposed services regularly.',
    ],
    tags: ['nat', 'pat', 'port-forwarding', 'firewall'],
  },

  {
    id: 'logging-monitoring',
    title: 'Logging and Monitoring',
    category: 'Network Defense',
    severity: 'High',
    summary:
      'Security logs and monitoring provide visibility into authentication, configuration, and network events.',
    details: [
      'Logs can help identify failed authentication, denied traffic, configuration changes, and unusual activity.',
      'Centralized logging can make investigation easier across multiple devices.',
      'Accurate time synchronization improves event correlation.',
    ],
    recommendations: [
      'Enable appropriate security and system logging.',
      'Synchronize device clocks using a trusted time source.',
      'Review important alerts and logs regularly.',
      'Protect log storage from unauthorized modification.',
    ],
    tags: ['logging', 'monitoring', 'syslog', 'ntp', 'visibility'],
  },

  {
    id: 'backup-configuration',
    title: 'Configuration Backups',
    category: 'Hardening',
    severity: 'Medium',
    summary:
      'Secure configuration backups help restore network devices after failures or unwanted changes.',
    details: [
      'Backups should be taken after significant configuration changes.',
      'Configuration files may contain sensitive information and must be protected.',
      'A backup is useful only if it can be restored successfully.',
    ],
    recommendations: [
      'Maintain regular configuration backups.',
      'Protect backup files with appropriate access controls.',
      'Keep copies in a separate location from the production device.',
      'Periodically test restoration procedures.',
    ],
    tags: ['backup', 'configuration', 'recovery', 'availability'],
  },

  {
    id: 'security-troubleshooting',
    title: 'Security Troubleshooting',
    category: 'Troubleshooting',
    severity: 'Info',
    summary:
      'Use a structured process to determine whether connectivity problems are caused by security controls.',
    details: [
      'Verify whether the traffic reaches the expected interface or security boundary.',
      'Check ACL and firewall rules in their evaluation order.',
      'Confirm source and destination addresses, protocols, and ports.',
      'Review logs and counters where available.',
      'Test with the minimum required change rather than disabling all security controls.',
    ],
    recommendations: [
      'Do not permanently disable security controls just to make a connection work.',
      'Record the original policy before troubleshooting changes.',
      'Use controlled tests and restore temporary changes after testing.',
      'Document the final cause and corrective action.',
    ],
    tags: ['troubleshooting', 'firewall', 'acl', 'logs', 'security'],
  },
]
