import { Network, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'

interface SidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const navigation = (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {navigationItems.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200',
              ].join(' ')
            }
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )

  const footer = (
    <div className="border-t border-slate-800 p-4">
      <p className="text-xs leading-5 text-slate-500">
        Network engineering tools for students and professionals.
      </p>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
        <SidebarBrand />

        {navigation}

        {footer}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-slate-800">
          <SidebarBrand />

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {navigation}

        {footer}
      </aside>
    </>
  )
}

function SidebarBrand() {
  return (
    <div className="flex h-16 shrink-0 items-center gap-3 px-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
        <Network size={20} strokeWidth={2.5} />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          NetForge
        </h1>

        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
          Network Toolkit
        </p>
      </div>
    </div>
  )
}

export default Sidebar
