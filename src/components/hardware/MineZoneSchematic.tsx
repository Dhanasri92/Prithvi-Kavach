import { Card } from '../common/Card';

export function MineZoneSchematic() {
  return (
    <Card className="h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Mine Zone Schematic</h3>
        <p className="text-xs text-gray-500 mt-1">Sensor node deployment — Zone A-01</p>
      </div>

      <div className="flex-1 flex items-center justify-center relative bg-dash-bg/30 rounded-xl border border-gray-800/50 p-6 overflow-hidden">
        {/* Simple drawn schematic using CSS shapes */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        <div className="relative w-full max-w-sm aspect-video">
          {/* Surface */}
          <div className="absolute top-[10%] left-0 right-0 h-[2px] bg-gray-600 border-dashed"></div>
          <div className="absolute top-[5%] left-[5%] text-[8px] text-gray-500 uppercase tracking-widest">Surface</div>
          
          {/* Coal Seam */}
          <div className="absolute top-[40%] left-[10%] right-[10%] h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-[8px] text-gray-600 uppercase tracking-widest">Underground Mine — Coal Seam</span>
          </div>

          {/* Zones */}
          <div className="absolute top-[60%] left-0 right-0 flex justify-between px-4 gap-2">
            <div className="flex-1 h-8 border border-dash-safe/30 rounded bg-dash-safe/5 flex items-center justify-center relative">
              <span className="text-[8px] text-dash-safe font-bold tracking-widest">ZONE A-01</span>
              <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-dash-safe/50"></div>
            </div>
            <div className="flex-1 h-8 border border-gray-800 rounded bg-dash-panel/30 flex items-center justify-center opacity-50">
              <span className="text-[8px] text-gray-500 tracking-widest">ZONE A-02</span>
            </div>
            <div className="flex-1 h-8 border border-gray-800 rounded bg-dash-panel/30 flex items-center justify-center opacity-50">
              <span className="text-[8px] text-gray-500 tracking-widest">ZONE B-01</span>
            </div>
          </div>

          {/* ESP32 Gateway */}
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 px-4 py-1.5 border border-blue-500/30 bg-blue-500/10 rounded flex flex-col items-center justify-center">
            <span className="text-[8px] text-blue-400 font-bold tracking-widest">ESP32</span>
            <span className="text-[6px] text-gray-500 uppercase">Gateway</span>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-1">
             <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-dash-safe"></span><span className="text-[6px] text-gray-500 uppercase">Active Zone</span></div>
             <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-[6px] text-gray-500 uppercase">Data Gateway</span></div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 py-2 text-xs font-bold text-dash-accent border border-dash-accent/30 bg-dash-accent/10 rounded">Zone A-01</button>
        <button className="flex-1 py-2 text-xs text-gray-500 border border-gray-800 hover:bg-dash-panel rounded transition-colors">Zone A-02</button>
        <button className="flex-1 py-2 text-xs text-gray-500 border border-gray-800 hover:bg-dash-panel rounded transition-colors">Zone B-01</button>
      </div>
    </Card>
  );
}
