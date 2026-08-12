import { useMemo, useState } from 'react'
import {
  BookOpen,
  Check,
  Clipboard,
  Star,
  Search,
  Tag,
  X,
} from 'lucide-react'
import { noteData } from './noteData'
import { getFavorites, saveFavorite } from '../../utils/storage'

function NetworkNotes() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>(() =>
    getFavorites(),
  )

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(noteData.map((note) => note.category))),
    ],
    [],
  )

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase()

    return noteData.filter((note) => {
      const matchesCategory =
        category === 'All' || note.category === category

      const searchableText = [
        note.title,
        note.category,
        note.summary,
        ...note.tags,
        ...note.sections.flatMap((section) => [
          section.title,
          ...section.content,
        ]),
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !query || searchableText.includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, category])

  function resetFilters() {
    setSearch('')
    setCategory('All')
  }

  function toggleFavorite(noteId: string) {
    const enabled = !favorites.includes(noteId)

    saveFavorite(`note:${noteId}`, enabled)

    setFavorites((current) =>
      enabled
        ? [...current, noteId]
        : current.filter((id) => id !== noteId),
    )
  }

  async function copyNote(noteId: string, content: string) {
    await navigator.clipboard.writeText(content)
    setCopiedId(noteId)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  function buildNoteText(note: (typeof noteData)[number]) {
    return [
      note.title,
      note.summary,
      '',
      ...note.sections.flatMap((section) => [
        section.title,
        ...section.content,
        '',
      ]),
    ].join('\n')
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-400">
          <BookOpen size={14} />
          Network Knowledge Base
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <BookOpen size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Network Notes
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Organized networking notes covering fundamentals, switching,
              routing, services, security, Cisco IOS, and MikroTik RouterOS.
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
                placeholder="Search notes, protocols, commands, concepts..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition focus:border-cyan-500"
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
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500"
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
                {filteredNotes.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-300">
                {noteData.length}
              </span>{' '}
              notes
            </p>

            {(search || category !== 'All') && (
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="rounded-md bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
                    Search: {search}
                  </span>
                )}

                {category !== 'All' && (
                  <span className="rounded-md bg-violet-500/10 px-2 py-1 text-xs text-violet-400">
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 p-5">
          {filteredNotes.map((note) => (
            <article
              key={note.id}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-400">
                      {note.category}
                    </span>

                    <h2 className="text-lg font-semibold text-white">
                      {note.title}
                    </h2>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {note.summary}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(note.id)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-500 transition hover:border-amber-500/40 hover:text-amber-400"
                    title={
                      favorites.includes(note.id)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <Star
                      size={15}
                      fill={
                        favorites.includes(note.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyNote(
                        note.id,
                        buildNoteText(note),
                      )
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-cyan-500/40 hover:text-white"
                    title={`Copy ${note.title}`}
                  >
                    {copiedId === note.id ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Clipboard size={14} />
                        Copy Note
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {note.sections.map((section) => (
                  <div
                    key={`${note.id}-${section.title}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <h3 className="text-sm font-semibold text-white">
                      {section.title}
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {section.content.map((item, index) => (
                        <li
                          key={`${note.id}-${section.title}-${index}`}
                          className="flex gap-2 text-sm leading-6 text-slate-400"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {note.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-slate-600" />

                  {note.tags.map((tag) => (
                    <button
                      key={`${note.id}-${tag}`}
                      type="button"
                      onClick={() => setSearch(tag)}
                      className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-500 transition hover:border-cyan-500/30 hover:text-cyan-400"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}

          {filteredNotes.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-800 px-6 py-12 text-center">
              <Search className="mx-auto text-slate-600" size={28} />

              <h2 className="mt-3 text-sm font-semibold text-white">
                No notes found
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Try another search term or reset the filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:text-white"
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

export default NetworkNotes
