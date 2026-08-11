import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface Port {
  id: number
  name: string
}

const defaultPorts: Port[] = [
  { id: 1, name: 'GigabitEthernet0/1' },
  { id: 2, name: 'GigabitEthernet0/2' },
]

function EtherChannelGenerator() {
  const [channelId, setChannelId] = useState('1')
  const [protocol, setProtocol] = useState<'lacp' | 'pagp' | 'static'>('lacp')
  const [mode, setMode] = useState<'access' | 'trunk'>('trunk')
  const [accessVlan, setAccessVlan] = useState('10')
  const [allowedVlans, setAllowedVlans] = useState('10,20,30')
  const [ports, setPorts] = useState<Port[]>(defaultPorts)
  const [portName, setPortName] = useState('')
  const [copied, setCopied] = useState(false)

  function addPort() {
    const name = portName.trim()

    if (!name || ports.some((port) => port.name === name)) {
      return
    }

    setPorts((current) => [
      ...current,
      {
        id: Date.now(),
        name,
      },
    ])

    setPortName('')
  }

  function removePort(id: number) {
    setPorts((current) => current.filter((port) => port.id !== id))
  }

  function reset() {
    setChannelId('1')
    setProtocol('lacp')
    setMode('trunk')
    setAccessVlan('10')
    setAllowedVlans('10,20,30')
    setPorts(defaultPorts)
    setPortName('')
    setCopied(false)
  }

  const protocolCommand =
    protocol === 'lacp'
      ? 'active'
      : protocol === 'pagp'
        ? 'desirable'
        : 'on'

  const config = [
    'enable',
    'configure terminal',
    '!',
    ...ports.flatMap((port) => [
      `interface ${port.name}`,
      ` channel-group ${channelId} mode ${protocolCommand}`,
      ' no shutdown',
      ' exit',
      '!',
    ]),
    `interface Port-channel${channelId}`,
    ` switchport mode ${mode}`,
    ...(mode === 'access'
      ? [` switchport access vlan ${accessVlan}`]
      : [` switchport trunk allowed vlan ${allowedVlans}`]),
    ' no shutdown',
    ' exit',
    '!',
    'end',
    'write memory',
  ].join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(config)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              EtherChannel Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco EtherChannel configuration using LACP, PAgP, or static mode.
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
            EtherChannel Settings
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="channel-id"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Port-Channel ID
              </label>

              <input
                id="channel-id"
                type="number"
                min="1"
                max="48"
                value={channelId}
                onChange={(event) => setChannelId(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Protocol
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  ['lacp', 'LACP'],
                  ['pagp', 'PAgP'],
                  ['static', 'Static'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setProtocol(value as 'lacp' | 'pagp' | 'static')
                    }
                    className={[
                      'rounded-lg border px-2 py-2.5 text-xs font-medium transition',
                      protocol === value
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 text-slate-400 hover:text-white',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Port-Channel Mode
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('access')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  mode === 'access'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                Access
              </button>

              <button
                type="button"
                onClick={() => setMode('trunk')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  mode === 'trunk'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                Trunk
              </button>
            </div>
          </div>

          {mode === 'access' ? (
            <div className="mt-5">
              <label
                htmlFor="access-vlan"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Access VLAN
              </label>

              <input
                id="access-vlan"
                type="number"
                min="1"
                max="4094"
                value={accessVlan}
                onChange={(event) => setAccessVlan(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>
          ) : (
            <div className="mt-5">
              <label
                htmlFor="allowed-vlans"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Allowed VLANs
              </label>

              <input
                id="allowed-vlans"
                value={allowedVlans}
                onChange={(event) => setAllowedVlans(event.target.value)}
                placeholder="10,20,30"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white">
              Member Interfaces
            </h3>

            <div className="mt-3 flex gap-2">
              <input
                value={portName}
                onChange={(event) => setPortName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    addPort()
                  }
                }}
                placeholder="GigabitEthernet0/3"
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={addPort}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {ports.map((port) => (
              <div
                key={port.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <span className="font-mono text-sm text-orange-400">
                  {port.name}
                </span>

                <button
                  type="button"
                  onClick={() => removePort(port.id)}
                  className="text-slate-500 transition hover:text-red-400"
                  title="Remove interface"
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

          <pre className="max-h-[650px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
            <code>{config}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default EtherChannelGenerator
