import { Activity, Command } from 'lucide-react'

function Header() {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur sm:px-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Network Engineering Toolkit
        </h2>
        <p className="hidden text-xs text-slate-500 sm:block">
          Tools and references for modern network engineering.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 sm:flex">
          <Command size={14} />
          <span>NetForge</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs font-medium text-emerald-400">
          <Activity size={14} />
          <span className="hidden sm:inline">System Operational</span>
          <span className="sm:hidden">Online</span>
        </div>
      </div>
    </header>
  )
}

export default Header
