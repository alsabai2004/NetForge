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
  ranges: string
}

interface DhcpServer {
  id: number
  name: string
  interfaceName: string
  address: string
  gateway: string
  dns: string
  poolName: string
}

const defaultPools: DhcpPool[] = [
  {
    id: 1,
    name: 'LAN_POOL',
    ranges: '192.168.1.10-192.168.1.254',
  },
]

const defaultServers: DhcpServer[] = [
  {
    id: 1,
    name: 'dhcp-lan',
    interfaceName: 'bridge',
    address: '192.168.1.0/24',
    gateway: '192.168.1.1',
    dns: '8.8.8.8,1.1.1.1',
    poolName: 'LAN_POOL',
  },
]

function isValidIPv4(value: string) {
  const parts = value.trim().split('.')

  if (parts.length !== 4) {
    return false
  }

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) {
      return false
    }

    if (part.length > 1 && part.startsWith('0')) {
      return false
    }

    const number = Number(part)

    return number >= 0 && number <= 255
  })
}

function isValidCidr(value: string) {
  const parts = value.trim().split('/')

  if (parts.length !== 2) {
    return false
  }

  const [ip, prefix] = parts

  if (!isValidIPv4(ip)) {
    return false
  }

  if (!/^\d+$/.test(prefix)) {
    return false
  }

  const prefixNumber = Number(prefix)

  return prefixNumber >= 0 && prefixNumber <= 32
}

function isValidPoolRange(value: string) {
  const parts = value.trim().split('-')

  if (parts.length !== 2) {
    return false
  }

  return parts.every((ip) => isValidIPv4(ip.trim()))
}

function isValidName(value: string) {
  return /^[A-Za-z0-9._-]+$/.test(value)
}

function isValidInterface(value: string) {
  return /^[A-Za-z0-9._-]+$/.test(value)
}

function isValidDnsList(value: string) {
  const servers = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    servers.length > 0 &&
    servers.every((server) => isValidIPv4(server))
  )
}


