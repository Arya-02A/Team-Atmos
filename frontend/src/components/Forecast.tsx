import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Info } from 'lucide-react';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = -24; i <= 96; i++) {
    const t = new Date(now.getTime() + i * 3600000);
    const isForecast = i > 0;
    const baseVal = 140 + Math.sin(i / 12 * Math.PI) * 30;
    
    data.push({
      time: t.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      timestamp: t.getTime(),
      observed: isForecast ? null : Math.round(baseVal + (Math.random() * 10 - 5)),
      forecast: isForecast ? Math.round(baseVal + (i * 0.5)) : null,
      isForecast
    });
  }
  return data;
};

export default function Forecast() {
  const [data] = useState(generateData());
  const [horizon, setHorizon] = useState(96);

  const displayData = data.filter(d => (d.timestamp - Date.now()) <= horizon * 3600000);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-light mb-1 text-atmos-mint">PM2.5 FORECAST</h2>
          <p className="text-gray-400">24 HOURS OBSERVED → {horizon} HOURS MODELED</p>
        </div>
        <div className="flex space-x-2">
          {[24, 48, 72, 96].map(h => (
            <button 
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                horizon === h 
                  ? 'bg-atmos-mint/20 text-atmos-mint border-atmos-mint/50' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {h}H
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-atmos-card border border-atmos-border rounded-xl p-6 relative">
        <div className="absolute top-4 right-4 flex space-x-4 text-xs font-medium bg-black/40 p-2 rounded-lg border border-white/10 z-10">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-gray-300">OBSERVED</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-atmos-mint"></span>
            <span className="text-gray-300">MODELED</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#202a30" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280" 
              tick={{fill: '#9ca3af', fontSize: 12}}
              minTickGap={50}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{fill: '#9ca3af', fontSize: 12}}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#131b20', borderColor: '#202a30', borderRadius: '8px' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
            <ReferenceLine x={displayData.find(d => d.isForecast)?.time} stroke="#4b5563" strokeDasharray="5 5" label={{ position: 'top', value: 'FORECAST START', fill: '#9ca3af', fontSize: 12 }} />
            
            <Line type="monotone" dataKey="observed" stroke="#3b82f6" strokeWidth={3} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="forecast" stroke="#00e5ff" strokeWidth={3} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-6 shrink-0 h-48">
        <div className="bg-atmos-card border border-atmos-border rounded-xl p-5">
          <h3 className="text-gray-400 text-sm font-bold tracking-widest mb-4">MODEL METADATA</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Architecture</span>
              <span className="text-white">XGBoost Regressor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Horizon</span>
              <span className="text-white">96 Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Resolution</span>
              <span className="text-white">Hourly</span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-atmos-mint/20 text-atmos-mint border border-atmos-mint/30">MODELED</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-atmos-card border border-atmos-border rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Info size={16} className="text-gray-400" />
            <h3 className="text-gray-400 text-sm font-bold tracking-widest">WHY THIS FORECAST?</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { f: 'Previous 24h PM2.5', imp: 'High influence', color: 'bg-green-500' },
              { f: 'Low wind speed', imp: 'Moderate influence', color: 'bg-yellow-500' },
              { f: 'Humidity', imp: 'Moderate influence', color: 'bg-yellow-500' },
              { f: 'Time of day', imp: 'Low influence', color: 'bg-blue-500' }
            ].map(item => (
              <div key={item.f} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <div>
                  <div className="text-sm text-white">{item.f}</div>
                  <div className="text-xs text-gray-500">{item.imp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
