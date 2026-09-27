import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lastPacketTime: number;
  unreadAlerts: number;
}

export function MainLayout({ children, activeTab, setActiveTab, lastPacketTime, unreadAlerts }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#0b1120] text-gray-100 overflow-hidden font-sans selection:bg-dash-accent/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} unreadAlerts={unreadAlerts} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar lastPacketTime={lastPacketTime} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
