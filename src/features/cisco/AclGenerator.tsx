import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface AclRule {
  id: number
  action: 'permit' | 'deny'
  protocol: string
  source: string
  destination: string
}

const defaultRules: AclRule[] = [
  {
    id: 1,
    action: 'permit',
    protocol: 'ip',
    source: '192.168.10.0 0.0.0.255',
    destination: 'any',
  },
  {
    id: 2,
    action: 'deny',
    protocol: 'ip',
    source: 'any',
    destination: 'any',
  },
]

function AclGenerator() {
  const [aclNumber, setAclNumber] = useState('100')
  const [rules, setRules] = useState<AclRule[]>(defaultRules)
  const [action, setAction] = useState<'permit' | 'deny'>('permit')
  const [protocol, setProtocol] = useState('ip')
  const [source, setSource] = useState('any')
  const [destination, setDestination] = useState('any')
  const [copied, setCopied] = useState(false)

  function addRule() {
    if (!source.trim() || !destination.trim()) {
      return
    }

    setRules((current) => [
      ...current,
      {
        id: Date.now(),
        action,
        protocol,
        source: source.trim(),
        destination: destination.trim(),
      },
    ])
  }

  function removeRule(id: number) {
    setRules((current) => current.filter((rule) => rule.id !== id))
  }

  function reset() {
    setAclNumber('100')
    setRules(defaultRules)
    setAction('permit')
    setProtocol('ip')
    setSource('any')
    setDestination('any')
    setCopied(false)
  }

  const config = [
    'enable',
    'configure terminal',
    '!',
    `ip access-list extended ${aclNumber}`,
    ...rules.map(
      (rule, index) =>
        ` ${index + 10} ${rule.action} ${rule.protocol} ${rule.source} ${rule.destination}`,
    ),
    ' exit',
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <Network size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              ACL Generator
            </h2>
            <p className="text-xs text-slate-500">
              Generate extended Cisco access control lists.
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
          <input
            value={aclNumber}
            onChange={(e) => setAclNumber(e.target.value)}
            placeholder="ACL Number e.g. 100"
            className={inputClass}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <select
              value={action}
              onChange={(e) =>
                setAction(e.target.value as 'permit' | 'deny')
              }
              className={inputClass}
            >
              <option value="permit">Permit</option>
              <option value="deny">Deny</option>
            </select>

            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className={inputClass}
            >
              <option value="ip">IP</option>
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="icmp">ICMP</option>
            </select>

            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Source"
              className={inputClass}
            />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              className={inputClass}
            />
          </div>

          <button
            type="button"
            onClick={addRule}
            className={buttonClass}
          >
            <Plus size={16} />
            Add Rule
          </button>

          <div className="mt-5 space-y-2">
            {rules.map((rule, index) => (
              <div
                key={rule.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0 font-mono text-xs">
                  <span className="mr-2 text-slate-600">
                    {index + 10}
                  </span>

                  <span
                    className={
                      rule.action === 'permit'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }
                  >
                    {rule.action}
                  </span>

                  <span className="mx-2 text-slate-400">
                    {rule.protocol}
                  </span>

                  <span className="text-slate-300">
                    {rule.source} → {rule.destination}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeRule(rule.id)}
                  className="shrink-0 text-slate-500 hover:text-red-400"
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
  'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500'

const buttonClass =
  'mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400'

export default AclGenerator
