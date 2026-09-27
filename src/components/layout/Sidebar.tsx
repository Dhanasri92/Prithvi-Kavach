import { 
  LayoutDashboard, 
  Activity, 
  Layers, 
  Thermometer, 
  Bell, 
  Clock, 
  Cpu, 
  Settings 
} from 'lucide-react';
import { cn } from '../common/Card';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadAlerts: number;
}

export function Sidebar({ activeTab, setActiveTab, unreadAlerts }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
    { id: 'structural', label: 'Structural Analysis', icon: Layers },
    { id: 'environmental', label: 'Environmental', icon: Thermometer },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlerts },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'device', label: 'Device Status', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-dash-bg border-r border-gray-800 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-dash-accent/10 border border-dash-accent/20 flex items-center justify-center text-dash-accent">
          <Layers size={18} />
        </div>
        <div>
          <h1 className="font-bold text-dash-accent text-sm leading-tight tracking-wide">PRITHVI KAVACH</h1>
          <p className="text-[10px] text-dash-muted uppercase tracking-wider">Subsidence Monitor</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left relative',
                isActive 
                  ? 'bg-dash-panel text-dash-accent border border-gray-800 font-medium' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dash-panel/50'
              )}
            >
              <Icon size={18} className={isActive ? 'text-dash-accent' : 'text-gray-500'} />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute right-4 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-dash-panel rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-dash-safe animate-pulse"></div>
            <span className="text-xs font-medium text-gray-200 uppercase tracking-wider">Hardware Connected</span>
          </div>
          <p className="text-[10px] text-gray-500 flex items-center gap-1.5 ml-4">
            <Cpu size={10} /> ESP32 Gateway
          </p>
          <p className="text-[9px] text-gray-600 ml-4 mt-1">Sync: just now</p>
        </div>
        <div className="text-center mt-4 text-[9px] text-gray-600">
          <p>SIH 2026 · PS26025</p>
          <p>Prototype Interface</p>
        </div>
      </div>
    </aside>
  );
}
