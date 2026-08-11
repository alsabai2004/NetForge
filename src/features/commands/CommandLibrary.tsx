import { useMemo, useState } from 'react'
import {
  Check,
  Clipboard,
  Command,
  Search,
  Server,
  Shield,
  Terminal,
  X,
} from 'lucide-react'
import { commandData } from './commandData'

function CommandLibrary() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('All')
  const [category, setCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const platforms = useMemo(
    () => ['All', ...Array.from(new Set(commandData.map((item) => item.platform)))],
    [],
  )

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          commandData
            .filter(
              (item) => platform === 'All' || item.platform === platform,
            )
            .map((item) => item.category),
        ),
      ),
    ],
    [platform],
  )

  const filteredCommands = useMemo(() => {
    const query = search.trim().toLowerCase()

    return commandData.filter((item) => {
      const matchesPlatform =
        platform === 'All' || item.platform === platform

      const matchesCategory =
        category === 'All' || item.category === category

      const searchableText = [
        item.title,
        item.platform,
        item.category,
        item.description,
        item.command,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !query || searchableText.includes(query)

      return matchesPlatform && matchesCategory && matchesSearch
    })
  }, [search, platform, category])

  function resetFilters() {
    setSearch('')
    setPlatform('All')
    setCategory('All')
  }

  async function copyCommand(id: string, command: string) {
    await navigator.clipboard.writeText(command)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  function getPlatformIcon(itemPlatform: string) {
    if (itemPlatform === 'Cisco IOS') {
      return <Server size={16} />
    }

    if (itemPlatform === 'MikroTik RouterOS') {
      return <Command size={16} />
    }

    return <Terminal size={16} />
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-400">
          <Terminal size={14} />
          Network Command Reference
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <Command size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Command Library
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Search and copy practical networking commands for Cisco IOS,
              MikroTik RouterOS, and Linux.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60">
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
                placeholder="Search commands, protocols, categories..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition focus:border-violet-500"
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
              value={platform}
              onChange={(event) => {
                setPlatform(event.target.value)
                setCategory('All')
              }}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
            >
              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Platforms' : item}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
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
                {filteredCommands.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-300">
                {commandData.length}
              </span>{' '}
              commands
            </p>

            {(search || platform !== 'All' || category !== 'All') && (
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="rounded-md bg-violet-500/10 px-2 py-1 text-xs text-violet-400">
                    Search: {search}
                  </span>
                )}

                {platform !== 'All' && (
                  <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                    {platform}
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
          {filteredCommands.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-6 py-12 text-center">
              <Search
                size={28}
                className="mx-auto text-slate-600"
              />

              <h2 className="mt-4 text-sm font-semibold text-white">
                No commands found
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Try another keyword or reset the filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-400"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredCommands.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition hover:border-slate-700"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 px-4 py-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-violet-400">
                          {getPlatformIcon(item.platform)}
                        </span>

                        <h2 className="text-sm font-semibold text-white">
                          {item.title}
                        </h2>
                      </div>

                      <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-400">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-[11px] text-slate-400">
                    <Shield size={13} />
                    {item.platform}
                  </span>
                </div>

                <div className="p-4">
                  <div className="overflow-hidden rounded-lg border border-slate-800 bg-black/20">
                    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
                      <span className="font-mono text-[11px] text-slate-600">
                        command
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          copyCommand(item.id, item.command)
                        }
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-2.5 py-1.5 text-[11px] font-semibold text-slate-950 transition hover:bg-emerald-400"
                      >
                        {copiedId === item.id ? (
                          <Check size={13} />
                        ) : (
                          <Clipboard size={13} />
                        )}

                        {copiedId === item.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <pre className="max-h-64 overflow-auto p-4 font-mono text-xs leading-6 text-emerald-300">
                      <code>{item.command}</code>
                    </pre>
                  </div>

                  {item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearch(tag)}
                          className="rounded-md bg-slate-900 px-2 py-1 text-[10px] text-slate-500 transition hover:text-slate-300"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default CommandLibrary
