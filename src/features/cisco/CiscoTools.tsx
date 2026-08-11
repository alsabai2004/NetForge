import { Router, Settings2 } from 'lucide-react'
import InterVlanGenerator from './InterVlanGenerator'
import VlanGenerator from './VlanGenerator'
import StaticRouteGenerator from './StaticRouteGenerator'
import NatGenerator from './NatGenerator'
import AclGenerator from './AclGenerator'
import DhcpGenerator from './DhcpGenerator'
import OspfGenerator from './OspfGenerator'
import EigrpGenerator from './EigrpGenerator'
import EtherChannelGenerator from './EtherChannelGenerator'
import PortSecurityGenerator from './PortSecurityGenerator'
import StpGenerator from './StpGenerator'

function CiscoTools() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs font-medium text-blue-400">
          <Router size={14} />
          Cisco Networking
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Settings2 size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Cisco Tools
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Generate and manage practical Cisco IOS configurations
              for common network engineering scenarios.
            </p>
          </div>
        </div>
      </div>

      <VlanGenerator />
      <StaticRouteGenerator />
      <OspfGenerator />
      <DhcpGenerator />
      <AclGenerator />
      <NatGenerator />
      <EigrpGenerator />
      <EtherChannelGenerator />
      <PortSecurityGenerator />
      <StpGenerator />

      <InterVlanGenerator />
    </div>
  )
}

export default CiscoTools
