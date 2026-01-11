
import React from 'react';
import Logo from './Logo';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  LayoutDashboard, 
  Settings, 
  Search,
  Bell,
  ClipboardList
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'logs', label: 'Audit Logs', icon: ClipboardList },
    { id: 'alerts', label: 'Alert Center', icon: ShieldAlert },
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'users', label: 'User Baselines', icon: Users },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200 font-['Inter']">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shadow-2xl z-20">
        <div className="p-8">
          <Logo withText size={40} />
        </div>
        
        <nav className="flex-1 mt-2 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-bold text-sm">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent">
        {/* Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources, users, or logs..."
                className="bg-slate-950/50 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 w-full focus:ring-2 focus:ring-cyan-500/50 outline-none text-sm transition-all placeholder:text-slate-600 shadow-inner"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-cyan-400 transition-colors bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-slate-900 rounded-full shadow-[0_0_5px_rgba(244,63,94,0.5)]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-black text-white uppercase tracking-wider">Chief Analyst</div>
                <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">System Admin</div>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-lg shadow-cyan-500/20 rotate-3">
                SOC
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default Layout;
