
import React, { useState } from 'react';
import { Alert, Severity } from '../types';
import { MOCK_ALERTS } from '../constants';
import { analyzeThreatWithAI } from '../services/gemini';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  BrainCircuit, 
  ExternalLink,
  RefreshCw,
  Eye,
  Calculator
} from 'lucide-react';

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const styles = {
    [Severity.LOW]: 'bg-slate-800 text-slate-300 border-slate-700',
    [Severity.MEDIUM]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    [Severity.HIGH]: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    [Severity.CRITICAL]: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${styles[severity]}`}>
      {severity}
    </span>
  );
};

const AlertList: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (alert: Alert) => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    setSelectedAlert(alert);
    const result = await analyzeThreatWithAI(alert);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full animate-in slide-in-from-bottom duration-500">
      <div className="space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Threat Alert Center
          </h2>
          <div className="flex gap-2">
            <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {MOCK_ALERTS.map((alert) => (
          <div 
            key={alert.id}
            onClick={() => handleAnalyze(alert)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
              selectedAlert?.id === alert.id 
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  alert.severity === Severity.CRITICAL ? 'bg-red-500' :
                  alert.severity === Severity.HIGH ? 'bg-orange-500' : 'bg-yellow-500'
                }`}>
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{alert.type}</h4>
                  <p className="text-sm text-slate-400">User: {alert.userName} • Score: {alert.riskScore}</p>
                </div>
              </div>
              <SeverityBadge severity={alert.severity} />
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4">
              {alert.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
               <div className="flex gap-2">
                  {alert.scoreBreakdown.loginTime > 0 && <span className="text-[9px] font-bold px-2 py-1 bg-slate-800 rounded text-blue-400">LOGIN TIME</span>}
                  {alert.scoreBreakdown.dataSpike > 0 && <span className="text-[9px] font-bold px-2 py-1 bg-slate-800 rounded text-emerald-400">DATA SPIKE</span>}
                  {alert.scoreBreakdown.newResource > 0 && <span className="text-[9px] font-bold px-2 py-1 bg-slate-800 rounded text-orange-400">NEW RESOURCE</span>}
               </div>
               <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 flex flex-col min-h-[600px] overflow-hidden sticky top-0">
        {!selectedAlert ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500">
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
              <Eye className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">Incident Analysis Pane</h3>
            <p className="max-w-xs mx-auto text-sm">Select an alert to view the automated risk scoring breakdown and AI investigation results.</p>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-8 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">Anomaly Scoring Details</h3>
              <p className="text-slate-400 text-sm">Detailed point breakdown for alert <span className="text-blue-400 font-mono">#{selectedAlert.id}</span></p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Login Deviation', pts: selectedAlert.scoreBreakdown.loginTime, max: 20 },
                  { label: 'Data Spike', pts: selectedAlert.scoreBreakdown.dataSpike, max: 30 },
                  { label: 'New Resource', pts: selectedAlert.scoreBreakdown.newResource, max: 25 },
                  { label: 'New Location', pts: selectedAlert.scoreBreakdown.newLocation, max: 25 },
                ].map((score, i) => (
                  <div key={i} className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                      <span>{score.label}</span>
                      <span>{score.pts}/{score.max}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${score.pts > 0 ? 'bg-blue-500' : 'bg-slate-700'}`} 
                        style={{ width: `${(score.pts/score.max)*100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h4 className="font-bold text-white">AI-Driven Threat Investigation</h4>
              </div>
              
              {isAnalyzing ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                </div>
              ) : aiAnalysis ? (
                <div className="text-sm leading-relaxed text-slate-300 space-y-4 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                  {aiAnalysis}
                </div>
              ) : (
                <button 
                  onClick={() => handleAnalyze(selectedAlert)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/10"
                >
                  <Calculator className="w-4 h-4" /> Run Deep Investigation
                </button>
              )}
            </div>

            <div className="p-8 border-t border-slate-800 bg-slate-950/50">
              <button className="w-full border border-slate-800 hover:bg-slate-900 py-3 rounded-xl text-slate-400 font-bold transition-all text-sm">
                Mark as Investigated
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertList;
