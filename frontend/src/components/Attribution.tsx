import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Vehicles', value: 41, color: '#00e5ff' },
  { name: 'Industry', value: 18, color: '#3b82f6' },
  { name: 'Road Dust', value: 21, color: '#8b5cf6' },
  { name: 'Biomass Burning', value: 11, color: '#ec4899' },
  { name: 'Other', value: 9, color: '#64748b' }
];

export default function Attribution() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-light mb-1 text-atmos-mint">WHY IS THE AIR POLLUTED?</h2>
          <p className="text-gray-400">Modeled source attribution based on local emission inventories.</p>
        </div>
        <span className="px-2 py-1 rounded bg-atmos-mint/20 text-atmos-mint border border-atmos-mint/30 text-xs font-bold">MODELED</span>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        <div className="w-1/2 bg-atmos-card border border-atmos-border rounded-xl p-6 relative flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#131b20', borderColor: '#202a30', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
                formatter={(value: any) => `${value}%`}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 space-y-6 overflow-y-auto">
          {data.map(item => (
            <div key={item.name} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-light text-xl" style={{ backgroundColor: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                {item.value}%
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{item.name}</h3>
                <div className="w-full bg-black/40 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-atmos-card border border-atmos-border rounded-xl p-5 mt-4">
            <h4 className="text-gray-400 text-xs font-bold tracking-widest mb-2">METHODOLOGY</h4>
            <p className="text-sm text-gray-400 mb-4">
              Source contribution estimates are modeled using published Delhi studies and assumptions. They are not directly measured by individual air-quality sensors.
            </p>
            <div className="text-xs text-gray-500 bg-black/30 p-3 rounded border border-white/5">
              Citation: Sharma & Dikshit (2016)<br/>
              Comprehensive Study on Air Pollution and Green House Gases in Delhi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
