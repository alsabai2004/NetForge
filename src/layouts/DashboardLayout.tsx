import { useState, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center border-b border-slate-800 bg-slate-950/80 lg:hidden">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="ml-3 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <Menu size={21} />
            </button>

            <div className="ml-2 flex h-16 items-center">
              <span className="text-sm font-semibold text-white">
                NetForge
              </span>
            </div>
          </div>

          <Header />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          <footer className="border-t border-slate-800 bg-slate-900 px-4 py-6 text-center">
            <div className="text-sm text-slate-400">
              NetForge
              <span className="mx-2 text-slate-600">•</span>
              Developed by
              <span className="ml-1 font-semibold text-emerald-400">
                Eng. Mohammed Najeeb Al-Sabai
              </span>
            </div>

            <div className="mt-1 text-xs text-slate-600">
              Network Engineering Toolkit • © 2026
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
