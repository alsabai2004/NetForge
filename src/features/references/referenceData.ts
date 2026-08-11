export type ReferenceCategory =
  | 'Models'
  | 'Protocols'
  | 'Switching'
  | 'Routing'
  | 'Security'
  | 'IP Networking'
  | 'Wireless'

export interface NetworkReference {
  id: string
  title: string
  category: ReferenceCategory
  summary: string
  details: string[]
  tags: string[]
}

export const referenceData: NetworkReference[] = [
  {
    id: 'osi-model',
    title: 'OSI Model',
    category: 'Models',
    summary: 'Seven-layer reference model used to understand network communication.',
    details: [
      'Layer 7 - Application: Network services used by applications.',
      'Layer 6 - Presentation: Data formatting, encryption, and compression.',
      'Layer 5 - Session: Establishes and manages communication sessions.',
      'Layer 4 - Transport: End-to-end delivery using TCP or UDP.',
      'Layer 3 - Network: Logical addressing and routing using IP.',
      'Layer 2 - Data Link: Frames, MAC addresses, VLANs, and switching.',
      'Layer 1 - Physical: Cables, signals, connectors, and physical media.',
    ],
    tags: ['osi', 'layers', 'networking', 'tcp', 'ip'],
  },
  {
    id: 'tcp-ip-model',
    title: 'TCP/IP Model',
    category: 'Models',
    summary: 'Practical networking model used by the Internet and modern networks.',
    details: [
      'Application: HTTP, HTTPS, DNS, DHCP, SSH, FTP, and other application protocols.',
      'Transport: TCP and UDP provide transport services.',
      'Internet: IP, ICMP, and routing protocols operate here.',
      'Network Access: Ethernet, Wi-Fi, ARP, and physical transmission technologies.',
    ],
    tags: ['tcp', 'ip', 'model', 'internet'],
  },
  {
    id: 'ethernet',
    title: 'Ethernet',
    category: 'Switching',
    summary: 'Common LAN technology used to transport Ethernet frames.',
    details: [
      'Uses MAC addresses for local frame delivery.',
      'Ethernet switches learn source MAC addresses and build MAC address tables.',
      'Modern Ethernet networks normally use full-duplex communication.',
      'IEEE 802.3 defines Ethernet standards.',
    ],
    tags: ['ethernet', 'lan', 'switch', '802.3'],
  },
  {
    id: 'vlan',
    title: 'VLAN',
    category: 'Switching',
    summary: 'Logical segmentation of a Layer 2 network into separate broadcast domains.',
    details: [
      'Access ports normally carry traffic for one VLAN.',
      'Trunk ports can carry traffic for multiple VLANs.',
      'IEEE 802.1Q provides VLAN tagging for Ethernet trunks.',
      'VLANs improve segmentation, organization, and broadcast-domain control.',
    ],
    tags: ['vlan', '802.1q', 'switching', 'trunk', 'access'],
  },
  {
    id: 'stp',
    title: 'Spanning Tree Protocol',
    category: 'Switching',
    summary: 'Prevents Layer 2 loops in redundant switched networks.',
    details: [
      'STP elects a root bridge.',
      'Switches calculate paths toward the root bridge.',
      'Redundant paths can be blocked to prevent loops.',
      'RSTP provides faster convergence than traditional STP.',
    ],
    tags: ['stp', 'rstp', 'switching', 'loop', 'root bridge'],
  },
  {
    id: 'etherchannel',
    title: 'EtherChannel',
    category: 'Switching',
    summary: 'Combines multiple physical links into one logical link.',
    details: [
      'Provides increased aggregate bandwidth and link redundancy.',
      'LACP is commonly used to negotiate EtherChannel links.',
      'Cisco devices also support PAgP on compatible platforms.',
      'The member interfaces should use compatible configuration parameters.',
    ],
    tags: ['etherchannel', 'lacp', 'pagp', 'link aggregation'],
  },
  {
    id: 'ipv4',
    title: 'IPv4 Addressing',
    category: 'IP Networking',
    summary: '32-bit logical addressing system used to identify IPv4 interfaces.',
    details: [
      'IPv4 addresses contain 32 bits and are normally written in dotted-decimal notation.',
      'An address consists of a network portion and a host portion.',
      'The subnet mask or CIDR prefix determines the network boundary.',
      'Private IPv4 ranges include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.',
    ],
    tags: ['ipv4', 'addressing', 'subnet', 'network'],
  },
  {
    id: 'cidr',
    title: 'CIDR',
    category: 'IP Networking',
    summary: 'Classless Inter-Domain Routing represents IPv4 networks using prefix length notation.',
    details: [
      'A prefix such as /24 means that the first 24 bits represent the network portion.',
      'A /24 IPv4 network contains 256 total addresses.',
      'Traditional host usage usually provides 254 usable addresses in a /24 IPv4 subnet.',
      'CIDR enables flexible network allocation and route aggregation.',
    ],
    tags: ['cidr', 'subnetting', 'ipv4', 'prefix'],
  },
  {
    id: 'arp',
    title: 'ARP',
    category: 'IP Networking',
    summary: 'Maps IPv4 addresses to MAC addresses on a local network.',
    details: [
      'A host uses an ARP request to discover the MAC address associated with an IPv4 address.',
      'The destination responds with an ARP reply.',
      'ARP information is stored in an ARP cache.',
      'ARP operates within the local Layer 2 network.',
    ],
    tags: ['arp', 'mac', 'ipv4', 'layer 2'],
  },
  {
    id: 'icmp',
    title: 'ICMP',
    category: 'Protocols',
    summary: 'Network-layer protocol used for diagnostics and control messages.',
    details: [
      'Ping commonly uses ICMP Echo Request and Echo Reply messages.',
      'Traceroute can use ICMP messages depending on the implementation.',
      'ICMP is not a transport protocol like TCP or UDP.',
    ],
    tags: ['icmp', 'ping', 'traceroute', 'diagnostics'],
  },
  {
    id: 'tcp',
    title: 'TCP',
    category: 'Protocols',
    summary: 'Connection-oriented transport protocol providing reliable ordered delivery.',
    details: [
      'TCP establishes a connection before transferring application data.',
      'The three-way handshake uses SYN, SYN-ACK, and ACK.',
      'TCP provides sequencing, acknowledgments, retransmission, and flow control.',
      'Common applications include HTTP, HTTPS, SSH, and FTP.',
    ],
    tags: ['tcp', 'transport', 'reliable', 'handshake'],
  },
  {
    id: 'udp',
    title: 'UDP',
    category: 'Protocols',
    summary: 'Connectionless transport protocol with low overhead.',
    details: [
      'UDP does not establish a connection before sending data.',
      'UDP does not provide TCP-style delivery guarantees.',
      'It is commonly used for DNS, DHCP, streaming, and real-time applications.',
    ],
    tags: ['udp', 'transport', 'dns', 'dhcp'],
  },
  {
    id: 'dns',
    title: 'DNS',
    category: 'Protocols',
    summary: 'Translates domain names into IP addresses and provides other naming information.',
    details: [
      'DNS commonly uses UDP port 53 for standard queries.',
      'TCP port 53 is also used in situations such as zone transfers and some larger responses.',
      'Common record types include A, AAAA, CNAME, MX, NS, and TXT.',
    ],
    tags: ['dns', 'domain', 'name resolution', 'port 53'],
  },
  {
    id: 'dhcp',
    title: 'DHCP',
    category: 'Protocols',
    summary: 'Automatically provides hosts with IP configuration information.',
    details: [
      'The classic DHCP process is commonly summarized as Discover, Offer, Request, and Acknowledge.',
      'DHCP can provide an IP address, subnet mask, default gateway, and DNS servers.',
      'IPv4 DHCP commonly uses UDP ports 67 and 68.',
    ],
    tags: ['dhcp', 'ip', 'address', 'udp', 'port 67', 'port 68'],
  },
  {
    id: 'http-https',
    title: 'HTTP and HTTPS',
    category: 'Protocols',
    summary: 'Web application protocols used for communication between clients and web servers.',
    details: [
      'HTTP commonly uses TCP port 80.',
      'HTTPS commonly uses TCP port 443.',
      'HTTPS protects HTTP traffic using TLS encryption.',
    ],
    tags: ['http', 'https', 'web', 'tls', '80', '443'],
  },
  {
    id: 'ssh',
    title: 'SSH',
    category: 'Security',
    summary: 'Secure protocol commonly used for remote command-line administration.',
    details: [
      'SSH commonly uses TCP port 22.',
      'It provides encrypted communication between the client and server.',
      'SSH is commonly used to administer Linux systems and network devices.',
    ],
    tags: ['ssh', 'remote access', 'security', 'port 22'],
  },
  {
    id: 'nat',
    title: 'NAT',
    category: 'Security',
    summary: 'Translates IP addressing information between network contexts.',
    details: [
      'Source NAT changes the source address of packets.',
      'Destination NAT changes the destination address of packets.',
      'PAT allows multiple private hosts to share a public IPv4 address using different ports.',
      'NAT is widely used at network boundaries.',
    ],
    tags: ['nat', 'pat', 'srcnat', 'dstnat', 'address translation'],
  },
  {
    id: 'acl',
    title: 'Access Control List',
    category: 'Security',
    summary: 'Rules used to permit or deny network traffic according to defined conditions.',
    details: [
      'Standard ACLs commonly make decisions primarily using source IPv4 addresses.',
      'Extended ACLs can match additional fields such as source, destination, protocol, and ports.',
      'ACL order matters on many network platforms because rules are evaluated sequentially.',
      'An implicit deny may apply when no rule matches, depending on the platform and ACL type.',
    ],
    tags: ['acl', 'security', 'filtering', 'standard', 'extended'],
  },
  {
    id: 'firewall',
    title: 'Firewall',
    category: 'Security',
    summary: 'Controls network traffic according to security policies.',
    details: [
      'Firewalls can filter traffic based on addresses, protocols, ports, interfaces, and connection state.',
      'Stateful firewalls track the state of network connections.',
      'A good firewall policy should follow least privilege and deny unnecessary traffic.',
    ],
    tags: ['firewall', 'security', 'filtering', 'stateful'],
  },
  {
    id: 'static-routing',
    title: 'Static Routing',
    category: 'Routing',
    summary: 'Manually configured routes used to reach remote networks.',
    details: [
      'Static routes specify a destination network and a next hop or exit interface.',
      'They are predictable and simple for small or stable networks.',
      'Large dynamic environments may require routing protocols instead.',
    ],
    tags: ['routing', 'static route', 'next hop', 'ipv4'],
  },
  {
    id: 'ospf',
    title: 'OSPF',
    category: 'Routing',
    summary: 'Link-state interior gateway routing protocol widely used in enterprise networks.',
    details: [
      'OSPF uses areas to organize larger networks.',
      'Area 0 is the backbone area.',
      'OSPF uses cost as a routing metric.',
      'Routers exchange link-state information and calculate shortest paths.',
    ],
    tags: ['ospf', 'routing', 'igp', 'area', 'link state'],
  },
  {
    id: 'rip',
    title: 'RIP',
    category: 'Routing',
    summary: 'Distance-vector routing protocol using hop count as its primary metric.',
    details: [
      'RIPv2 supports classless routing and authentication options.',
      'The maximum usable hop count is 15; 16 represents unreachable.',
      'RIP is generally unsuitable for modern large networks because of its limited scale and slower convergence.',
    ],
    tags: ['rip', 'routing', 'distance vector', 'hop count'],
  },
  {
    id: 'eigrp',
    title: 'EIGRP',
    category: 'Routing',
    summary: 'Cisco-developed advanced distance-vector routing protocol.',
    details: [
      'EIGRP uses the Diffusing Update Algorithm for route calculation.',
      'It can use bandwidth and delay as important components of its metric.',
      'EIGRP supports rapid convergence and route summarization.',
    ],
    tags: ['eigrp', 'cisco', 'routing', 'duAL'],
  },
  {
    id: 'bgp',
    title: 'BGP',
    category: 'Routing',
    summary: 'Path-vector routing protocol used primarily for exchanging routes between autonomous systems.',
    details: [
      'BGP is the primary routing protocol of the Internet.',
      'eBGP is commonly used between different autonomous systems.',
      'iBGP is used to distribute BGP routes within an autonomous system.',
      'BGP uses TCP port 179.',
    ],
    tags: ['bgp', 'routing', 'internet', 'as', 'port 179'],
  },
  {
    id: 'wireless-80211',
    title: 'IEEE 802.11',
    category: 'Wireless',
    summary: 'Family of standards defining wireless LAN communication.',
    details: [
      'Wi-Fi networks use radio communication rather than physical Ethernet cabling for the wireless link.',
      'Modern Wi-Fi generations include technologies based on 802.11n, 802.11ac, and 802.11ax.',
      'Wireless security commonly uses WPA2 or WPA3.',
    ],
    tags: ['wifi', 'wireless', '802.11', 'wlan'],
  },
  {
    id: 'wpa2-wpa3',
    title: 'WPA2 and WPA3',
    category: 'Wireless',
    summary: 'Wireless security standards used to protect Wi-Fi networks.',
    details: [
      'WPA2 commonly uses AES-based encryption with CCMP.',
      'WPA3 improves wireless security and introduces stronger authentication mechanisms.',
      'Strong passwords and modern security modes should be preferred over legacy wireless security.',
    ],
    tags: ['wpa2', 'wpa3', 'wifi', 'security', 'wireless'],
  },
  {
    id: 'common-ports',
    title: 'Common TCP/UDP Ports',
    category: 'Protocols',
    summary: 'Frequently encountered network service ports.',
    details: [
      'FTP: TCP 20/21',
      'SSH: TCP 22',
      'Telnet: TCP 23',
      'SMTP: TCP 25',
      'DNS: UDP/TCP 53',
      'DHCP: UDP 67/68',
      'HTTP: TCP 80',
      'HTTPS: TCP 443',
      'BGP: TCP 179',
    ],
    tags: ['ports', 'tcp', 'udp', 'services'],
  },
]
