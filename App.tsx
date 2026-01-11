
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AlertList from './components/AlertList';
import Monitoring from './components/Monitoring';
import Logs from './components/Logs';
import { Users as UsersIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'logs':
        return <Logs />;
      case 'alerts':
        return <AlertList />;
      case 'monitoring':
        return <Monitoring />;
      case 'users':
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
              <UsersIcon className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">User Behavior Baselines</h2>
            <p className="text-slate-400 max-w-md">Behavioral profiles are generated using 7-day rolling averages of cloud activity across all monitored tenants.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {[
                { title: 'Baseline Accuracy', val: '94.2%' },
                { title: 'Training Samples', val: '1.4M' },
                { title: 'Avg Profile Age', val: '4.2d' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">{stat.title}</div>
                  <div className="text-3xl font-black text-white">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
