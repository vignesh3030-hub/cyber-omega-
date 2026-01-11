
import React, { useState, useEffect } from 'react';
import { CloudLog, RawCloudLog } from '../types';
import { RAW_LOG_SAMPLES, MOCK_BASELINES } from '../constants';
import { normalizeLog, calculateAnomalyScore } from '../services/threatEngine';
import { Terminal, Database, ChevronRight, FileJson, Activity, Search } from 'lucide-react';

const Monitoring: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [activeProcessing, setActiveProcessing] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const raw = RAW_LOG_SAMPLES[Math.floor(Math.random() * RAW_LOG_SAMPLES.length)];
      const id = Math.random().toString(36).substr(2, 6).toUpperCase();
      
      const normalized = normalizeLog(raw, id);
      const baseline = MOCK_BASELINES[normalized.userId] || MOCK_BASELINES['u123'];
      const score = calculateAnomalyScore(normalized, baseline);
      
      const processEntry = { raw, normalized, score, id };
      setActiveProcessing(processEntry);
      
      setLogs(prev => [processEntry, ...prev.slice(0, 14)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 space-y-8 h-full flex flex-col pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Processing Pipeline</h2>
          <p className="text-slate-400">Step-by-step visibility into the Cyber Omega automated ingestion and scoring engine.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-slate-900 px-6 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ingestion Active</span>
          </div>
        </div>
      </div>

      {/* Step Visualization (Real-time) */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-stretch">
        {/* Step 1: Raw Ingestion */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-orange-400">
              <Database className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest">01 Ingestion</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">raw_json</span>
          </div>
          <div className="flex-1 bg-black/60 rounded-2xl p-4 font-mono text-[9px] text-slate-400 overflow-hidden leading-relaxed border border-slate-800/50">
            {activeProcessing ? (
              <pre className="whitespace-pre-wrap">{JSON.stringify(activeProcessing.raw, null, 2)}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-700">Waiting for cloud audit pulse...</div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center text-slate-800">
          <ChevronRight className="w-8 h-8" />
        </div>

        {/* Step 2: Normalization */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-blue-400">
              <FileJson className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest">02 Normalization</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">normalized_obj</span>
          </div>
          <div className="flex-1 space-y-4">
            {activeProcessing ? (
              <>
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Identity</div>
                  <div className="text-white text-sm font-bold">{activeProcessing.normalized.userName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Action/Resource</div>
                  <div className="text-blue-400 text-sm font-bold">{activeProcessing.normalized.action}</div>
                  <div className="text-slate-400 text-xs truncate">{activeProcessing.normalized.resource}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Volume</div>
                    <div className="text-emerald-400 text-xs font-mono">{activeProcessing.normalized.dataVolume} MB</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">IP/Location</div>
                    <div className="text-slate-300 text-[10px]">{activeProcessing.normalized.location}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-700 italic">Processing...</div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center text-slate-800">
          <ChevronRight className="w-8 h-8" />
        </div>

        {/* Step 5: Scoring */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-rose-400">
              <Search className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest">05 Scoring</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">anomaly_score</span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            {activeProcessing ? (
              <>
                <div className={`text-6xl font-black transition-colors ${activeProcessing.score.total > 50 ? 'text-red-500' : 'text-slate-400'}`}>
                  {activeProcessing.score.total}
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Calculation</div>
                  <div className="flex gap-2 mt-2">
                    <span className={`w-2 h-2 rounded-full ${activeProcessing.score.loginTime > 0 ? 'bg-blue-500' : 'bg-slate-800'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${activeProcessing.score.dataSpike > 0 ? 'bg-emerald-500' : 'bg-slate-800'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${activeProcessing.score.newResource > 0 ? 'bg-orange-500' : 'bg-slate-800'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${activeProcessing.score.newLocation > 0 ? 'bg-purple-500' : 'bg-slate-800'}`}></span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-slate-800">Idle</div>
            )}
          </div>
        </div>
      </div>

      {/* Historical Processing Table */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="grid grid-cols-12 p-6 bg-slate-800/40 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <div className="col-span-1">Task ID</div>
          <div className="col-span-2">Ingestion Time</div>
          <div className="col-span-2">User Identity</div>
          <div className="col-span-4">Operation Summary</div>
          <div className="col-span-2 text-center">Calculated Score</div>
          <div className="col-span-1 text-center">Alert Status</div>
        </div>
        <div className="overflow-y-auto flex-1 font-mono">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center p-24 text-slate-700 uppercase font-black text-sm tracking-widest">
              Awaiting data stream...
            </div>
          ) : (
            logs.map((item) => (
              <div key={item.id} className="grid grid-cols-12 p-6 border-b border-slate-800/40 items-center hover:bg-slate-800/30 transition-all group">
                <div className="col-span-1 text-slate-600 text-[11px] font-bold">#{item.id}</div>
                <div className="col-span-2 text-slate-500 text-xs">{new Date(item.normalized.timestamp).toLocaleTimeString()}</div>
                <div className="col-span-2 text-white text-xs font-bold">{item.normalized.userName}</div>
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <div className="truncate">
                    <span className="text-blue-400 text-xs font-bold">{item.normalized.action}</span>
                    <span className="text-slate-600 mx-2 text-[10px]">→</span>
                    <span className="text-slate-500 text-[10px]">{item.normalized.resource}</span>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black border transition-all ${
                    item.score.total > 50 
                      ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-lg shadow-red-500/5' 
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {item.score.total} pts
                  </span>
                </div>
                <div className="col-span-1 flex justify-center">
                  {item.score.total > 50 ? (
                    <div className="flex flex-col items-center">
                      <Activity className="w-4 h-4 text-red-500 animate-pulse mb-1" />
                      <span className="text-[8px] font-black text-red-500/60 uppercase">Triggered</span>
                    </div>
                  ) : (
                    <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
