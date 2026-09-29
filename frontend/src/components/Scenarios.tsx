import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Scenarios() {
  const [traffic, setTraffic] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [dust, setDust] = useState(0);

  const basePM25 = 180;
  // Simple linear mock model for prototype
  const reduction = (traffic * 0.4) + (industry * 0.3) + (dust * 0.2);
  const newPM25 = Math.max(10, Math.round(basePM25 * (1 - reduction / 100)));

  const chartData = [
    { name: 'Baseline', value: basePM25, fill: '#ef4444' },
    { name: 'Modeled', value: newPM25, fill: '#00e5ff' }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="shrink-0">
        <h2 className="text-2xl font-light mb-1 text-atmos-mint">WHAT IF WE ACT?</h2>
        <p className="text-gray-400">Compare modeled interventions before implementation.</p>
      </div>

      <div className="flex-1 flex space-x-6 min-h-0">
        <div className="w-1/2 space-y-4 overflow-y-auto pr-2">
          
          <ScenarioCard 
            title="TRAFFIC RESTRICTION" 
            desc="Reduce vehicular movement in central zones."
            val={traffic}
            setVal={setTraffic}
            impact="40% max contribution"
          />
          <ScenarioCard 
            title="INDUSTRIAL EMISSION CONTROL" 
            desc="Mandate scrubbers and reduced output for factories."
            val={industry}
            setVal={setIndustry}
            impact="30% max contribution"
          />
          <ScenarioCard 
            title="ROAD DUST SUPPRESSION" 
            desc="Water sprinkling and mechanized sweeping on major arterial roads."
            val={dust}
            setVal={setDust}
            impact="20% max contribution"
          />

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl mt-6">
            <h4 className="text-sm font-bold text-gray-400 mb-2">ASSUMPTIONS</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              These scenarios use linear combination proxies based on published source apportionment studies for Delhi (e.g., Sharma & Dikshit, 2016). Actual atmospheric chemistry is non-linear. These are 
              <span className="text-purple-400 mx-1">MODELED SCENARIO</span> estimates, not experimentally verified causal effects.
            </p>
          </div>

        </div>

        <div className="w-1/2 bg-atmos-card border border-atmos-border rounded-xl p-6 flex flex-col">
          <h3 className="text-center font-light text-xl mb-8">MODELED IMPACT</h3>
          
          <div className="flex justify-center items-end space-x-12 mb-12">
            <div className="text-center">
              <div className="text-5xl font-light text-red-400 mb-2">{basePM25}</div>
              <div className="text-sm text-gray-500">BASELINE</div>
              <div className="mt-2"><span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">OBSERVED</span></div>
            </div>
            
            <div className="text-3xl text-gray-600 pb-8">→</div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-atmos-mint mb-2">{newPM25}</div>
              <div className="text-sm text-gray-500">AFTER INTERVENTION</div>
              <div className="mt-2"><span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">MODELED SCENARIO</span></div>
            </div>
          </div>

          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#202a30" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#9ca3af'}} />
                <YAxis stroke="#6b7280" tick={{fill: '#9ca3af'}} />
                <RechartsTooltip cursor={{fill: '#ffffff0a'}} contentStyle={{ backgroundColor: '#131b20', borderColor: '#202a30', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({ title, desc, val, setVal, impact }: any) {
  return (
    <div className="bg-atmos-card border border-atmos-border rounded-xl p-5 hover:border-white/20 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-white mb-1">{title}</h3>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-light text-atmos-mint">{val}%</span>
          <div className="text-[10px] text-gray-500 mt-1">{impact}</div>
        </div>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={val} 
        onChange={(e) => setVal(parseInt(e.target.value))}
        className="w-full accent-atmos-mint h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
