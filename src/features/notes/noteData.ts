export type NoteCategory =
  | 'Fundamentals'
  | 'Switching'
  | 'Routing'
  | 'Services'
  | 'Security'
  | 'Cisco'
  | 'MikroTik'

export interface NetworkNote {
  id: string
  title: string
  category: NoteCategory
  summary: string
  sections: {
    title: string
    content: string[]
  }[]
  tags: string[]
}

export const noteData: NetworkNote[] = [
  {
    id: 'osi-model',
    title: 'OSI Model',
    category: 'Fundamentals',
    summary:
      'The OSI model divides network communication into seven logical layers.',
    sections: [
      {
        title: 'Layers',
        content: [
          'Layer 7 - Application: Provides network services directly to applications.',
          'Layer 6 - Presentation: Handles data formatting, encryption, and compression.',
          'Layer 5 - Session: Establishes, manages, and terminates communication sessions.',
          'Layer 4 - Transport: Provides end-to-end delivery using TCP and UDP.',
          'Layer 3 - Network: Handles logical addressing and routing using IP.',
          'Layer 2 - Data Link: Handles frames, MAC addresses, VLANs, and switching.',
          'Layer 1 - Physical: Transmits raw bits through cables, fiber, radio, and other media.',
        ],
      },
      {
        title: 'Troubleshooting',
        content: [
          'Start troubleshooting from the physical layer and move upward.',
          'Check cables, interfaces, VLANs, IP addressing, routing, and application services.',
        ],
      },
    ],
    tags: ['osi', 'layers', 'networking', 'troubleshooting'],
  },

  {
    id: 'tcp-ip',
    title: 'TCP/IP Model',
    category: 'Fundamentals',
    summary:
      'The TCP/IP model describes the protocols and layers used by modern Internet networks.',
    sections: [
      {
        title: 'Layers',
        content: [
          'Application: HTTP, HTTPS, DNS, DHCP, SSH, FTP, and other application protocols.',
          'Transport: TCP and UDP provide transport services.',
          'Internet: IP, ICMP, and routing operate at this layer.',
          'Network Access: Ethernet, Wi-Fi, ARP, and physical transmission technologies.',
        ],
      },
    ],
    tags: ['tcp', 'ip', 'model', 'internet'],
  },

  {
    id: 'ipv4-subnetting',
    title: 'IPv4 Subnetting',
    category: 'Fundamentals',
    summary:
      'Subnetting divides an IPv4 network into smaller logical networks.',
    sections: [
      {
        title: 'Important Concepts',
        content: [
          'IPv4 addresses contain 32 bits.',
          'CIDR notation such as /24 identifies the network prefix length.',
          'A /24 network contains 256 total addresses.',
          'A normal /24 subnet provides 254 usable host addresses.',
          'The network address identifies the subnet.',
          'The broadcast address is used to reach all hosts in the subnet.',
          'Host addresses are assigned between the network and broadcast addresses.',
        ],
      },
      {
        title: 'Common Prefixes',
        content: [
          '/30 provides 4 total addresses and is commonly used for point-to-point links.',
          '/29 provides 8 total addresses.',
          '/28 provides 16 total addresses.',
          '/27 provides 32 total addresses.',
          '/26 provides 64 total addresses.',
          '/25 provides 128 total addresses.',
          '/24 provides 256 total addresses.',
        ],
      },
    ],
    tags: ['ipv4', 'subnetting', 'cidr', 'network', 'broadcast'],
  },

  {
    id: 'vlan',
    title: 'VLAN',
    category: 'Switching',
    summary:
      'VLANs logically divide a switched network into separate broadcast domains.',
    sections: [
      {
        title: 'Access Ports',
        content: [
          'An access port normally belongs to a single VLAN.',
          'End-user devices such as PCs and printers are commonly connected to access ports.',
        ],
      },
      {
        title: 'Trunk Ports',
        content: [
          'A trunk carries traffic for multiple VLANs.',
          'IEEE 802.1Q provides VLAN tagging on Ethernet trunks.',
          'Trunks are commonly used between switches and between switches and routers.',
        ],
      },
      {
        title: 'Benefits',
        content: [
          'VLANs reduce broadcast-domain size.',
          'They improve network organization and segmentation.',
          'They can separate departments or security zones logically.',
        ],
      },
    ],
    tags: ['vlan', 'switching', 'trunk', 'access', '802.1q'],
  },

  {
    id: 'inter-vlan-routing',
    title: 'Inter-VLAN Routing',
    category: 'Routing',
    summary:
      'Inter-VLAN routing allows hosts in different VLANs to communicate.',
    sections: [
      {
        title: 'Router-on-a-Stick',
        content: [
          'A router interface is configured with multiple subinterfaces.',
          'Each subinterface is associated with a VLAN.',
          'The switch-to-router link must operate as a trunk.',
          'Each subinterface receives an IP address that acts as the gateway for its VLAN.',
        ],
      },
      {
        title: 'Layer 3 Switching',
        content: [
          'A multilayer switch can route between VLANs using switched virtual interfaces.',
          'Each VLAN normally receives an SVI with an IP address.',
        ],
      },
    ],
    tags: ['vlan', 'routing', 'router-on-a-stick', 'svi'],
  },

  {
    id: 'stp',
    title: 'Spanning Tree Protocol',
    category: 'Switching',
    summary:
      'STP prevents Layer 2 loops when redundant switch paths exist.',
    sections: [
      {
        title: 'How STP Works',
        content: [
          'Switches exchange Bridge Protocol Data Units.',
          'A root bridge is elected.',
          'Switches calculate paths toward the root.',
          'Redundant paths can be placed into a blocking state.',
        ],
      },
      {
        title: 'RSTP',
        content: [
          'Rapid Spanning Tree Protocol provides faster convergence than traditional STP.',
          'RSTP is commonly preferred in modern switched networks.',
        ],
      },
    ],
    tags: ['stp', 'rstp', 'switching', 'loop', 'root bridge'],
  },

  {
    id: 'etherchannel',
    title: 'EtherChannel',
    category: 'Switching',
    summary:
      'EtherChannel combines multiple physical Ethernet links into one logical connection.',
    sections: [
      {
        title: 'Benefits',
        content: [
          'Increases aggregate bandwidth.',
          'Provides link redundancy.',
          'Creates a logical Port-Channel interface.',
        ],
      },
      {
        title: 'Negotiation',
        content: [
          'LACP is an open standard commonly used for link aggregation.',
          'Cisco devices may also support PAgP.',
          'Member interfaces must have compatible configuration parameters.',
        ],
      },
    ],
    tags: ['etherchannel', 'lacp', 'pagp', 'port-channel'],
  },

  {
    id: 'static-routing',
    title: 'Static Routing',
    category: 'Routing',
    summary:
      'Static routes are manually configured paths to remote networks.',
    sections: [
      {
        title: 'Concept',
        content: [
          'A static route identifies a destination network and a next hop or exit interface.',
          'Static routing is predictable and simple for small networks.',
          'It does not automatically adapt to topology changes.',
        ],
      },
      {
        title: 'Use Cases',
        content: [
          'Small networks.',
          'Stub networks.',
          'Default routes.',
          'Specific backup paths.',
        ],
      },
    ],
    tags: ['routing', 'static', 'next-hop', 'default-route'],
  },

  {
    id: 'ospf',
    title: 'OSPF',
    category: 'Routing',
    summary:
      'OSPF is a link-state interior gateway routing protocol.',
    sections: [
      {
        title: 'Core Concepts',
        content: [
          'OSPF uses areas to organize routing information.',
          'Area 0 is the backbone area.',
          'Routers exchange link-state information.',
          'The shortest-path algorithm is used to calculate routes.',
          'Cost is used as the primary routing metric.',
        ],
      },
      {
        title: 'Important Terms',
        content: [
          'Router ID identifies an OSPF router.',
          'Neighbors form adjacencies when required conditions are satisfied.',
          'LSAs carry link-state information.',
        ],
      },
    ],
    tags: ['ospf', 'routing', 'igp', 'area', 'link-state'],
  },

  {
    id: 'rip',
    title: 'RIP',
    category: 'Routing',
    summary:
      'RIP is a distance-vector routing protocol based primarily on hop count.',
    sections: [
      {
        title: 'Important Facts',
        content: [
          'RIPv2 supports classless routing.',
          'The maximum usable hop count is 15.',
          'A metric of 16 represents an unreachable destination.',
          'RIP has slower convergence and limited scalability compared with modern routing protocols.',
        ],
      },
    ],
    tags: ['rip', 'routing', 'distance-vector', 'hop-count'],
  },

  {
    id: 'eigrp',
    title: 'EIGRP',
    category: 'Routing',
    summary:
      'EIGRP is an advanced distance-vector routing protocol developed by Cisco.',
    sections: [
      {
        title: 'Core Concepts',
        content: [
          'EIGRP uses the Diffusing Update Algorithm.',
          'Bandwidth and delay are important components of its metric.',
          'EIGRP supports rapid convergence.',
          'Route summarization can reduce routing information.',
        ],
      },
    ],
    tags: ['eigrp', 'cisco', 'routing', 'distant-vector', 'ddu'],
  },

  {
    id: 'dhcp',
    title: 'DHCP',
    category: 'Services',
    summary:
      'DHCP automatically provides hosts with IP configuration information.',
    sections: [
      {
        title: 'DORA',
        content: [
          'Discover: The client searches for a DHCP server.',
          'Offer: The server offers configuration information.',
          'Request: The client requests the offered configuration.',
          'Acknowledge: The server confirms the lease.',
        ],
      },
      {
        title: 'Common Information',
        content: [
          'IP address.',
          'Subnet mask.',
          'Default gateway.',
          'DNS server.',
          'Lease duration.',
        ],
      },
    ],
    tags: ['dhcp', 'dora', 'ip', 'dns', 'gateway'],
  },

  {
    id: 'dns',
    title: 'DNS',
    category: 'Services',
    summary:
      'DNS translates domain names into IP addresses and other resource information.',
    sections: [
      {
        title: 'Common Records',
        content: [
          'A maps a hostname to an IPv4 address.',
          'AAAA maps a hostname to an IPv6 address.',
          'CNAME creates an alias for another hostname.',
          'MX identifies mail servers.',
          'NS identifies authoritative name servers.',
          'TXT stores text-based information.',
        ],
      },
      {
        title: 'Ports',
        content: [
          'DNS commonly uses UDP port 53 for normal queries.',
          'TCP port 53 is also used for specific DNS operations.',
        ],
      },
    ],
    tags: ['dns', 'domain', 'records', 'port 53'],
  },

  {
    id: 'nat',
    title: 'NAT and PAT',
    category: 'Security',
    summary:
      'NAT translates IP addressing information between network boundaries.',
    sections: [
      {
        title: 'Types',
        content: [
          'Source NAT changes the source address of packets.',
          'Destination NAT changes the destination address of packets.',
          'PAT allows multiple private hosts to share a public IPv4 address using different ports.',
        ],
      },
      {
        title: 'Common Uses',
        content: [
          'Internet access for private IPv4 networks.',
          'Port forwarding to internal services.',
          'Address translation at network boundaries.',
        ],
      },
    ],
    tags: ['nat', 'pat', 'srcnat', 'dstnat', 'port-forwarding'],
  },

  {
    id: 'acl',
    title: 'Access Control Lists',
    category: 'Security',
    summary:
      'ACLs control whether traffic is permitted or denied according to defined rules.',
    sections: [
      {
        title: 'Types',
        content: [
          'Standard ACLs commonly match source IPv4 addresses.',
          'Extended ACLs can match source, destination, protocol, and ports.',
        ],
      },
      {
        title: 'Important Rule',
        content: [
          'ACL entries are normally processed sequentially.',
          'The order of rules can affect the final result.',
          'An implicit deny may apply when no rule matches.',
        ],
      },
    ],
    tags: ['acl', 'security', 'filtering', 'standard', 'extended'],
  },

  {
    id: 'firewall',
    title: 'Firewall Basics',
    category: 'Security',
    summary:
      'Firewalls enforce security policies by controlling network traffic.',
    sections: [
      {
        title: 'Filtering',
        content: [
          'Traffic can be filtered by source and destination addresses.',
          'Rules can match protocols and ports.',
          'Interfaces can be used as traffic boundaries.',
          'Stateful firewalls can track connection state.',
        ],
      },
      {
        title: 'Best Practice',
        content: [
          'Allow only traffic that is required.',
          'Use clear rule descriptions.',
          'Review and remove obsolete rules.',
          'Log important security events when appropriate.',
        ],
      },
    ],
    tags: ['firewall', 'security', 'filtering', 'stateful'],
  },

  {
    id: 'ssh',
    title: 'SSH',
    category: 'Security',
    summary:
      'SSH provides encrypted remote administration of servers and network devices.',
    sections: [
      {
        title: 'Important Facts',
        content: [
          'SSH commonly uses TCP port 22.',
          'SSH encrypts the management session.',
          'It is commonly used for Linux, Cisco, and MikroTik administration.',
          'Key-based authentication can improve security compared with password-only access.',
        ],
      },
    ],
    tags: ['ssh', 'remote-access', 'security', 'port 22'],
  },

  {
    id: 'cisco-interface',
    title: 'Cisco Interface Configuration',
    category: 'Cisco',
    summary:
      'Basic Cisco IOS interface configuration used to assign addressing and enable ports.',
    sections: [
      {
        title: 'Common Commands',
        content: [
          'interface GigabitEthernet0/1',
          'description LAN_CONNECTION',
          'ip address 192.168.1.1 255.255.255.0',
          'no shutdown',
        ],
      },
      {
        title: 'Verification',
        content: [
          'show ip interface brief displays interface status and IP addressing.',
          'show running-config displays the active configuration.',
        ],
      },
    ],
    tags: ['cisco', 'ios', 'interface', 'ip-address'],
  },

  {
    id: 'cisco-vlan',
    title: 'Cisco VLAN Configuration',
    category: 'Cisco',
    summary:
      'Basic Cisco IOS commands for creating VLANs and assigning switch ports.',
    sections: [
      {
        title: 'Create VLAN',
        content: [
          'vlan 10',
          'name USERS',
        ],
      },
      {
        title: 'Access Port',
        content: [
          'interface GigabitEthernet0/1',
          'switchport mode access',
          'switchport access vlan 10',
        ],
      },
      {
        title: 'Trunk',
        content: [
          'interface GigabitEthernet0/24',
          'switchport mode trunk',
          'switchport trunk allowed vlan 10,20,30',
        ],
      },
    ],
    tags: ['cisco', 'vlan', 'access', 'trunk', 'switchport'],
  },

  {
    id: 'cisco-ospf',
    title: 'Cisco OSPF Configuration',
    category: 'Cisco',
    summary:
      'Basic OSPF configuration for advertising an IPv4 network.',
    sections: [
      {
        title: 'Configuration',
        content: [
          'router ospf 1',
          'network 192.168.1.0 0.0.0.255 area 0',
        ],
      },
      {
        title: 'Verification',
        content: [
          'show ip ospf neighbor',
          'show ip route ospf',
          'show ip ospf interface',
        ],
      },
    ],
    tags: ['cisco', 'ospf', 'routing', 'area 0'],
  },

  {
    id: 'mikrotik-ip',
    title: 'MikroTik IP Address',
    category: 'MikroTik',
    summary:
      'Assign an IPv4 address to a MikroTik RouterOS interface.',
    sections: [
      {
        title: 'Command',
        content: [
          '/ip address add address=192.168.1.1/24 interface=bridge',
        ],
      },
      {
        title: 'Verification',
        content: [
          '/ip address print',
          '/interface print',
        ],
      },
    ],
    tags: ['mikrotik', 'routeros', 'ip', 'address'],
  },

  {
    id: 'mikrotik-dhcp',
    title: 'MikroTik DHCP',
    category: 'MikroTik',
    summary:
      'Basic RouterOS commands for creating a DHCP pool and server.',
    sections: [
      {
        title: 'Pool',
        content: [
          '/ip pool add name=LAN_POOL ranges=192.168.1.10-192.168.1.254',
        ],
      },
      {
        title: 'Server',
        content: [
          '/ip dhcp-server add name=dhcp-lan interface=bridge address-pool=LAN_POOL disabled=no',
          '/ip dhcp-server network add address=192.168.1.0/24 gateway=192.168.1.1 dns-server=8.8.8.8,1.1.1.1',
        ],
      },
    ],
    tags: ['mikrotik', 'dhcp', 'routeros', 'pool'],
  },

  {
    id: 'mikrotik-nat',
    title: 'MikroTik NAT',
    category: 'MikroTik',
    summary:
      'Basic RouterOS NAT rules for Internet sharing and port forwarding.',
    sections: [
      {
        title: 'Masquerade',
        content: [
          '/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade',
        ],
      },
      {
        title: 'Port Forwarding',
        content: [
          '/ip firewall nat add chain=dstnat in-interface=ether1 protocol=tcp dst-port=80 action=dst-nat to-addresses=192.168.1.10 to-ports=80',
        ],
      },
    ],
    tags: ['mikrotik', 'nat', 'masquerade', 'dstnat'],
  },

  {
    id: 'network-troubleshooting',
    title: 'Network Troubleshooting',
    category: 'Fundamentals',
    summary:
      'A structured process for diagnosing network connectivity problems.',
    sections: [
      {
        title: 'Basic Sequence',
        content: [
          'Check physical connectivity first.',
          'Verify interface status.',
          'Check VLAN assignment and trunk configuration.',
          'Verify IP address and subnet mask.',
          'Test the default gateway.',
          'Check routing tables.',
          'Test DNS resolution separately from IP connectivity.',
          'Review firewall and ACL policies.',
        ],
      },
      {
        title: 'Useful Tests',
        content: [
          'ping tests basic IP reachability.',
          'traceroute or tracert helps identify the path toward a destination.',
          'show ip interface brief is useful on Cisco IOS.',
          '/ip route print is useful on MikroTik RouterOS.',
        ],
      },
    ],
    tags: ['troubleshooting', 'ping', 'routing', 'vlan', 'dns'],
  },
]
