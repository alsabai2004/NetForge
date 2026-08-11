import { useMemo, useState } from 'react'
import {
  BookOpen,
  Check,
  Copy,
  Search,
  Shield,
  Wifi,
  X,
} from 'lucide-react'
import { referenceData } from './referenceData'

function NetworkReferences() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(referenceData.map((item) => item.category))),
    ],
    [],
  )

  const filteredReferences = useMemo(() => {
    const query = search.trim().toLowerCase()

    return referenceData.filter((item) => {
      const matchesCategory =
        category === 'All' || item.category === category

      const searchableText = [
        item.title,
        item.category,
        item.summary,
        ...item.details,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !query || searchableText.includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, category])

  async function copyReference(id: string, item: (typeof referenceData)[number]) {
    const text = [
      item.title,
      item.summary,
      '',
      ...item.details,
    ].join('\n')

    await navigator.clipboard.writeText(text)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  function resetFilters() {
    setSearch('')
    setCategory('All')
  }

  function getCategoryIcon(itemCategory: string) {
    if (itemCategory === 'Security') {
      return <Shield size={16} />
    }

    if (itemCategory === 'Wireless') {
      return <Wifi size={16} />
    }

    return <BookOpen size={16} />
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
          <BookOpen size={14} />
          Network Knowledge Base
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <BookOpen size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Network References
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Browse practical networking references covering models,
              protocols, switching, routing, IP networking, security,
              and wireless technologies.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search references, protocols, concepts..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition focus:border-emerald-500"
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
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Categories' : item}
                </option>
              ))}
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
                {filteredReferences.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-300">
                {referenceData.length}
              </span>{' '}
              references
            </p>

            {(search || category !== 'All') && (
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="rounded-md bg-violet-500/10 px-2 py-1 text-xs text-violet-400">
                    Search: {search}
                  </span>
                )}

                {category !== 'All' && (
                  <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 p-5">
          {filteredReferences.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-white">
                        {item.title}
                      </h2>

                      <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyReference(item.id, item)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  {copiedId === item.id ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}

                  {copiedId === item.id ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="mt-5 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                <ul className="space-y-2">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}

          {filteredReferences.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
              <BookOpen
                size={32}
                className="mx-auto text-slate-600"
              />

              <h2 className="mt-4 text-lg font-semibold text-white">
                No references found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term or reset the filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default NetworkReferences
