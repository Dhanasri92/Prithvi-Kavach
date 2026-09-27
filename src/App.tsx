import {  useState  } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './components/dashboard/DashboardView';
import { HistoryView } from './components/telemetry/HistoryView';
import { EnvironmentView } from './components/telemetry/EnvironmentView';
import { HardwareStatus } from './components/hardware/HardwareStatus';
import { RecentAlerts } from './components/alerts/RecentAlerts';
import { useTelemetry } from './hooks/useTelemetry';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { telemetry, hardware, alerts, history } = useTelemetry();

  const unreadAlerts = alerts.filter(a => a.type === 'CRIT' || a.type === 'WARN').length; // Simple proxy for unread

  return (
    <MainLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      lastPacketTime={hardware?.lastPacketTime || Date.now()}
      unreadAlerts={unreadAlerts}
    >
      {activeTab === 'dashboard' && (
        <DashboardView telemetry={telemetry} history={history} hardware={hardware} />
      )}
      
      {activeTab === 'telemetry' && (
         <div className="text-gray-400 p-8 border border-gray-800 border-dashed rounded-xl flex items-center justify-center">
            Detailed Live Telemetry View — (Included in Dashboard)
         </div>
      )}

      {activeTab === 'structural' && (
         <div className="text-gray-400 p-8 border border-gray-800 border-dashed rounded-xl flex items-center justify-center">
            Advanced Structural Analysis View
         </div>
      )}

      {activeTab === 'environmental' && (
        <EnvironmentView telemetry={telemetry} alerts={alerts} />
      )}

      {activeTab === 'alerts' && (
        <div className="h-full">
           <RecentAlerts alerts={alerts} />
        </div>
      )}

      {activeTab === 'history' && (
        <HistoryView history={history} />
      )}

      {activeTab === 'device' && hardware && (
        <div className="space-y-6">
           <HardwareStatus hardware={hardware} />
           {/* Add a simplified history table below it to match screenshot 4 */}
           <HistoryView history={history} />
        </div>
      )}

      {activeTab === 'settings' && (
         <div className="text-gray-400 p-8 border border-gray-800 border-dashed rounded-xl flex items-center justify-center">
            Settings Configuration
         </div>
      )}
    </MainLayout>
  );
}

export default App;
