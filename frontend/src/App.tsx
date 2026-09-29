import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, AlertTriangle, Wind, Info, Map as MapIcon, ShieldCheck } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';
import Scenarios from './components/Scenarios';
import Attribution from './components/Attribution';
import Validation from './components/Validation';
import CleanAir from './components/CleanAir';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-atmos-dark flex flex-col items-center justify-center">
        <div className="text-center p-12 bg-atmos-card border border-atmos-border rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-widest">ATMOSTWIN</h1>
          <p className="text-atmos-mint mb-8">Urban Environmental Digital Twin</p>
          <div className="text-gray-400 mb-8 space-y-2 text-lg">
            <p>See pollution.</p>
            <p>Understand its drivers.</p>
            <p>Test possible actions.</p>
          </div>
          <button 
            onClick={() => setShowSplash(false)}
            className="px-8 py-3 bg-atmos-mint/10 text-atmos-mint border border-atmos-mint/30 rounded-lg hover:bg-atmos-mint/20 transition-all font-medium uppercase tracking-wider"
          >
            Enter Digital Twin
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'forecast': return <Forecast />;
      case 'scenarios': return <Scenarios />;
      case 'attribution': return <Attribution />;
      case 'validation': return <Validation />;
      case 'cleanair': return <CleanAir />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-atmos-dark text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-atmos-border bg-atmos-card flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-widest mb-1">ATMOSTWIN</h1>
          <div className="flex items-center space-x-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-gray-400">DEMO DATA / CACHED</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'forecast', label: 'Forecast', icon: TrendingUp },
            { id: 'attribution', label: 'Sources', icon: AlertTriangle },
            { id: 'scenarios', label: 'Scenarios', icon: Wind },
            { id: 'cleanair', label: 'Clean Air', icon: MapIcon },
            { id: 'validation', label: 'Validation', icon: ShieldCheck },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-atmos-mint/10 text-atmos-mint border border-atmos-mint/20' 
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 m-4 rounded-lg bg-black/40 border border-atmos-border text-xs text-gray-500 space-y-2">
          <div className="flex items-center justify-between">
            <span>OBSERVED</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="flex items-center justify-between">
            <span>MODELED</span>
            <span className="w-2 h-2 rounded-full bg-atmos-mint"></span>
          </div>
          <div className="flex items-center justify-between">
            <span>SCENARIO</span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-atmos-border bg-atmos-card/50 flex items-center px-8 shrink-0 justify-between">
          <h2 className="text-xl font-light">DELHI <span className="text-gray-500 ml-2">AIR QUALITY DIGITAL TWIN</span></h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
