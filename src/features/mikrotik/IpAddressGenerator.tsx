import { useState } from 'react'
import {
  Check,
  Copy,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'

interface AddressEntry {
  id: number
  address: string
  interfaceName: string
  comment: string
}

const defaultAddresses: AddressEntry[] = [
  {
    id: 1,
    address: '192.168.1.1/24',
    interfaceName: 'ether1',
    comment: 'LAN Gateway',
  },
  {
    id: 2,
    address: '10.0.0.1/30',
    interfaceName: 'ether2',
    comment: 'WAN',
  },
]

function isValidIPv4Address(value: string) {
  const parts = value.split('.')

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
  const parts = value.split('/')

  if (parts.length !== 2) {
    return false
  }

  const [ip, prefix] = parts

  if (!isValidIPv4Address(ip)) {
    return false
  }

  if (!/^\d+$/.test(prefix)) {
    return false
  }

  const prefixNumber = Number(prefix)

  return prefixNumber >= 0 && prefixNumber <= 32
}

function isValidInterfaceName(value: string) {
  return /^[A-Za-z0-9._-]+$/.test(value)
}

function escapeRouterOsString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function IpAddressGenerator() {
  const [addresses, setAddresses] =
    useState<AddressEntry[]>(defaultAddresses)

  const [address, setAddress] = useState('')
  const [interfaceName, setInterfaceName] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function addAddress() {
    const addressValue = address.trim()
    const interfaceValue = interfaceName.trim()
    const commentValue = comment.trim()

    if (!addressValue || !interfaceValue) {
      setError('Address and interface are required.')
      return
    }

    if (!isValidCidr(addressValue)) {
      setError(
        'Invalid IPv4 address. Use a format such as 192.168.10.1/24.',
      )
      return
    }

    if (!isValidInterfaceName(interfaceValue)) {
      setError(
        'Invalid interface name. Use letters, numbers, dots, hyphens, or underscores.',
      )
      return
    }

    if (
      addresses.some(
        (item) =>
          item.address === addressValue &&
          item.interfaceName === interfaceValue,
      )
    ) {
      setError('This IP address is already assigned to this interface.')
      return
    }

    setAddresses((current) => [
      ...current,
      {
        id: Date.now(),
        address: addressValue,
        interfaceName: interfaceValue,
        comment: commentValue,
      },
    ])

    setAddress('')
    setInterfaceName('')
    setComment('')
    setError('')
  }

  function removeAddress(id: number) {
    setAddresses((current) =>
      current.filter((item) => item.id !== id),
    )

    setError('')
  }

  function reset() {
    setAddresses(defaultAddresses)
    setAddress('')
    setInterfaceName('')
    setComment('')
    setError('')
    setCopied(false)
  }

  const config = [
    '/ip address',
    ...addresses.map((item) =>
      [
        'add',
        `address=${item.address}`,
        `interface=${item.interfaceName}`,
        ...(item.comment
          ? [`comment="${escapeRouterOsString(item.comment)}"`]
          : []),
      ].join(' '),
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
      setError('Unable to copy configuration to clipboard.')
    }
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
              IP Address Generator
            </h2>

            <p className="text-xs text-slate-500">
              Generate validated MikroTik IP address configuration.
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
            IP Addresses
          </h3>

          <div className="mt-4 grid gap-3">
            <input
              value={address}
              onChange={(event) => {
                setAddress(event.target.value)
                setError('')
              }}
              placeholder="Address e.g. 192.168.10.1/24"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={interfaceName}
              onChange={(event) => {
                setInterfaceName(event.target.value)
                setError('')
              }}
              placeholder="Interface e.g. ether1"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Comment (optional)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          {error ? (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs leading-5 text-red-400">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={addAddress}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            <Plus size={16} />
            Add Address
          </button>

          <div className="mt-5 space-y-2">
            {addresses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm text-blue-400">
                    {item.address}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.interfaceName}
                    {item.comment ? ` • ${item.comment}` : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeAddress(item.id)}
                  className="shrink-0 text-slate-500 transition hover:text-red-400"
                  title="Remove address"
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

          <pre className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-6 text-slate-300">
            <code>{config}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default IpAddressGenerator
