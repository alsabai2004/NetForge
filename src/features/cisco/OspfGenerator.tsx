import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface OspfNetwork {
  id: number
  network: string
  wildcard: string
  area: number
}

const defaultNetworks: OspfNetwork[] = [
  {
    id: 1,
    network: '192.168.1.0',
    wildcard: '0.0.0.255',
    area: 0,
  },
  {
    id: 2,
    network: '192.168.2.0',
    wildcard: '0.0.0.255',
    area: 0,
  },
]

function OspfGenerator() {
  const [processId, setProcessId] = useState('1')
  const [routerId, setRouterId] = useState('1.1.1.1')
  const [networks, setNetworks] = useState<OspfNetwork[]>(defaultNetworks)
  const [network, setNetwork] = useState('')
  const [wildcard, setWildcard] = useState('0.0.0.255')
  const [area, setArea] = useState('0')
  const [copied, setCopied] = useState(false)

  function addNetwork() {
    const networkValue = network.trim()
    const wildcardValue = wildcard.trim()
    const areaValue = Number(area)

    if (
      !networkValue ||
      !wildcardValue ||
      !Number.isInteger(areaValue) ||
      areaValue < 0
    ) {
      return
    }

    setNetworks((current) => [
      ...current,
      {
        id: Date.now(),
        network: networkValue,
        wildcard: wildcardValue,
        area: areaValue,
      },
    ])

    setNetwork('')
    setWildcard('0.0.0.255')
    setArea('0')
  }

  function removeNetwork(id: number) {
    setNetworks((current) => current.filter((item) => item.id !== id))
  }

  function reset() {
    setProcessId('1')
    setRouterId('1.1.1.1')
    setNetworks(defaultNetworks)
    setNetwork('')
    setWildcard('0.0.0.255')
    setArea('0')
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    `router ospf ${processId}`,
    ` router-id ${routerId}`,
    ...networks.map(
      (item) =>
        ` network ${item.network} ${item.wildcard} area ${item.area}`,
    ),
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
      <Header
        title="OSPF Generator"
        description="Generate Cisco OSPF routing configuration."
        onReset={reset}
      />

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={processId}
              onChange={(e) => setProcessId(e.target.value)}
              placeholder="Process ID"
              className={inputClass}
            />

            <input
              value={routerId}
              onChange={(e) => setRouterId(e.target.value)}
              placeholder="Router ID"
              className={inputClass}
            />

            <input
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              placeholder="Network e.g. 10.0.0.0"
              className={inputClass}
            />

            <input
              value={wildcard}
              onChange={(e) => setWildcard(e.target.value)}
              placeholder="Wildcard e.g. 0.0.0.255"
              className={inputClass}
            />

            <input
              type="number"
              min="0"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area"
              className={inputClass}
            />
          </div>

          <button
            type="button"
            onClick={addNetwork}
            className={buttonClass}
          >
            <Plus size={16} />
            Add Network
          </button>

          <div className="mt-5 space-y-2">
            {networks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="font-mono text-xs">
                  <span className="text-blue-400">
                    {item.network}
                  </span>
                  <span className="mx-2 text-slate-600">
                    {item.wildcard}
                  </span>
                  <span className="text-slate-400">
                    area {item.area}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeNetwork(item.id)}
                  className="text-slate-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Output config={config} copied={copied} onCopy={copyConfig} />
      </div>
    </section>
  )
}

function Header({
  title,
  description,
  onReset,
}: {
  title: string
  description: string
  onReset: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Network size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:text-white"
      >
        <RotateCcw size={14} />
        Reset
      </button>
    </div>
  )
}

function Output({
  config,
  copied,
  onCopy,
}: {
  config: string
  copied: boolean
  onCopy: () => void
}) {
  return (
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
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="max-h-[500px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
        <code>{config}</code>
      </pre>
    </div>
  )
}

const inputClass =
  'rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500'

const buttonClass =
  'mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400'

export default OspfGenerator
