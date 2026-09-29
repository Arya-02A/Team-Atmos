import React, { useState, useEffect } from 'react';
import Map from './Map';
import { Wind, Droplets, Thermometer } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'PM2.5', val: '142', unit: 'µg/m³', color: 'text-red-400' },
          { label: 'PM10', val: '210', unit: 'µg/m³', color: 'text-orange-400' },
          { label: 'NO2', val: '45', unit: 'µg/m³', color: 'text-yellow-400' },
          { label: 'AQI', val: '280', unit: '', color: 'text-red-500' },
        ].map(k => (
          <div key={k.label} className="bg-atmos-card border border-atmos-border p-4 rounded-xl relative overflow-hidden group hover:border-atmos-mint/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 font-medium">{k.label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">OBSERVED</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className={`text-3xl font-light ${k.color}`}>{k.val}</span>
              <span className="text-gray-500 text-sm">{k.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex space-x-6 min-h-0 h-[600px]">
        <div className="flex-1 relative rounded-xl shadow-2xl h-full">
          <Map />
          <div className="absolute top-4 left-4 z-[400] bg-atmos-dark/90 backdrop-blur border border-atmos-border p-2 rounded-lg text-xs space-y-1">
            <div className="text-gray-400 mb-1">Layers</div>
            <label className="flex items-center space-x-2"><input type="checkbox" checked readOnly className="accent-atmos-mint"/> <span>Stations</span></label>
            <label className="flex items-center space-x-2"><input type="checkbox" readOnly className="accent-atmos-mint"/> <span>Heatmap</span></label>
          </div>
        </div>
        
        {/* Intelligence Panel */}
        <div className="w-80 bg-atmos-card border border-atmos-border rounded-xl p-6 flex flex-col overflow-y-auto space-y-6 shrink-0">
          <div>
            <h3 className="text-atmos-mint text-sm font-bold tracking-widest mb-4">ATMOSTWIN INTELLIGENCE</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-xs text-gray-400 mb-2">CURRENT CONDITIONS (Avg)</div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-2xl font-light">142</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">OBSERVED</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-gray-400">
                  <div className="flex flex-col items-center"><Wind size={14} className="mb-1 text-gray-300"/>1.8 m/s</div>
                  <div className="flex flex-col items-center"><Droplets size={14} className="mb-1 text-gray-300"/>72%</div>
                  <div className="flex flex-col items-center"><Thermometer size={14} className="mb-1 text-gray-300"/>29°C</div>
                </div>
              </div>

              <div className="p-4 bg-atmos-mint/5 rounded-lg border border-atmos-mint/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-atmos-mint font-medium">FORECAST</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-atmos-mint/20 text-atmos-mint border border-atmos-mint/30">MODELED</span>
                </div>
                <p className="text-sm text-gray-300">PM2.5 is expected to rise by ~15% over the next 24 hours due to low wind speed.</p>
              </div>

              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <div className="text-xs text-red-400 font-medium mb-1">HOTSPOT</div>
                <p className="text-sm text-gray-300">Anand Vihar (180 µg/m³)</p>
              </div>

              <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-purple-400 font-medium">CLEAN AIR WINDOW</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-atmos-mint/20 text-atmos-mint border border-atmos-mint/30">MODELED</span>
                </div>
                <p className="text-sm text-gray-300">Tomorrow 06:00–08:00 (RK Puram)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
