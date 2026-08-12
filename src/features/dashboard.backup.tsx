import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calculator,
  Command,
  Network,
  Router,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react'
import ToolCard from '../components/ui/ToolCard'
import { tools } from '../data/tools'

function Dashboard() {
  const featuredTools = tools.slice(0, 6)

  return (
    <div className="mx-auto w-full max-w-7xl">
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20 p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <Zap size={14} />
            Network Engineering Toolkit
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Build, analyze, and understand networks.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            NetForge brings practical network engineering tools,
            configuration generators, command references, and networking
            knowledge into one focused workspace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Calculator size={17} />
              IP Calculator
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/commands"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              <Terminal size={17} />
              Command Library
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Calculator size={20} />}
          label="IP Tools"
          value="3"
          description="Addressing & subnetting"
        />

        <StatCard
          icon={<Router size={20} />}
          label="Cisco Tools"
          value="6+"
          description="Configuration utilities"
        />

        <StatCard
          icon={<Server size={20} />}
          label="MikroTik Tools"
          value="6+"
          description="RouterOS utilities"
        />

        <StatCard
          icon={<Command size={20} />}
          label="References"
          value="50+"
          description="Commands & concepts"
        />
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Featured Tools
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used networking utilities.
            </p>
          </div>

          <span className="hidden text-xs text-slate-500 sm:block">
            {featuredTools.length} tools
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              path={'path' in tool ? tool.path : undefined}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Quick Access
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump directly into a networking workspace.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <QuickCard
            href="/cisco"
            icon={<Router size={21} />}
            title="Cisco Tools"
            description="Generate configurations for Cisco networking devices."
          />

          <QuickCard
            href="/mikrotik"
            icon={<Server size={21} />}
            title="MikroTik Tools"
            description="Create practical RouterOS configurations."
          />

          <QuickCard
            href="/security"
            icon={<ShieldCheck size={21} />}
            title="Security"
            description="Explore network security concepts and references."
          />
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Network size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-200">
                NetForge System
              </p>

              <p className="text-xs text-slate-500">
                Network engineering workspace
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Operational
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: string
  description: string
}) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-200">
        {label}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </article>
  )
}

function QuickCard({
  href,
  icon,
  title,
  description,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link
      to={href}
      className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>

        <ArrowRight
          size={17}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-400"
        />
      </div>

      <h3 className="mt-5 text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </Link>
  )
}

export default Dashboard