function DhcpGenerator() {
  const [pools, setPools] = useState<DhcpPool[]>(defaultPools)
  const [servers, setServers] =
    useState<DhcpServer[]>(defaultServers)

  const [poolName, setPoolName] = useState('')
  const [poolRanges, setPoolRanges] = useState('')

  const [serverName, setServerName] = useState('')
  const [interfaceName, setInterfaceName] = useState('')
  const [address, setAddress] = useState('')
  const [gateway, setGateway] = useState('')
  const [dns, setDns] = useState('8.8.8.8,1.1.1.1')
  const [serverPool, setServerPool] = useState(
    defaultPools[0]?.name ?? '',
  )

  const [poolError, setPoolError] = useState('')
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)

  function addPool() {
    const name = poolName.trim()
    const ranges = poolRanges.trim()

    if (!name || !ranges) {
      setPoolError('Pool name and address range are required.')
      return
    }

    if (!isValidName(name)) {
      setPoolError(
        'Invalid pool name. Use letters, numbers, dots, hyphens, or underscores.',
      )
      return
    }

    if (!isValidPoolRange(ranges)) {
      setPoolError(
        'Invalid pool range. Example: 192.168.1.10-192.168.1.254',
      )
      return
    }

    if (pools.some((pool) => pool.name === name)) {
      setPoolError('A pool with this name already exists.')
      return
    }

    setPools((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        ranges,
      },
    ])

    setPoolName('')
    setPoolRanges('')
    setPoolError('')
  }

  function removePool(id: number) {
    const pool = pools.find((item) => item.id === id)

    setPools((current) =>
      current.filter((item) => item.id !== id),
    )

    if (pool && serverPool === pool.name) {
      const remainingPool = pools.find((item) => item.id !== id)
      setServerPool(remainingPool?.name ?? '')
    }

    setServerError('')
  }

  function addServer() {
    const name = serverName.trim()
    const interfaceValue = interfaceName.trim()
    const addressValue = address.trim()
    const gatewayValue = gateway.trim()
    const dnsValue = dns.trim()

    if (
      !name ||
      !interfaceValue ||
      !addressValue ||
      !gatewayValue ||
      !dnsValue ||
      !serverPool
    ) {
      setServerError(
        'All DHCP server fields are required, including the address pool.',
      )
      return
    }

    if (!isValidName(name)) {
      setServerError(
        'Invalid server name. Use letters, numbers, dots, hyphens, or underscores.',
      )
      return
    }

    if (!isValidInterface(interfaceValue)) {
      setServerError(
        'Invalid interface name. Use letters, numbers, dots, hyphens, or underscores.',
      )
      return
    }

    if (!isValidCidr(addressValue)) {
      setServerError(
        'Invalid network address. Example: 192.168.1.0/24',
      )
      return
    }

    if (!isValidIPv4(gatewayValue)) {
      setServerError(
        'Invalid gateway IPv4 address. Example: 192.168.1.1',
      )
      return
    }

    if (!isValidDnsList(dnsValue)) {
      setServerError(
        'Invalid DNS server list. Example: 8.8.8.8,1.1.1.1',
      )
      return
    }

    if (!pools.some((pool) => pool.name === serverPool)) {
      setServerError('The selected DHCP pool does not exist.')
      return
    }

    if (servers.some((server) => server.name === name)) {
      setServerError('A DHCP server with this name already exists.')
      return
    }

    setServers((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        interfaceName: interfaceValue,
        address: addressValue,
        gateway: gatewayValue,
        dns: dnsValue,
        poolName: serverPool,
      },
    ])

    setServerName('')
    setInterfaceName('')
    setAddress('')
    setGateway('')
    setDns('8.8.8.8,1.1.1.1')
    setServerError('')
  }

  function removeServer(id: number) {
    setServers((current) =>
      current.filter((server) => server.id !== id),
    )

    setServerError('')
  }

  function reset() {
    setPools(defaultPools)
    setServers(defaultServers)

    setPoolName('')
    setPoolRanges('')

    setServerName('')
    setInterfaceName('')
    setAddress('')
    setGateway('')
    setDns('8.8.8.8,1.1.1.1')
    setServerPool(defaultPools[0]?.name ?? '')

    setPoolError('')
    setServerError('')
    setCopied(false)
  }

  const config = [
    '/ip pool',
    ...pools.map(
      (pool) =>
        `add name=${pool.name} ranges=${pool.ranges}`,
    ),
    '',
    '/ip dhcp-server',
    ...servers.map(
      (server) =>
        `add name=${server.name} interface=${server.interfaceName} address-pool=${server.poolName} disabled=no`,
    ),
    '',
    '/ip dhcp-server network',
    ...servers.map(
      (server) =>
        `add address=${server.address} gateway=${server.gateway} dns-server=${server.dns}`,
    ),
  ].join('\n')

  async function copyConfig() {
    try {
      await navigator.clipboard.writeText(config)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setServerError(
        'Unable to copy configuration to clipboard.',
      )
    }
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
              DHCP Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate validated MikroTik DHCP pools, servers, and networks.
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

      <div className="grid min-w-0 gap-6 p-5 lg:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white">
            DHCP Pools
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={poolName}
              onChange={(event) => {
                setPoolName(event.target.value)
                setPoolError('')
              }}
              placeholder="Pool name e.g. LAN_POOL"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={poolRanges}
              onChange={(event) => {
                setPoolRanges(event.target.value)
                setPoolError('')
              }}
              placeholder="192.168.1.10-192.168.1.254"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          {poolError ? (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs leading-5 text-red-400">
              {poolError}
            </div>
          ) : null}

          <button
            type="button"
            onClick={addPool}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add Pool
          </button>

          <div className="mt-4 space-y-2">
            {pools.map((pool) => (
              <div
                key={pool.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-cyan-400">
                    {pool.name}
                  </p>

                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {pool.ranges}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removePool(pool.id)}
                  className="text-slate-500 transition hover:text-red-400"
                  title="Remove pool"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white">
              DHCP Server
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                value={serverName}
                onChange={(event) => {
                  setServerName(event.target.value)
                  setServerError('')
                }}
                placeholder="Server name e.g. dhcp-lan"
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
              />

              <input
                value={interfaceName}
                onChange={(event) => {
                  setInterfaceName(event.target.value)
                  setServerError('')
                }}
                placeholder="Interface e.g. bridge"
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <input
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value)
                  setServerError('')
                }}
                placeholder="Network e.g. 192.168.1.0/24"
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <input
                value={gateway}
                onChange={(event) => {
                  setGateway(event.target.value)
                  setServerError('')
                }}
                placeholder="Gateway e.g. 192.168.1.1"
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
              />

              <input
                value={dns}
                onChange={(event) => {
                  setDns(event.target.value)
                  setServerError('')
                }}
                placeholder="DNS e.g. 8.8.8.8,1.1.1.1"
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500 sm:col-span-2"
              />

              <select
                value={serverPool}
                onChange={(event) => {
                  setServerPool(event.target.value)
                  setServerError('')
                }}
                disabled={pools.length === 0}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500 sm:col-span-2"
              >
                {pools.length === 0 ? (
                  <option value="">No DHCP pools available</option>
                ) : (
                  pools.map((pool) => (
                    <option key={pool.id} value={pool.name}>
                      {pool.name} — {pool.ranges}
                    </option>
                  ))
                )}
              </select>
            </div>

            {serverError ? (
              <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs leading-5 text-red-400">
                {serverError}
              </div>
            ) : null}

            <button
              type="button"
              onClick={addServer}
              disabled={pools.length === 0}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={16} />
              Add DHCP Server
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {servers.map((server) => (
              <div
                key={server.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm text-cyan-400">
                    {server.name}
                  </p>

                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {server.interfaceName} • {server.address}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Pool: {server.poolName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeServer(server.id)}
                  className="shrink-0 text-slate-500 transition hover:text-red-400"
                  title="Remove DHCP server"
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
                Generated RouterOS
              </h3>

              <p className="text-xs text-slate-500">
                Ready to paste into MikroTik terminal.
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

          <pre className="max-h-[620px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
            <code>{config}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default DhcpGenerator
