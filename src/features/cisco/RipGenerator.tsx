import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface NetworkEntry {
  network: string
}

const defaultNetworks: NetworkEntry[] = [
  { network: '192.168.10.0' },
  { network: '192.168.20.0' },
]

function RipGenerator() {
  const [networks, setNetworks] = useState<NetworkEntry[]>(defaultNetworks)
  const [network, setNetwork] = useState('')
  const [version, setVersion] = useState<'2' | '1'>('2')
  const [passiveInterface, setPassiveInterface] = useState('')
  const [copied, setCopied] = useState(false)

  function addNetwork() {
    const value = network.trim()

    if (!value || networks.some((item) => item.network === value)) {
      return
    }

    setNetworks((current) => [...current, { network: value }])
    setNetwork('')
  }

  function removeNetwork(value: string) {
    setNetworks((current) =>
      current.filter((item) => item.network !== value),
    )
  }

  function reset() {
    setNetworks(defaultNetworks)
    setNetwork('')
    setVersion('2')
    setPassiveInterface('')
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    'router rip',
    ` version ${version}`,
    ...(version === '2' ? [' no auto-summary'] : []),
    ...networks.map((item) => ` network ${item.network}`),
    ...(passiveInterface.trim()
      ? [` passive-interface ${passiveInterface.trim()}`]
      : []),
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">RIP Generator</h2>
            <p className="text-xs text-slate-500">
              Generate Cisco RIP routing configuration.
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
            RIP Configuration
          </h3>

          <div className="mt-4">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              RIP Version
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVersion('2')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  version === '2'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                Version 2
              </button>

              <button
                type="button"
                onClick={() => setVersion('1')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  version === '1'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                Version 1
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <input
              value={network}
              onChange={(event) => setNetwork(event.target.value)}
              placeholder="Network e.g. 192.168.10.0"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <button
              type="button"
              onClick={addNetwork}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {networks.map((item) => (
              <div
                key={item.network}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <span className="font-mono text-sm text-emerald-400">
                  {item.network}
                </span>

                <button
                  type="button"
                  onClick={() => removeNetwork(item.network)}
                  className="text-slate-500 hover:text-red-400"
                  title="Remove network"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <label
              htmlFor="rip-passive-interface"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Passive Interface
            </label>

            <input
              id="rip-passive-interface"
              value={passiveInterface}
              onChange={(event) =>
                setPassiveInterface(event.target.value)
              }
              placeholder="GigabitEthernet0/1"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
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

export default RipGenerator
