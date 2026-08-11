import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Shield,
  ShieldAlert,
  X,
} from 'lucide-react'
import { securityData, type SecurityCategory, type SecurityItem } from './securityData'

const severityStyles: Record<SecurityItem['severity'], string> = {
  Info: 'border-slate-700 bg-slate-800/60 text-slate-300',
  Low: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
  Medium: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400',
  High: 'border-orange-500/20 bg-orange-500/10 text-orange-400',
  Critical: 'border-red-500/20 bg-red-500/10 text-red-400',
}

const categoryStyles: Record<SecurityCategory, string> = {
  Fundamentals: 'text-violet-400',
  Firewall: 'text-orange-400',
  ACL: 'text-blue-400',
  'Secure Management': 'text-cyan-400',
  'Network Defense': 'text-emerald-400',
  Hardening: 'text-yellow-400',
  Threats: 'text-red-400',
  Troubleshooting: 'text-slate-400',
}

function SecurityCard({
  item,
  expanded,
  onToggle,
}: {
  item: SecurityItem
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`text-xs font-medium ${categoryStyles[item.category]}`}>
                  {item.category}
                </span>

                <span
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium ${severityStyles[item.severity]}`}
                >
                  {item.severity}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-white">
                {item.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.summary}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-950 px-2 py-1 text-[11px] text-slate-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-800 bg-slate-950/40 p-5">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldAlert size={16} className="text-orange-400" />
                Security Details
              </h3>

              <ul className="space-y-3">
                {item.details.map((detail, index) => (
                  <li
                    key={`${item.id}-detail-${index}`}
                    className="flex gap-3 text-sm leading-6 text-slate-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Recommendations
              </h3>

              <ul className="space-y-3">
                {item.recommendations.map((recommendation, index) => (
                  <li
                    key={`${item.id}-recommendation-${index}`}
                    className="flex gap-3 text-sm leading-6 text-slate-400"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

function SecurityCenter() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | SecurityCategory>('All')
  const [severity, setSeverity] = useState<'All' | SecurityItem['severity']>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(securityData.map((item) => item.category))),
    ] as ('All' | SecurityCategory)[],
    [],
  )

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return securityData.filter((item) => {
      const matchesCategory =
        category === 'All' || item.category === category

      const matchesSeverity =
        severity === 'All' || item.severity === severity

      const searchableText = [
        item.title,
        item.category,
        item.severity,
        item.summary,
        ...item.details,
        ...item.recommendations,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase()

      return (
        matchesCategory &&
        matchesSeverity &&
        (!query || searchableText.includes(query))
      )
    })
  }, [search, category, severity])

  const highRiskCount = securityData.filter(
    (item) => item.severity === 'High' || item.severity === 'Critical',
  ).length

  function resetFilters() {
    setSearch('')
    setCategory('All')
    setSeverity('All')
    setExpandedId(null)
  }

  function toggleItem(id: string) {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400">
          <Shield size={14} />
          Network Security
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <ShieldAlert size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Security Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Practical network security guidance covering firewalls, ACLs,
              secure management, hardening, threats, and troubleshooting.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Security Topics</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {securityData.length}
          </p>
        </div>

        <div className="rounded-xl border border-orange-500/10 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">High / Critical</p>
          <p className="mt-1 text-2xl font-bold text-orange-400">
            {highRiskCount}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/10 bg-slate-900/60 p-4">
          <p className="text-xs text-slate-500">Categories</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {categories.length - 1}
          </p>
        </div>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search security topics, threats, controls..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition focus:border-red-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as 'All' | SecurityCategory)
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Categories' : item}
                </option>
              ))}
            </select>

            <select
              value={severity}
              onChange={(event) =>
                setSeverity(
                  event.target.value as 'All' | SecurityItem['severity'],
                )
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-500"
            >
              {['All', 'Info', 'Low', 'Medium', 'High', 'Critical'].map(
                (item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All Severities' : item}
                  </option>
                ),
              )}
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-slate-600 hover:text-white"
            >
              <X size={15} />
              Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-300">
                {filteredItems.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-300">
                {securityData.length}
              </span>{' '}
              security topics
            </p>

            {(search || category !== 'All' || severity !== 'All') && (
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="rounded-md bg-red-500/10 px-2 py-1 text-xs text-red-400">
                    Search: {search}
                  </span>
                )}

                {category !== 'All' && (
                  <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                    {category}
                  </span>
                )}

                {severity !== 'All' && (
                  <span className="rounded-md bg-orange-500/10 px-2 py-1 text-xs text-orange-400">
                    {severity}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <SecurityCard
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center">
          <AlertTriangle
            size={28}
            className="mx-auto text-slate-600"
          />
          <h2 className="mt-4 text-lg font-semibold text-white">
            No security topics found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try another search term or reset the filters.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default SecurityCenter
