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
  name: string
}

function VlanGenerator() {
  const [vlans, setVlans] = useState<Vlan[]>([
    { id: 10, name: 'USERS' },
    { id: 20, name: 'SERVERS' },
    { id: 30, name: 'MANAGEMENT' },
  ])

  const [vlanId, setVlanId] = useState('')
  const [vlanName, setVlanName] = useState('')
  const [interfaceName, setInterfaceName] = useState('GigabitEthernet0/1')
  const [mode, setMode] = useState<'access' | 'trunk'>('access')
  const [copied, setCopied] = useState(false)

  function addVlan() {
    const id = Number(vlanId)
    const name = vlanName.trim()

    if (!Number.isInteger(id) || id < 1 || id > 4094 || !name) {
      return
    }

    if (vlans.some((vlan) => vlan.id === id)) {
      return
    }

    setVlans((current) => [...current, { id, name }])
    setVlanId('')
    setVlanName('')
  }

  function removeVlan(id: number) {
    setVlans((current) => current.filter((vlan) => vlan.id !== id))
  }

  function reset() {
    setVlans([
      { id: 10, name: 'USERS' },
      { id: 20, name: 'SERVERS' },
      { id: 30, name: 'MANAGEMENT' },
    ])

    setVlanId('')
    setVlanName('')
    setInterfaceName('GigabitEthernet0/1')
    setMode('access')
    setCopied(false)
  }

  const vlanConfig = [
    'enable',
    'configure terminal',
    '!',
    ...vlans.flatMap((vlan) => [
      `vlan ${vlan.id}`,
      ` name ${vlan.name}`,
      ' exit',
      '!',
    ]),
    `interface ${interfaceName}`,
    ` switchport mode ${mode}`,
    ...(mode === 'access'
      ? [` switchport access vlan ${vlans[0]?.id ?? 1}`]
      : [
          ` switchport trunk allowed vlan ${vlans
            .map((vlan) => vlan.id)
            .join(',')}`,
        ]),
    ' exit',
    '!',
    'end',
    'write memory',
  ].join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(vlanConfig)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              VLAN Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate VLAN and switchport configuration.
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
            VLANs
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              type="number"
              min="1"
              max="4094"
              value={vlanId}
              onChange={(event) => setVlanId(event.target.value)}
              placeholder="VLAN ID"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={vlanName}
              onChange={(event) => setVlanName(event.target.value)}
              placeholder="VLAN Name"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="button"
            onClick={addVlan}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add VLAN
          </button>

          <div className="mt-5 space-y-2">
            {vlans.map((vlan) => (
              <div
                key={vlan.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div>
                  <span className="font-mono text-sm text-emerald-400">
                    VLAN {vlan.id}
                  </span>

                  <span className="ml-3 text-sm text-slate-300">
                    {vlan.name}
                  </span>
                </div>

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

          <div className="mt-6">
            <label
              htmlFor="switch-interface"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Switch Interface
            </label>

            <input
              id="switch-interface"
              value={interfaceName}
              onChange={(event) => setInterfaceName(event.target.value)}
              placeholder="GigabitEthernet0/1"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Switchport Mode
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
            <code>{vlanConfig}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default VlanGenerator
