
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  HardDrive,
  ExternalLink,
  Inbox
} from 'lucide-react';

const trendData: any[] = [];
const resourceData: any[] = [];
const leaderboardData: any[] = [];
const recentDetections: any[] = [];

const StatCard = ({ title, value, icon: Icon, trend, color, subValue }: any) => (
  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-3xl shadow-lg hover:border-slate-700 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-current/10`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend !== undefined && trend !== 0 && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
        {subValue && <span className="text-xs text-slate-500 font-medium">{subValue}</span>}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 text-blue-500 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Center Standby</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Security Operations</h1>
          <p className="text-slate-400 mt-1">Awaiting data ingestion from cloud infrastructure.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1">
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm">Real-time</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-300 rounded-xl text-xs font-bold">Last 24h</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-300 rounded-xl text-xs font-bold">7 Days</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Threats" value="0" icon={ShieldAlert} color="bg-rose-600" subValue="Critical" />
        <StatCard title="Ingestion Rate" value="0.0" icon={Activity} color="bg-blue-600" subValue="GB/sec" />
        <StatCard title="Mean Score" value="0" icon={Zap} color="bg-indigo-600" subValue="Risk Index" />
        <StatCard title="Data Volume" value="0.0" icon={HardDrive} color="bg-emerald-600" subValue="Petabytes" />
      </div>

      {/* Middle Layout: Trends & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Threat Propagation</h3>
              <p className="text-sm text-slate-500">Awaiting anomaly detection signals</p>
            </div>
          </div>
          <div className="h-72 w-full flex items-center justify-center border border-dashed border-slate-800 rounded-3xl">
            <div className="text-center">
              <Activity className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">No Active Signal Stream</p>
            </div>
          </div>
        </div>

        {/* Risk Leaderboard */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-6">Risk Leaderboard</h3>
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <Users className="w-12 h-12 text-slate-800" />
             <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">No User Deviations Detected</p>
          </div>
          <button className="mt-8 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest transition-all">
            Manage Baselines
          </button>
        </div>
      </div>

      {/* Bottom Layout: Target Resources & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Target Resources Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold text-white mb-6">Targeted Services</h3>
          <div className="h-64 w-full flex items-center justify-center">
             <p className="text-slate-700 font-bold uppercase text-[10px] tracking-widest">No Resource Access Data</p>
          </div>
        </div>

        {/* Recent Detections List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Real-time Incident History</h3>
            <button className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1 uppercase tracking-widest">
              Live Feed <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20 bg-slate-950/30 rounded-3xl border border-slate-800/40">
             <Inbox className="w-12 h-12 text-slate-800 mb-4" />
             <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">Queue is Clear - No Incidents Found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
