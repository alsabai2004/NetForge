import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface DhcpPool {
  id: number
  name: string
  network: string
  mask: string
  gateway: string
  dns: string
}

const defaultPools: DhcpPool[] = [
  {
    id: 1,
    name: 'USERS',
    network: '192.168.10.0',
    mask: '255.255.255.0',
    gateway: '192.168.10.1',
    dns: '8.8.8.8',
  },
  {
    id: 2,
    name: 'SERVERS',
    network: '192.168.20.0',
    mask: '255.255.255.0',
    gateway: '192.168.20.1',
    dns: '8.8.8.8',
  },
]

function DhcpGenerator() {
  const [pools, setPools] = useState<DhcpPool[]>(defaultPools)
  const [name, setName] = useState('')
  const [network, setNetwork] = useState('')
  const [mask, setMask] = useState('255.255.255.0')
  const [gateway, setGateway] = useState('')
  const [dns, setDns] = useState('8.8.8.8')
  const [excludedStart, setExcludedStart] = useState('')
  const [excludedEnd, setExcludedEnd] = useState('')
  const [copied, setCopied] = useState(false)

  function addPool() {
    if (!name.trim() || !network.trim() || !gateway.trim()) {
      return
    }

    setPools((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim().toUpperCase(),
        network: network.trim(),
        mask: mask.trim(),
        gateway: gateway.trim(),
        dns: dns.trim(),
      },
    ])

    setName('')
    setNetwork('')
    setGateway('')
  }

  function removePool(id: number) {
    setPools((current) => current.filter((pool) => pool.id !== id))
  }

  function reset() {
    setPools(defaultPools)
    setName('')
    setNetwork('')
    setMask('255.255.255.0')
    setGateway('')
    setDns('8.8.8.8')
    setExcludedStart('')
    setExcludedEnd('')
    setCopied(false)
  }

  const excluded =
    excludedStart.trim() && excludedEnd.trim()
      ? `ip dhcp excluded-address ${excludedStart.trim()} ${excludedEnd.trim()}`
      : excludedStart.trim()
        ? `ip dhcp excluded-address ${excludedStart.trim()}`
        : ''

  const config = [
    'enable',
    'configure terminal',
    '!',
    excluded,
    excluded ? '!' : '',
    ...pools.flatMap((pool) => [
      `ip dhcp pool ${pool.name}`,
      ` network ${pool.network} ${pool.mask}`,
      ` default-router ${pool.gateway}`,
      ` dns-server ${pool.dns}`,
      ' exit',
      '!',
    ]),
    'end',
    'write memory',
  ]
    .filter(Boolean)
    .join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(config)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              DHCP Generator
            </h2>
            <p className="text-xs text-slate-500">
              Generate Cisco IOS DHCP pool configuration.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:text-white"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pool Name"
              className={inputClass}
            />

            <input
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              placeholder="Network"
              className={inputClass}
            />

            <input
              value={mask}
              onChange={(e) => setMask(e.target.value)}
              placeholder="Subnet Mask"
              className={inputClass}
            />

            <input
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              placeholder="Default Gateway"
              className={inputClass}
            />

            <input
              value={dns}
              onChange={(e) => setDns(e.target.value)}
              placeholder="DNS Server"
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-white">
              Excluded Addresses
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                value={excludedStart}
                onChange={(e) => setExcludedStart(e.target.value)}
                placeholder="Start IP"
                className={inputClass}
              />

              <input
                value={excludedEnd}
                onChange={(e) => setExcludedEnd(e.target.value)}
                placeholder="End IP (optional)"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addPool}
            className={buttonClass}
          >
            <Plus size={16} />
            Add DHCP Pool
          </button>

          <div className="mt-5 space-y-2">
            {pools.map((pool) => (
              <div
                key={pool.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div>
                  <span className="text-sm font-semibold text-emerald-400">
                    {pool.name}
                  </span>

                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {pool.network} → {pool.gateway}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removePool(pool.id)}
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

      <pre className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
        <code>{config}</code>
      </pre>
    </div>
  )
}

const inputClass =
  'rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500'

const buttonClass =
  'mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400'

export default DhcpGenerator
