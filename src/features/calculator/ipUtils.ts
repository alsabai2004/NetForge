export interface IPv4Calculation {
  ip: string
  cidr: number
  subnetMask: string
  networkAddress: string
  broadcastAddress: string
  firstHost: string
  lastHost: string
  totalAddresses: number
  usableHosts: number
  ipClass: string
  addressType: 'Private' | 'Public'
}

function ipToNumber(ip: string): number {
  return ip
    .split('.')
    .reduce((result, octet) => (result << 8) | Number(octet), 0) >>> 0
}

function numberToIp(value: number): string {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join('.')
}

function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.')

  return (
    parts.length === 4 &&
    parts.every((part) => {
      if (!/^\d+$/.test(part)) return false

      const value = Number(part)
      return value >= 0 && value <= 255
    })
  )
}

function getIpClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D'
  return 'E'
}

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split('.').map(Number)

  return (
    a === 10 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  )
}

export function calculateIPv4(
  ip: string,
  cidr: number,
): IPv4Calculation | null {
  if (!isValidIPv4(ip) || cidr < 0 || cidr > 32) {
    return null
  }

  const ipNumber = ipToNumber(ip)

  const mask =
    cidr === 0
      ? 0
      : (0xffffffff << (32 - cidr)) >>> 0

  const network = (ipNumber & mask) >>> 0
  const broadcast = (network | (~mask >>> 0)) >>> 0

  const totalAddresses = 2 ** (32 - cidr)

  const usableHosts =
    cidr >= 31 ? totalAddresses : Math.max(totalAddresses - 2, 0)

  const firstHost =
    cidr >= 31 ? numberToIp(network) : numberToIp(network + 1)

  const lastHost =
    cidr >= 31
      ? numberToIp(broadcast)
      : numberToIp(broadcast - 1)

  return {
    ip,
    cidr,
    subnetMask: numberToIp(mask),
    networkAddress: numberToIp(network),
    broadcastAddress: numberToIp(broadcast),
    firstHost,
    lastHost,
    totalAddresses,
    usableHosts,
    ipClass: getIpClass(Number(ip.split('.')[0])),
    addressType: isPrivateIPv4(ip) ? 'Private' : 'Public',
  }
}
