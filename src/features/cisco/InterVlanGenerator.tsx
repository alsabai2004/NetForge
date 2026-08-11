import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface VlanRoute {
  id: number
  name: string
  network: string
  prefix: number
  gateway: string
}

const defaultVlans: VlanRoute[] = [
  {
    id: 10,
    name: 'USERS',
    network: '192.168.10.0',
    prefix: 24,
    gateway: '192.168.10.1',
  },
  {
    id: 20,
    name: 'SERVERS',
    network: '192.168.20.0',
    prefix: 24,
    gateway: '192.168.20.1',
  },
  {
    id: 30,
    name: 'MANAGEMENT',
    network: '192.168.30.0',
    prefix: 24,
    gateway: '192.168.30.1',
  },
]

function InterVlanGenerator() {
  const [vlans, setVlans] = useState<VlanRoute[]>(defaultVlans)
  const [vlanId, setVlanId] = useState('')
  const [vlanName, setVlanName] = useState('')
  const [network, setNetwork] = useState('')
  const [prefix, setPrefix] = useState('24')
  const [gateway, setGateway] = useState('')
  const [interfaceName, setInterfaceName] = useState('GigabitEthernet0/0')
  const [copied, setCopied] = useState(false)

  function addVlan() {
    const id = Number(vlanId)
    const name = vlanName.trim().toUpperCase()
    const networkValue = network.trim()
    const gatewayValue = gateway.trim()
    const prefixValue = Number(prefix)

    if (
      !Number.isInteger(id) ||
      id < 1 ||
      id > 4094 ||
      !name ||
      !networkValue ||
      !gatewayValue ||
      !Number.isInteger(prefixValue) ||
      prefixValue < 1 ||
      prefixValue > 32
    ) {
      return
    }

    if (vlans.some((vlan) => vlan.id === id)) {
      return
    }

    setVlans((current) => [
      ...current,
      {
        id,
        name,
        network: networkValue,
        prefix: prefixValue,
        gateway: gatewayValue,
      },
    ])

    setVlanId('')
    setVlanName('')
    setNetwork('')
    setPrefix('24')
    setGateway('')
  }

  function removeVlan(id: number) {
    setVlans((current) => current.filter((vlan) => vlan.id !== id))
  }

  function reset() {
    setVlans(defaultVlans)
    setVlanId('')
    setVlanName('')
    setNetwork('')
    setPrefix('24')
    setGateway('')
    setInterfaceName('GigabitEthernet0/0')
    setCopied(false)
  }

  const routerConfig = [
    'enable',
    'configure terminal',
    '!',
    `interface ${interfaceName}`,
    ' no shutdown',
    ' exit',
    '!',
    ...vlans.flatMap((vlan) => [
      `interface ${interfaceName}.${vlan.id}`,
      ` encapsulation dot1Q ${vlan.id}`,
      ` ip address ${vlan.gateway} ${prefixToMask(vlan.prefix)}`,
      ' no shutdown',
      ' exit',
      '!',
    ]),
    'end',
    'write memory',
  ].join('\n')

  async function copyConfig() {
    await navigator.clipboard.writeText(routerConfig)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Inter-VLAN Routing Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate Cisco Router-on-a-Stick subinterface configuration.
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
            VLAN Networks
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

            <input
              value={network}
              onChange={(event) => setNetwork(event.target.value)}
              placeholder="Network e.g. 192.168.40.0"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              type="number"
              min="1"
              max="32"
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
              placeholder="Prefix"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={gateway}
              onChange={(event) => setGateway(event.target.value)}
              placeholder="Gateway e.g. 192.168.40.1"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500 sm:col-span-2"
            />
          </div>

          <button
            type="button"
            onClick={addVlan}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add VLAN Network
          </button>

          <div className="mt-5 space-y-2">
            {vlans.map((vlan) => (
              <div
                key={vlan.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0">
                  <div>
                    <span className="font-mono text-sm text-purple-400">
                      VLAN {vlan.id}
                    </span>

                    <span className="ml-3 text-sm text-slate-300">
                      {vlan.name}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {vlan.network}/{vlan.prefix} → {vlan.gateway}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeVlan(vlan.id)}
                  className="shrink-0 text-slate-500 transition hover:text-red-400"
                  title="Remove VLAN"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label
              htmlFor="router-interface"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Router Interface
            </label>

            <input
              id="router-interface"
              value={interfaceName}
              onChange={(event) => setInterfaceName(event.target.value)}
              placeholder="GigabitEthernet0/0"
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
                Router-on-a-Stick configuration.
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
            <code>{routerConfig}</code>
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

export default InterVlanGenerator
