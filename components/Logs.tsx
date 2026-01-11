
import React, { useState, useMemo } from 'react';
import { MOCK_LOGS, RAW_LOG_SAMPLES } from '../constants';
import { normalizeLog } from '../services/threatEngine';
import { CloudLog } from '../types';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
  Database,
  Info,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<CloudLog[]>(MOCK_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState<'ALL' | 'AWS' | 'Azure' | 'GCP'>('ALL');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesService = filterService === 'ALL' || log.service === filterService;
      
      return matchesSearch && matchesService;
    });
  }, [logs, searchQuery, filterService]);

  const generateRandomLog = () => {
    const raw = RAW_LOG_SAMPLES[Math.floor(Math.random() * RAW_LOG_SAMPLES.length)];
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    const newLog = normalizeLog(raw, id);
    setLogs(prev => [newLog, ...prev]);
  };

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Cloud Audit Trail</h2>
          <p className="text-slate-400">Comprehensive history of all normalized cloud activity logs.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={generateRandomLog}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Generate Log
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm border border-slate-700 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by user, action, or resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          {(['ALL', 'AWS', 'Azure', 'GCP'] as const).map(service => (
            <button
              key={service}
              onClick={() => setFilterService(service)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                filterService === service 
                  ? 'bg-cyan-600/10 border-cyan-500/50 text-cyan-400' 
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 border-b border-slate-800">
                <th className="w-10 px-6 py-4"></th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Operation</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Resource</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Cloud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr 
                    onClick={() => toggleExpand(log.id)}
                    className={`cursor-pointer transition-all group ${
                      expandedLogId === log.id ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
                    }`}
                  >
                    <td className="px-6 py-5">
                      {expandedLogId === log.id ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <div>
                          <div className="text-xs text-white font-mono">{new Date(log.timestamp).toLocaleDateString()}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                          {log.userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{log.userName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{log.ipAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-cyan-400 font-mono">{log.action}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <Tag className="w-3 h-3 text-slate-600 shrink-0" />
                        <div className="text-xs text-slate-400 truncate font-mono">{log.resource}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-2 py-1 rounded text-[9px] font-black border ${
                        log.service === 'AWS' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                        log.service === 'Azure' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                        'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      }`}>
                        {log.service}
                      </span>
                    </td>
                  </tr>
                  
                  {expandedLogId === log.id && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 bg-slate-950/40 border-y border-slate-800">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-top-2 duration-300">
                          {/* Normalized Detail Panel */}
                          <div className="space-y-6">
                            <div className="flex items-center gap-2 text-cyan-400 mb-4">
                              <Layers className="w-4 h-4" />
                              <h4 className="text-[10px] font-black uppercase tracking-widest">Normalized Data Object</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Log Identifier</p>
                                <p className="text-sm text-white font-mono">#{log.id}</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Identity ID</p>
                                <p className="text-sm text-white font-mono">{log.userId}</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Geolocation</p>
                                <p className="text-sm text-white">{log.location}</p>
                              </div>
                              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Payload Size</p>
                                <p className="text-sm text-white font-mono">{log.dataVolume} MB</p>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Internal Metadata</p>
                                <div className="flex gap-2">
                                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">
                                    <Database className="w-3 h-3" /> Audit Verified
                                  </span>
                                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">
                                    <Cpu className="w-3 h-3" /> Scored by Engine
                                  </span>
                                </div>
                            </div>
                          </div>

                          {/* Raw JSON Panel */}
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2 text-purple-400">
                                <Terminal className="w-4 h-4" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Raw Vendor Trace</h4>
                              </div>
                              <button className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-tighter transition-colors">
                                Copy JSON
                              </button>
                            </div>
                            <div className="flex-1 bg-black/60 rounded-3xl p-6 font-mono text-[11px] text-slate-400 overflow-auto border border-slate-800 max-h-[300px] leading-relaxed">
                              {log.raw ? (
                                <pre className="whitespace-pre-wrap">{JSON.stringify(log.raw, null, 2)}</pre>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-700 italic">
                                  <Info className="w-8 h-8 mb-2 opacity-50" />
                                  Original trace not captured for this legacy entry.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-600 uppercase font-black tracking-widest text-sm">
                    No records found matching criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;
