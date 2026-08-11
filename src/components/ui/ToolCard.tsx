import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  category: string
  path?: string
}

function ToolCard({
  title,
  description,
  icon: Icon,
  category,
  path,
}: ToolCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/15">
          <Icon size={20} />
        </div>

        <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
          {category}
        </span>
      </div>

      <h3 className="mt-5 text-base font-semibold text-slate-100">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

      {path && (
        <div className="mt-4 text-xs font-medium text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
          Open tool →
        </div>
      )}
    </>
  )

  if (path) {
    return (
      <Link
        to={path}
        className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        {content}
      </Link>
    )
  }

  return (
    <article className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      {content}
    </article>
  )
}

export default ToolCard
