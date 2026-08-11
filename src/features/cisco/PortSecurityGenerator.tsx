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

function PortSecurityGenerator() {
  const [ports, setPorts] = useState<Port[]>(defaultPorts)
  const [portName, setPortName] = useState('')
  const [maximum, setMaximum] = useState('2')
  const [violation, setViolation] = useState<'shutdown' | 'restrict' | 'protect'>(
    'shutdown',
  )
  const [sticky, setSticky] = useState(true)
  const [aging, setAging] = useState(false)
  const [agingTime, setAgingTime] = useState('5')
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
    setPorts(defaultPorts)
    setPortName('')
    setMaximum('2')
    setViolation('shutdown')
    setSticky(true)
    setAging(false)
    setAgingTime('5')
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    ...ports.flatMap((port) => [
      `interface ${port.name}`,
      ' switchport mode access',
      ' switchport port-security',
      ` switchport port-security maximum ${maximum || '2'}`,
      ` switchport port-security violation ${violation}`,
      ...(sticky
        ? [' switchport port-security mac-address sticky']
        : []),
      ...(aging
        ? [
            ' switchport port-security aging type inactivity',
            ` switchport port-security aging time ${agingTime || '5'}`,
          ]
        : []),
      ' no shutdown',
      ' exit',
      '!',
    ]),
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Port Security Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco switch port-security configuration.
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
            Security Settings
          </h3>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-300">
              Member Interfaces
            </h4>

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

            <div className="mt-4 space-y-2">
              {ports.map((port) => (
                <div
                  key={port.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
                >
                  <span className="font-mono text-sm text-red-400">
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

          <div className="mt-6">
            <label
              htmlFor="port-security-maximum"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Maximum Secure MAC Addresses
            </label>

            <input
              id="port-security-maximum"
              type="number"
              min="1"
              max="4096"
              value={maximum}
              onChange={(event) => setMaximum(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Violation Mode
            </span>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['shutdown', 'Shutdown'],
                ['restrict', 'Restrict'],
                ['protect', 'Protect'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setViolation(
                      value as 'shutdown' | 'restrict' | 'protect',
                    )
                  }
                  className={[
                    'rounded-lg border px-2 py-2.5 text-xs font-medium transition',
                    violation === value
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-slate-700 text-slate-400 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={sticky}
                onChange={(event) => setSticky(event.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />

              <span className="text-sm text-slate-300">
                Enable sticky MAC learning
              </span>
            </label>
          </div>

          <div className="mt-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={aging}
                onChange={(event) => setAging(event.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />

              <span className="text-sm text-slate-300">
                Enable inactive MAC aging
              </span>
            </label>
          </div>

          {aging && (
            <div className="mt-4">
              <label
                htmlFor="port-security-aging"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Aging Time (minutes)
              </label>

              <input
                id="port-security-aging"
                type="number"
                min="1"
                max="1440"
                value={agingTime}
                onChange={(event) => setAgingTime(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>
          )}
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

          <pre className="max-h-[600px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
            <code>{config}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default PortSecurityGenerator
