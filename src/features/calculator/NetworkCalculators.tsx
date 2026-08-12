import { useMemo, useState } from 'react'
import { Copy, Check, Network } from 'lucide-react'

function ipToNumber(ip: string) {
  const parts = ip.trim().split('.').map(Number)

  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  ) {
    return null
  }

  return (
    ((parts[0] << 24) >>> 0) +
    ((parts[1] << 16) >>> 0) +
    ((parts[2] << 8) >>> 0) +
    parts[3]
  ) >>> 0
}

function numberToIp(num: number) {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join('.')
}

function prefixToMask(prefix: number) {
  if (prefix === 0) return '0.0.0.0'

  const mask = (0xffffffff << (32 - prefix)) >>> 0
  return numberToIp(mask)
}

function NetworkCalculators() {
  const [ip, setIp] = useState('192.168.1.10')
  const [prefix, setPrefix] = useState('24')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    const address = ipToNumber(ip)
    const p = Number(prefix)

    if (address === null || !Number.isInteger(p) || p < 0 || p > 32) {
      return null
    }

    const mask =
      p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0

    const network = (address & mask) >>> 0
    const broadcast = (network | (~mask >>> 0)) >>> 0

    const totalHosts = Math.pow(2, 32 - p)
    const usableHosts =
      p >= 31 ? totalHosts : Math.max(totalHosts - 2, 0)

    const firstHost =
      p >= 31 ? network : network + 1

    const lastHost =
      p >= 31 ? broadcast : broadcast - 1

    return {
      network: numberToIp(network),
      broadcast: numberToIp(broadcast),
      mask: prefixToMask(p),
      usableHosts,
      firstHost: numberToIp(firstHost),
      lastHost: numberToIp(lastHost),
      cidr: `${numberToIp(network)}/${p}`,
    }
  }, [ip, prefix])

  const copyResult = async () => {
    if (!result) return

    const text = [
      `Network: ${result.network}`,
      `Broadcast: ${result.broadcast}`,
      `Mask: ${result.mask}`,
      `CIDR: ${result.cidr}`,
      `Usable Hosts: ${result.usableHosts}`,
      `First Host: ${result.firstHost}`,
      `Last Host: ${result.lastHost}`,
    ].join('\n')

    await navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mx-auto w-full max-w-5xl">

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Network size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Subnet & CIDR Calculator
            </h1>

            <p className="text-sm text-slate-500">
              Calculate IPv4 network information locally.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">

        <div className="grid gap-4 sm:grid-cols-2">

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              IPv4 Address
            </span>

            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.10"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Prefix / CIDR
            </span>

            <input
              type="number"
              min="0"
              max="32"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </label>

        </div>

        {result ? (
          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="font-semibold text-white">
                Network Information
              </h2>

              <button
                onClick={copyResult}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-white"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy'}
              </button>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              <Result label="Network" value={result.network} />
              <Result label="Broadcast" value={result.broadcast} />
              <Result label="Subnet Mask" value={result.mask} />
              <Result label="CIDR" value={result.cidr} />
              <Result label="First Host" value={result.firstHost} />
              <Result label="Last Host" value={result.lastHost} />
              <Result label="Usable Hosts" value={String(result.usableHosts)} />

            </div>

          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            Enter a valid IPv4 address and CIDR prefix from 0 to 32.
          </div>
        )}

      </div>

    </div>
  )
}

function Result({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-sm text-emerald-400">{value}</p>
    </div>
  )
}

export default NetworkCalculators
