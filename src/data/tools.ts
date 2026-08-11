import {
  Calculator,
  GitBranch,
  Router,
  Server,
  Terminal,
  Network,
  Globe,
  ShieldCheck,
} from 'lucide-react'

export const tools = [
  {
    title: 'IP Calculator',
    description:
      'Calculate IPv4 addressing, subnet masks, hosts, and network ranges.',
    icon: Calculator,
    category: 'IP Tools',
    path: '/calculator',
  },
  {
    title: 'Subnet Calculator',
    description:
      'Analyze subnet ranges, usable hosts, broadcast addresses, and masks.',
    icon: GitBranch,
    category: 'IP Tools',
  },
  {
    title: 'CIDR Calculator',
    description:
      'Work with CIDR notation and determine network allocation details.',
    icon: Network,
    category: 'IP Tools',
  },
  {
    title: 'Cisco Config Generator',
    description:
      'Generate structured Cisco configurations for common network scenarios.',
    icon: Router,
    category: 'Cisco',
    path: '/cisco',
  },
  {
    title: 'MikroTik Config Generator',
    description:
      'Build MikroTik RouterOS configuration commands quickly and consistently.',
    icon: Server,
    category: 'MikroTik',
    path: '/mikrotik',
  },
  {
    title: 'Command Library',
    description:
      'Browse useful commands for Cisco, MikroTik, Linux, and networking tools.',
    icon: Terminal,
    category: 'Reference',
    path: '/commands',
  },
  {
    title: 'Port Reference',
    description:
      'Look up common TCP and UDP ports, services, and protocols.',
    icon: Globe,
    category: 'Reference',
    path: '/references',
  },
  {
    title: 'Security Reference',
    description:
      'Review networking and cybersecurity concepts, protocols, and practices.',
    icon: ShieldCheck,
    category: 'Security',
    path: '/security',
  },
] as const
