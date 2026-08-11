import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  RotateCcw,
} from 'lucide-react'

function NatGenerator() {
  const [insideInterface, setInsideInterface] =
    useState('GigabitEthernet0/0')
  const [outsideInterface, setOutsideInterface] =
    useState('GigabitEthernet0/1')
  const [insideNetwork, setInsideNetwork] =
    useState('192.168.1.0')
  const [wildcard, setWildcard] =
    useState('0.0.0.255')
  const [overload, setOverload] =
    useState(true)
  const [copied, setCopied] = useState(false)

  function reset() {
    setInsideInterface('GigabitEthernet0/0')
    setOutsideInterface('GigabitEthernet0/1')
    setInsideNetwork('192.168.1.0')
    setWildcard('0.0.0.255')
    setOverload(true)
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    `interface ${insideInterface}`,
    ' ip nat inside',
    ' exit',
    '!',
    `interface ${outsideInterface}`,
    ' ip nat outside',
    ' exit',
    '!',
    `access-list 1 permit ${insideNetwork} ${wildcard}`,
    `ip nat inside source list 1 interface ${outsideInterface}${
      overload ? ' overload' : ''
    }`,
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              NAT Generator
            </h2>
            <p className="text-xs text-slate-500">
              Generate Cisco PAT/NAT overload configuration.
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
        <div className="grid gap-3">
          <input
            value={insideInterface}
            onChange={(e) => setInsideInterface(e.target.value)}
            placeholder="Inside Interface"
            className={inputClass}
          />

          <input
            value={outsideInterface}
            onChange={(e) => setOutsideInterface(e.target.value)}
            placeholder="Outside Interface"
            className={inputClass}
          />

          <input
            value={insideNetwork}
            onChange={(e) => setInsideNetwork(e.target.value)}
            placeholder="Inside Network"
            className={inputClass}
          />

          <input
            value={wildcard}
            onChange={(e) => setWildcard(e.target.value)}
            placeholder="Wildcard Mask"
            className={inputClass}
          />

          <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={overload}
              onChange={(e) => setOverload(e.target.checked)}
              className="h-4 w-4 accent-emerald-500"
            />
            Enable PAT / Overload
          </label>
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
      </div>
    </section>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500'

export default NatGenerator
