import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface Vlan {
  id: number
}

const defaultVlans: Vlan[] = [
  { id: 10 },
  { id: 20 },
  { id: 30 },
]

function StpGenerator() {
  const [vlans, setVlans] = useState<Vlan[]>(defaultVlans)
  const [vlanId, setVlanId] = useState('')
  const [mode, setMode] = useState<'rapid-pvst' | 'pvst'>('rapid-pvst')
  const [role, setRole] = useState<'none' | 'primary' | 'secondary'>('none')
  const [priority, setPriority] = useState('32768')
  const [portFast, setPortFast] = useState(true)
  const [bpduGuard, setBpduGuard] = useState(true)
  const [copied, setCopied] = useState(false)

  function addVlan() {
    const id = Number(vlanId)

    if (!Number.isInteger(id) || id < 1 || id > 4094) {
      return
    }

    if (vlans.some((vlan) => vlan.id === id)) {
      return
    }

    setVlans((current) => [...current, { id }].sort((a, b) => a.id - b.id))
    setVlanId('')
  }

  function removeVlan(id: number) {
    setVlans((current) => current.filter((vlan) => vlan.id !== id))
  }

  function reset() {
    setVlans(defaultVlans)
    setVlanId('')
    setMode('rapid-pvst')
    setRole('none')
    setPriority('32768')
    setPortFast(true)
    setBpduGuard(true)
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    mode === 'rapid-pvst'
      ? 'spanning-tree mode rapid-pvst'
      : 'spanning-tree mode pvst',
    '!',
    ...vlans.flatMap((vlan) => {
      if (role === 'primary') {
        return [
          `spanning-tree vlan ${vlan.id} root primary`,
          '!',
        ]
      }

      if (role === 'secondary') {
        return [
          `spanning-tree vlan ${vlan.id} root secondary`,
          '!',
        ]
      }

      return [
        `spanning-tree vlan ${vlan.id} priority ${priority || '32768'}`,
        '!',
      ]
    }),
    ...(portFast
      ? [
          'interface range GigabitEthernet0/1 - 24',
          ' spanning-tree portfast',
          ...(bpduGuard
            ? [' spanning-tree bpduguard enable']
            : []),
          ' exit',
          '!',
        ]
      : []),
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              STP Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco Spanning Tree Protocol configuration.
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
            STP Configuration
          </h3>

          <div className="mt-4">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Spanning Tree Mode
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('rapid-pvst')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  mode === 'rapid-pvst'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                Rapid-PVST+
              </button>

              <button
                type="button"
                onClick={() => setMode('pvst')}
                className={[
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition',
                  mode === 'pvst'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-700 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                PVST+
              </button>
            </div>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Switch Role
            </span>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['none', 'Priority'],
                ['primary', 'Root Primary'],
                ['secondary', 'Root Secondary'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRole(
                      value as 'none' | 'primary' | 'secondary',
                    )
                  }
                  className={[
                    'rounded-lg border px-2 py-2.5 text-xs font-medium transition',
                    role === value
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-slate-700 text-slate-400 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {role === 'none' && (
            <div className="mt-5">
              <label
                htmlFor="stp-priority"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Bridge Priority
              </label>

              <input
                id="stp-priority"
                type="number"
                min="0"
                max="61440"
                step="4096"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                placeholder="32768"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Cisco STP priorities normally use increments of 4096.
              </p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white">
              VLANs
            </h3>

            <div className="mt-3 flex gap-2">
              <input
                type="number"
                min="1"
                max="4094"
                value={vlanId}
                onChange={(event) => setVlanId(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    addVlan()
                  }
                }}
                placeholder="VLAN ID"
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={addVlan}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {vlans.map((vlan) => (
                <div
                  key={vlan.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
                >
                  <span className="font-mono text-sm text-amber-400">
                    VLAN {vlan.id}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeVlan(vlan.id)}
                    className="text-slate-500 transition hover:text-red-400"
                    title="Remove VLAN"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={portFast}
                onChange={(event) => setPortFast(event.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />

              <span className="text-sm text-slate-300">
                Enable PortFast
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={bpduGuard}
                disabled={!portFast}
                onChange={(event) => setBpduGuard(event.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />

              <span
                className={[
                  'text-sm',
                  portFast ? 'text-slate-300' : 'text-slate-600',
                ].join(' ')}
              >
                Enable BPDU Guard
              </span>
            </label>
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

export default StpGenerator
