import React from 'react';
import { Clock, MapPin, CheckCircle } from 'lucide-react';

const windows = [
  { id: 1, day: 'TOMORROW', time: '06:00–08:00', station: 'RK Puram', pm25: 65, status: 'Best' },
  { id: 2, day: 'TOMORROW', time: '14:00–16:00', station: 'Okhla', pm25: 82, status: 'Good' },
  { id: 3, day: 'WEDNESDAY', time: '05:00–07:00', station: 'Punjabi Bagh', pm25: 70, status: 'Best' },
  { id: 4, day: 'THURSDAY', time: '13:00–15:00', station: 'ITO', pm25: 88, status: 'Moderate' },
];

export default function CleanAir() {
  return (
    <div className="h-full flex flex-col space-y-6 max-w-4xl mx-auto">
      <div className="shrink-0 flex justify-between items-end text-center flex-col items-center mb-8 mt-4">
        <h2 className="text-3xl font-light mb-2 text-atmos-mint">CLEAN AIR WINDOWS</h2>
        <p className="text-gray-400">Find better hours and locations over the next 4 days.</p>
        <div className="mt-4">
          <span className="px-3 py-1 rounded bg-atmos-mint/20 text-atmos-mint border border-atmos-mint/30 text-xs font-bold">MODELED FORECAST</span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {windows.map((w, i) => (
          <div key={w.id} className="bg-atmos-card border border-atmos-border rounded-xl p-6 flex items-center justify-between hover:border-atmos-mint/30 transition-colors group">
            
            <div className="flex items-center space-x-6">
              <div className="text-4xl font-light text-white/20 group-hover:text-atmos-mint/40 transition-colors w-12 text-center">
                {i + 1}
              </div>
              
              <div>
                <div className="text-xs text-atmos-mint font-bold tracking-wider mb-1">{w.day}</div>
                <div className="flex items-center space-x-2 text-white text-xl">
                  <Clock size={20} className="text-gray-500" />
                  <span>{w.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-gray-300">{w.station}</span>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end space-x-2 mb-1">
                  <span className="text-2xl font-light text-white">{w.pm25}</span>
                  <span className="text-xs text-gray-500">µg/m³</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <CheckCircle size={12} className={w.status === 'Best' ? 'text-green-400' : 'text-yellow-400'} />
                  <span className={`text-xs ${w.status === 'Best' ? 'text-green-400' : 'text-yellow-400'}`}>{w.status} Option</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-4">
        Based on XGBoost forecast model predictions. Does not account for sudden localized emission events.
      </div>
    </div>
  );
}
