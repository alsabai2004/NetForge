import {
  Calculator,
  Network,
  Router,
  Server,
  Terminal,
  BookOpen,
  FileText,
  ShieldCheck,
} from 'lucide-react'

export const navigationItems = [
  {
    label: 'Dashboard',
    icon: Network,
    path: '/',
  },
  {
    label: 'IP Calculator',
    icon: Calculator,
    path: '/calculator',
  },
  {
    label: 'Cisco Tools',
    icon: Router,
    path: '/cisco',
  },
  {
    label: 'MikroTik Tools',
    icon: Server,
    path: '/mikrotik',
  },
  {
    label: 'Command Library',
    icon: Terminal,
    path: '/commands',
  },
  {
    label: 'Network References',
    icon: BookOpen,
    path: '/references',
  },
  {
    label: 'Network Notes',
    icon: FileText,
    path: '/notes',
  },
  {
    label: 'Security',
    icon: ShieldCheck,
    path: '/security',
  },
] as const
