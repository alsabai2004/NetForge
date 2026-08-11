import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface StaticRoute {
  id: number
  destination: string
  prefix: number
  nextHop: string
  interfaceName: string
}

const defaultRoutes: StaticRoute[] = [
  {
    id: 1,
    destination: '192.168.20.0',
    prefix: 24,
    nextHop: '192.168.1.2',
    interfaceName: '',
  },
  {
    id: 2,
    destination: '192.168.30.0',
    prefix: 24,
    nextHop: '192.168.1.2',
    interfaceName: '',
  },
]

function StaticRouteGenerator() {
  const [routes, setRoutes] = useState<StaticRoute[]>(defaultRoutes)
  const [destination, setDestination] = useState('')
  const [prefix, setPrefix] = useState('24')
  const [nextHop, setNextHop] = useState('')
  const [interfaceName, setInterfaceName] = useState('')
  const [copied, setCopied] = useState(false)

  function addRoute() {
    const destinationValue = destination.trim()
    const prefixValue = Number(prefix)
    const nextHopValue = nextHop.trim()
    const interfaceValue = interfaceName.trim()

    if (
      !destinationValue ||
      !nextHopValue ||
      !Number.isInteger(prefixValue) ||
      prefixValue < 0 ||
      prefixValue > 32
    ) {
      return
    }

    const route: StaticRoute = {
      id: Date.now(),
      destination: destinationValue,
      prefix: prefixValue,
      nextHop: nextHopValue,
      interfaceName: interfaceValue,
    }

    setRoutes((current) => [...current, route])

    setDestination('')
    setPrefix('24')
    setNextHop('')
    setInterfaceName('')
  }

  function removeRoute(id: number) {
    setRoutes((current) => current.filter((route) => route.id !== id))
  }

  function reset() {
    setRoutes(defaultRoutes)
    setDestination('')
    setPrefix('24')
    setNextHop('')
    setInterfaceName('')
    setCopied(false)
  }

  const routeConfig = [
    'enable',
    'configure terminal',
    '!',
    ...routes.flatMap((route) => {
      const mask = prefixToMask(route.prefix)

      return [
        `ip route ${route.destination} ${mask} ${route.nextHop}${
          route.interfaceName ? ` ${route.interfaceName}` : ''
        }`,
      ]
    }),
    '!',
    'end',
    'write memory',
  ].join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(routeConfig)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Static Routing Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco IOS static route configuration.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-slate-600 hover:text-white"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Static Routes
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Destination e.g. 192.168.40.0"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              type="number"
              min="0"
              max="32"
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
              placeholder="Prefix"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={nextHop}
              onChange={(event) => setNextHop(event.target.value)}
              placeholder="Next Hop e.g. 192.168.1.2"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={interfaceName}
              onChange={(event) => setInterfaceName(event.target.value)}
              placeholder="Exit Interface (optional)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="button"
            onClick={addRoute}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add Route
          </button>

          <div className="mt-5 space-y-2">
            {routes.map((route) => (
              <div
                key={route.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0">
                  <div className="font-mono text-sm text-cyan-400">
                    {route.destination}/{route.prefix}
                  </div>

                  <p className="mt-1 font-mono text-xs text-slate-500">
                    via {route.nextHop}
                    {route.interfaceName
                      ? ` → ${route.interfaceName}`
                      : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeRoute(route.id)}
                  className="shrink-0 text-slate-500 transition hover:text-red-400"
                  title="Remove route"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Generated IOS
              </h3>

              <p className="text-xs text-slate-500">
                Ready to paste into Cisco IOS.
              </p>
            </div>

            <button
              type="button"
              onClick={copyConfig}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <pre className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
            <code>{routeConfig}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

function prefixToMask(prefix: number): string {
  const mask =
    prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0

  return [
    (mask >>> 24) & 255,
    (mask >>> 16) & 255,
    (mask >>> 8) & 255,
    mask & 255,
  ].join('.')
}

export default StaticRouteGenerator
