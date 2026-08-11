export type CommandPlatform = 'Cisco IOS' | 'MikroTik RouterOS' | 'Linux'

export interface NetworkCommand {
  id: string
  title: string
  platform: CommandPlatform
  category: string
  description: string
  command: string
  tags: string[]
}

export const commandData: NetworkCommand[] = [
  {
    id: 'cisco-show-running',
    title: 'Show Running Configuration',
    platform: 'Cisco IOS',
    category: 'Basic',
    description: 'Display the current running configuration.',
    command: 'show running-config',
    tags: ['show', 'configuration', 'basic'],
  },
  {
    id: 'cisco-show-ip-interface',
    title: 'Show IP Interfaces',
    platform: 'Cisco IOS',
    category: 'Interfaces',
    description: 'Display IP addressing and interface status.',
    command: 'show ip interface brief',
    tags: ['interface', 'ip', 'status'],
  },
  {
    id: 'cisco-enable-interface',
    title: 'Enable Interface',
    platform: 'Cisco IOS',
    category: 'Interfaces',
    description: 'Enable a Cisco interface.',
    command: 'interface GigabitEthernet0/1\nno shutdown',
    tags: ['interface', 'enable', 'shutdown'],
  },
  {
    id: 'cisco-vlan',
    title: 'Create VLAN',
    platform: 'Cisco IOS',
    category: 'VLAN',
    description: 'Create a VLAN and assign a name.',
    command: 'vlan 10\nname USERS',
    tags: ['vlan', 'switching'],
  },
  {
    id: 'cisco-access-port',
    title: 'Configure Access Port',
    platform: 'Cisco IOS',
    category: 'VLAN',
    description: 'Configure an interface as an access port.',
    command:
      'interface GigabitEthernet0/1\nswitchport mode access\nswitchport access vlan 10',
    tags: ['vlan', 'access', 'switchport'],
  },
  {
    id: 'cisco-trunk-port',
    title: 'Configure Trunk Port',
    platform: 'Cisco IOS',
    category: 'VLAN',
    description: 'Configure an interface as an 802.1Q trunk.',
    command:
      'interface GigabitEthernet0/1\nswitchport mode trunk\nswitchport trunk allowed vlan 10,20,30',
    tags: ['vlan', 'trunk', '802.1q'],
  },
  {
    id: 'cisco-ospf',
    title: 'Configure OSPF',
    platform: 'Cisco IOS',
    category: 'Routing',
    description: 'Create an OSPF process and advertise a network.',
    command:
      'router ospf 1\nnetwork 192.168.1.0 0.0.0.255 area 0',
    tags: ['ospf', 'routing', 'dynamic routing'],
  },
  {
    id: 'cisco-static-route',
    title: 'Static Route',
    platform: 'Cisco IOS',
    category: 'Routing',
    description: 'Configure a static IPv4 route.',
    command: 'ip route 192.168.20.0 255.255.255.0 192.168.1.2',
    tags: ['route', 'routing', 'static'],
  },
  {
    id: 'cisco-dhcp',
    title: 'DHCP Pool',
    platform: 'Cisco IOS',
    category: 'DHCP',
    description: 'Create a basic DHCP pool.',
    command:
      'ip dhcp pool LAN\nnetwork 192.168.10.0 255.255.255.0\ndefault-router 192.168.10.1\ndns-server 8.8.8.8',
    tags: ['dhcp', 'ip', 'server'],
  },
  {
    id: 'cisco-nat-pat',
    title: 'NAT Overload',
    platform: 'Cisco IOS',
    category: 'NAT',
    description: 'Configure PAT using an outside interface.',
    command:
      'access-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 interface GigabitEthernet0/0 overload',
    tags: ['nat', 'pat', 'overload'],
  },
  {
    id: 'cisco-acl',
    title: 'Standard ACL',
    platform: 'Cisco IOS',
    category: 'Security',
    description: 'Create a standard IPv4 access control list.',
    command:
      'access-list 10 permit 192.168.1.0 0.0.0.255',
    tags: ['acl', 'security', 'access-list'],
  },
  {
    id: 'cisco-save',
    title: 'Save Configuration',
    platform: 'Cisco IOS',
    category: 'Basic',
    description: 'Save the running configuration to startup configuration.',
    command: 'copy running-config startup-config',
    tags: ['save', 'configuration'],
  },

  {
    id: 'mikrotik-ip-address',
    title: 'Add IP Address',
    platform: 'MikroTik RouterOS',
    category: 'IP',
    description: 'Assign an IPv4 address to an interface.',
    command:
      '/ip address add address=192.168.1.1/24 interface=bridge',
    tags: ['ip', 'address', 'interface'],
  },
  {
    id: 'mikrotik-dhcp-pool',
    title: 'Create DHCP Pool',
    platform: 'MikroTik RouterOS',
    category: 'DHCP',
    description: 'Create an address pool for DHCP clients.',
    command:
      '/ip pool add name=LAN_POOL ranges=192.168.1.10-192.168.1.254',
    tags: ['dhcp', 'pool', 'ip'],
  },
  {
    id: 'mikrotik-dhcp-server',
    title: 'Create DHCP Server',
    platform: 'MikroTik RouterOS',
    category: 'DHCP',
    description: 'Create a DHCP server on an interface.',
    command:
      '/ip dhcp-server add name=dhcp-lan interface=bridge address-pool=LAN_POOL disabled=no',
    tags: ['dhcp', 'server', 'routeros'],
  },
  {
    id: 'mikrotik-nat',
    title: 'Masquerade NAT',
    platform: 'MikroTik RouterOS',
    category: 'NAT',
    description: 'Configure source NAT masquerading.',
    command:
      '/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade',
    tags: ['nat', 'masquerade', 'firewall'],
  },
  {
    id: 'mikrotik-firewall',
    title: 'Firewall Filter Rule',
    platform: 'MikroTik RouterOS',
    category: 'Firewall',
    description: 'Add a basic firewall filter rule.',
    command:
      '/ip firewall filter add chain=input protocol=tcp dst-port=22 action=accept',
    tags: ['firewall', 'filter', 'security'],
  },
  {
    id: 'mikrotik-vlan',
    title: 'Create VLAN Interface',
    platform: 'MikroTik RouterOS',
    category: 'VLAN',
    description: 'Create a VLAN interface on RouterOS.',
    command:
      '/interface vlan add name=vlan10 vlan-id=10 interface=bridge',
    tags: ['vlan', 'interface', '802.1q'],
  },
  {
    id: 'mikrotik-route',
    title: 'Static Route',
    platform: 'MikroTik RouterOS',
    category: 'Routing',
    description: 'Add an IPv4 static route.',
    command:
      '/ip route add dst-address=192.168.20.0/24 gateway=192.168.1.2',
    tags: ['route', 'routing', 'static'],
  },
  {
    id: 'mikrotik-ospf',
    title: 'Enable OSPF',
    platform: 'MikroTik RouterOS',
    category: 'Routing',
    description: 'Enable OSPF routing configuration.',
    command:
      '/routing ospf instance set [find default=yes] disabled=no',
    tags: ['ospf', 'routing', 'dynamic routing'],
  },
  {
    id: 'mikrotik-bridge',
    title: 'Create Bridge',
    platform: 'MikroTik RouterOS',
    category: 'Bridge',
    description: 'Create a software bridge interface.',
    command:
      '/interface bridge add name=bridge1',
    tags: ['bridge', 'switching', 'interface'],
  },
  {
    id: 'mikrotik-queue',
    title: 'Simple Queue',
    platform: 'MikroTik RouterOS',
    category: 'QoS',
    description: 'Limit bandwidth for a target address.',
    command:
      '/queue simple add name=LIMIT target=192.168.1.10/32 max-limit=5M/5M',
    tags: ['queue', 'qos', 'bandwidth'],
  },

  {
    id: 'linux-ip-address',
    title: 'Show Linux Addresses',
    platform: 'Linux',
    category: 'Network',
    description: 'Display network interfaces and IP addresses.',
    command: 'ip address show',
    tags: ['linux', 'ip', 'interface'],
  },
  {
    id: 'linux-route',
    title: 'Show Routing Table',
    platform: 'Linux',
    category: 'Routing',
    description: 'Display the Linux routing table.',
    command: 'ip route show',
    tags: ['linux', 'route', 'routing'],
  },
  {
    id: 'linux-ping',
    title: 'Ping Host',
    platform: 'Linux',
    category: 'Diagnostics',
    description: 'Test IP connectivity to a remote host.',
    command: 'ping -c 4 8.8.8.8',
    tags: ['ping', 'diagnostics', 'connectivity'],
  },
  {
    id: 'linux-traceroute',
    title: 'Trace Route',
    platform: 'Linux',
    category: 'Diagnostics',
    description: 'Trace the path to a remote destination.',
    command: 'traceroute 8.8.8.8',
    tags: ['traceroute', 'diagnostics'],
  },
  {
    id: 'linux-dns',
    title: 'DNS Lookup',
    platform: 'Linux',
    category: 'Diagnostics',
    description: 'Query DNS records using dig.',
    command: 'dig example.com',
    tags: ['dns', 'dig', 'diagnostics'],
  },
]
