import { Router, Settings2 } from 'lucide-react'
import IpAddressGenerator from './IpAddressGenerator'
import DhcpGenerator from './DhcpGenerator'
import NatGenerator from './NatGenerator'
import FirewallGenerator from './FirewallGenerator'
import VlanGenerator from './VlanGenerator'
import StaticRouteGenerator from './StaticRouteGenerator'
import OspfGenerator from './OspfGenerator'
import HotspotGenerator from './HotspotGenerator'
import BridgeGenerator from './BridgeGenerator'
import QueueGenerator from './QueueGenerator'

function MikroTikTools() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1.5 text-xs font-medium text-orange-400">
          <Router size={14} />
          MikroTik Networking
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <Settings2 size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              MikroTik Tools
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Generate and manage practical MikroTik RouterOS
              configurations for common network engineering scenarios.
            </p>
          </div>
        </div>
      </div>

      <IpAddressGenerator />
      <DhcpGenerator />
      <NatGenerator />
      <FirewallGenerator />
      <VlanGenerator />
      <StaticRouteGenerator />
      <OspfGenerator />
      <HotspotGenerator />
      <BridgeGenerator />
      <QueueGenerator />
    </div>
  )
}

export default MikroTikTools
