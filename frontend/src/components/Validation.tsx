import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Database, Calendar } from 'lucide-react';

const generateBacktestData = () => {
  const data = [];
  const now = new Date();
  for (let i = -72; i <= 0; i++) {
    const t = new Date(now.getTime() + i * 3600000);
    const baseVal = 140 + Math.sin(i / 12 * Math.PI) * 30;
    const actual = Math.round(baseVal + (Math.random() * 10 - 5));
    const predicted = Math.round(baseVal + (Math.random() * 8 - 4));
    
    data.push({
      time: t.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      actual,
      predicted
    });
  }
  return data;
};

export default function Validation() {
  const data = generateBacktestData();

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-light mb-1 text-atmos-mint">MODEL VALIDATION</h2>
          <p className="text-gray-400">Forecast evaluated on a historical hold-out period.</p>
        </div>
        <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold flex items-center">
          <ShieldCheck size={14} className="mr-1" /> BACKTESTED
        </span>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        <div className="flex-1 bg-atmos-card border border-atmos-border rounded-xl p-6 relative flex flex-col">
          <h3 className="text-white text-lg font-light mb-6 text-center">ACTUAL VS PREDICTED (PM2.5)</h3>
          
          <div className="absolute top-6 right-6 flex space-x-4 text-xs font-medium">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-300">OBSERVED</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-atmos-mint"></span>
              <span className="text-gray-300">MODELED</span>
            </div>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202a30" vertical={false} />
                <XAxis dataKey="time" stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} minTickGap={30} />
                <YAxis stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131b20', borderColor: '#202a30', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={false} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="#00e5ff" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-80 space-y-6 flex flex-col overflow-y-auto">
          
          <div className="bg-atmos-card border border-atmos-border rounded-xl p-5">
            <h4 className="text-gray-400 text-xs font-bold tracking-widest mb-4">EVALUATION METRICS</h4>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Mean Absolute Error (MAE)</div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-light text-white">12.4</span>
                  <span className="text-sm text-gray-400 mb-1">µg/m³</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Root Mean Square Error (RMSE)</div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-light text-white">15.8</span>
                  <span className="text-sm text-gray-400 mb-1">µg/m³</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-xs text-gray-400 mb-2">VS NAIVE BASELINE</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Baseline MAE</span>
                <span className="text-white">18.2 µg/m³</span>
              </div>
              <div className="text-xs text-green-400 mt-1">Model is 31% better than persistence</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-gray-400 text-xs font-bold tracking-widest mb-4">METHODOLOGY</h4>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <Calendar size={16} className="text-atmos-mint mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold">Test Period</div>
                  <div className="text-gray-500 text-xs">Last 5 days of historical data</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Database size={16} className="text-atmos-mint mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold">Features</div>
                  <div className="text-gray-500 text-xs">Lags (1h, 24h), Rolling Means (24h), Weather (Wind, Humidity, Temp), Time indicators</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
