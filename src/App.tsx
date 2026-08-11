import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './features/dashboard'
import IPCalculator from './features/calculator/IPCalculator'
import CiscoTools from './features/cisco/CiscoTools'
import MikroTikTools from './features/mikrotik/MikroTikTools'
import CommandLibrary from './features/commands/CommandLibrary'
import NetworkReferences from './features/references/NetworkReferences'
import SecurityCenter from './features/security/SecurityCenter'
import NetworkNotes from './features/notes/NetworkNotes'

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/calculator" element={<IPCalculator />} />

          <Route path="/cisco" element={<CiscoTools />} />

          <Route path="/mikrotik" element={<MikroTikTools />} />

          <Route
            path="/commands"
            element={<CommandLibrary />}
          />

          <Route
            path="/references"
            element={<NetworkReferences />}
          />

          <Route
            path="/notes"
            element={<NetworkNotes />}
          />

          <Route
            path="/security"
            element={<SecurityCenter />}
          />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App
