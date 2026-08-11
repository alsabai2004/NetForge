import { useMemo, useState } from 'react'
import {
  Calculator,
  CheckCircle2,
  Globe,
  Network,
  Server,
  RotateCcw,
} from 'lucide-react'
import { calculateIPv4 } from './ipUtils'

function IPCalculator() {
  const [ip, setIp] = useState('192.168.1.10')
  const [cidr, setCidr] = useState(24)

  const result = useMemo(
    () => calculateIPv4(ip.trim(), cidr),
    [ip, cidr],
  )

  function resetCalculator() {
    setIp('192.168.1.10')
    setCidr(24)
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
          <Calculator size={14} />
          IP Tools
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              IPv4 Calculator
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Analyze IPv4 addresses, CIDR prefixes, subnet masks,
              network ranges, and usable hosts.
            </p>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-emerald-500/40 hover:text-white"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Network size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Network Input
              </h2>

              <p className="text-xs text-slate-500">
                Enter an IPv4 address and CIDR prefix.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="ip-address"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              IPv4 Address
            </label>

            <input
              id="ip-address"
              value={ip}
              onChange={(event) => setIp(event.target.value)}
              placeholder="192.168.1.10"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              className={`w-full rounded-lg border bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none transition ${
                ip.trim() && !result
                  ? 'border-red-500/50 focus:border-red-500'
                  : 'border-slate-700 focus:border-emerald-500'
              }`}
            />

            {ip.trim() && !result && (
              <p className="mt-2 text-xs text-red-400">
                Enter a valid IPv4 address.
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="cidr"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              CIDR Prefix
            </label>

            <div className="flex items-center gap-3">
              <input
                id="cidr"
                type="number"
                min="0"
                max="32"
                value={cidr}
                onChange={(event) => setCidr(Number(event.target.value))}
                className={`w-full rounded-lg border bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none transition ${
                  cidr < 0 || cidr > 32 || !Number.isInteger(cidr)
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-slate-700 focus:border-emerald-500'
                }`}
              />

              <span className="font-mono text-sm text-slate-500">
                /{cidr}
              </span>
            </div>

            {(cidr < 0 || cidr > 32 || !Number.isInteger(cidr)) && (
              <p className="mt-2 text-xs text-red-400">
                CIDR must be between 0 and 32.
              </p>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-500">
              Current Network
            </p>

            <p className="mt-1 break-all font-mono text-sm text-slate-200">
              {ip || '—'}/{cidr}
            </p>
          </div>
        </section>

        <section>
          {!result ? (
            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <Network size={22} />
                </div>

                <p className="mt-4 font-medium text-red-400">
                  Invalid IPv4 configuration
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Enter a valid IPv4 address and CIDR value between 0 and 32.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ResultCard
                  icon={<Network size={18} />}
                  label="Network"
                  value={result.networkAddress}
                />

                <ResultCard
                  icon={<Globe size={18} />}
                  label="Broadcast"
                  value={result.broadcastAddress}
                />

                <ResultCard
                  icon={<Server size={18} />}
                  label="Subnet Mask"
                  value={result.subnetMask}
                />

                <ResultCard
                  icon={<CheckCircle2 size={18} />}
                  label="Usable Hosts"
                  value={result.usableHosts.toLocaleString()}
                />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-white">
                      Network Details
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Calculated IPv4 addressing information.
                    </p>
                  </div>

                  <div className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                    /{result.cidr}
                  </div>
                </div>

                <div className="mt-5 divide-y divide-slate-800">
                  <Detail
                    label="IP Address"
                    value={result.ip}
                  />

                  <Detail
                    label="CIDR"
                    value={`/${result.cidr}`}
                  />

                  <Detail
                    label="Network Address"
                    value={result.networkAddress}
                  />

                  <Detail
                    label="Broadcast Address"
                    value={result.broadcastAddress}
                  />

                  <Detail
                    label="First Host"
                    value={result.firstHost}
                  />

                  <Detail
                    label="Last Host"
                    value={result.lastHost}
                  />

                  <Detail
                    label="Total Addresses"
                    value={result.totalAddresses.toLocaleString()}
                  />

                  <Detail
                    label="Usable Hosts"
                    value={result.usableHosts.toLocaleString()}
                  />

                  <Detail
                    label="IP Class"
                    value={`Class ${result.ipClass}`}
                  />

                  <Detail
                    label="Address Type"
                    value={result.addressType}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Host Range"
                  value={`${result.firstHost} → ${result.lastHost}`}
                  description="Usable host address range."
                />

                <InfoCard
                  title="Address Type"
                  value={result.addressType}
                  description={
                    result.addressType === 'Private'
                      ? 'This address belongs to a private IPv4 range.'
                      : 'This address is outside the common private IPv4 ranges.'
                  }
                />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

function ResultCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-emerald-500/20">
      <div className="flex items-center gap-2 text-emerald-400">
        {icon}

        <span className="text-xs font-medium text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-3 break-all font-mono text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  )
}

function Detail({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="break-all font-mono text-sm font-medium text-slate-200 sm:text-right">
        {value}
      </span>
    </div>
  )
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 break-all font-mono text-sm font-medium text-emerald-400">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  )
}

export default IPCalculator
