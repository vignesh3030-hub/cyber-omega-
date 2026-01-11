
import React from 'react';
import { Download, FileJson, BarChart, Activity, Calculator, Bell, ArrowRight } from 'lucide-react';

const WorkflowStep = ({ icon: Icon, title, description, index }: any) => (
  <div className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group">
    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="absolute top-6 left-6 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Step 0{index}</div>
    <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    {index < 6 && (
      <div className="hidden xl:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-800">
        <ArrowRight className="w-6 h-6" />
      </div>
    )}
  </div>
);

const WorkflowViz: React.FC = () => {
  const steps = [
    { title: 'Log Ingestion', icon: Download, description: 'Collect sample AWS CloudTrail or Azure Activity Logs in JSON format.' },
    { title: 'Data Normalization', icon: FileJson, description: 'Parse JSON logs into structured format (UserID, Action, Volume, Resource).' },
    { title: 'Baseline Creation', icon: BarChart, description: 'Compute 7-day rolling averages: login hour, data volume, and common IPs.' },
    { title: 'Real-time Monitoring', icon: Activity, description: 'Stream new entries and compare instantly against historical behavior baselines.' },
    { title: 'Anomaly Scoring', icon: Calculator, description: 'Sum deviation scores: Login(20), Data(30), New Resource(25), New Location(25).' },
    { title: 'Alert Generation', icon: Bell, description: 'Score >50 triggers MEDIUM risk alert; Score >80 triggers HIGH risk for investigation.' },
  ];

  return (
    <div className="space-y-12 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Prototype Processing Pipeline</h2>
        <p className="text-xl text-slate-400">The 6-step logical flow for transforming raw cloud audit trails into high-fidelity behavioral alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <WorkflowStep key={i} index={i + 1} {...step} />
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Scoring Algorithm Detail</h3>
            <p className="text-slate-400 text-sm">Our points-based weighting system ensures that cumulative deviations result in higher signal-to-noise ratios than individual triggers.</p>
            <div className="space-y-3">
              {[
                { label: 'Login Hour Deviation > 3hrs', pts: 20 },
                { label: 'Data Spike > 3x Average Volume', pts: 30 },
                { label: 'Unseen Resource Access', pts: 25 },
                { label: 'New Location Access', pts: 25 },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-800/30 px-5 py-4 rounded-2xl border border-slate-700/30">
                  <span className="text-sm text-slate-200">{item.label}</span>
                  <span className="text-blue-400 font-mono font-bold">+{item.pts} pts</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Alert Sensitivity</h3>
            <p className="text-slate-400 text-sm">System response depends on the aggregate severity score calculated during Step 05.</p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-red-500/10 border border-red-500/20">
                <div className="text-4xl font-black text-red-500">80+</div>
                <div>
                  <div className="font-bold text-white uppercase text-xs tracking-widest mb-1">High Risk Threshold</div>
                  <div className="text-sm text-red-400/80">Immediate SOC attention required. Likely active exfiltration.</div>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-orange-500/10 border border-orange-500/20">
                <div className="text-4xl font-black text-orange-500">50+</div>
                <div>
                  <div className="font-bold text-white uppercase text-xs tracking-widest mb-1">Medium Risk Threshold</div>
                  <div className="text-sm text-orange-400/80">Monitor user closely. Investigate anomalous session pattern.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowViz;
