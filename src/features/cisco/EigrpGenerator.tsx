import { useState } from 'react'
import { Check, Copy, Network, Plus, RotateCcw, Trash2 } from 'lucide-react'

interface EigrpNetwork {
  id: number
  network: string
  wildcard: string
}

const defaultNetworks: EigrpNetwork[] = [
  { id: 1, network: '192.168.1.0', wildcard: '0.0.0.255' },
  { id: 2, network: '10.0.0.0', wildcard: '0.0.0.255' },
]

function EigrpGenerator() {
  const [networks, setNetworks] = useState<EigrpNetwork[]>(defaultNetworks)
  const [network, setNetwork] = useState('')
  const [wildcard, setWildcard] = useState('0.0.0.255')
  const [asNumber, setAsNumber] = useState('100')
  const [noAutoSummary, setNoAutoSummary] = useState(true)
  const [copied, setCopied] = useState(false)

  function addNetwork() {
    const networkValue = network.trim()
    const wildcardValue = wildcard.trim()

    if (!networkValue || !wildcardValue) return

    if (
      networks.some(
        (item) =>
          item.network === networkValue &&
          item.wildcard === wildcardValue,
      )
    ) {
      return
    }

    setNetworks((current) => [
      ...current,
      {
        id: Date.now(),
        network: networkValue,
        wildcard: wildcardValue,
      },
    ])

    setNetwork('')
    setWildcard('0.0.0.255')
  }

  function removeNetwork(id: number) {
    setNetworks((current) => current.filter((item) => item.id !== id))
  }

  function reset() {
    setNetworks(defaultNetworks)
    setNetwork('')
    setWildcard('0.0.0.255')
    setAsNumber('100')
    setNoAutoSummary(true)
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    `router eigrp ${asNumber}`,
    ...networks.map(
      (item) => ` network ${item.network} ${item.wildcard}`,
    ),
    ...(noAutoSummary ? [' no auto-summary'] : []),
    ' exit',
    '!',
    'end',
    'write memory',
  ].join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(config)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
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
              EIGRP Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco EIGRP routing configuration.
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
            EIGRP Configuration
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              type="number"
              min="1"
              max="65535"
              value={asNumber}
              onChange={(event) => setAsNumber(event.target.value)}
              placeholder="AS Number"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={network}
              onChange={(event) => setNetwork(event.target.value)}
              placeholder="Network e.g. 192.168.1.0"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={wildcard}
              onChange={(event) => setWildcard(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addNetwork()
              }}
              placeholder="Wildcard e.g. 0.0.0.255"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500 sm:col-span-2"
            />
          </div>

          <button
            type="button"
            onClick={addNetwork}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add Network
          </button>

          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
            <input
              type="checkbox"
              checked={noAutoSummary}
              onChange={(event) => setNoAutoSummary(event.target.checked)}
              className="h-4 w-4 accent-emerald-500"
            />

            <span className="text-sm text-slate-300">
              Disable auto-summary
            </span>
          </label>

          <div className="mt-5 space-y-2">
            {networks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div>
                  <span className="font-mono text-sm text-cyan-400">
                    {item.network}
                  </span>

                  <span className="ml-2 font-mono text-xs text-slate-500">
                    {item.wildcard}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeNetwork(item.id)}
                  className="shrink-0 text-slate-500 transition hover:text-red-400"
                  title="Remove network"
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
            <code>{config}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default EigrpGenerator
