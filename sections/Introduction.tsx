
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-white tracking-tight border-none mb-0 pb-0 uppercase font-mono">Chapter 1<span className="text-green-500">.</span><br/>The Modern Threat Battlefield</h1>
        <div className="w-24 h-1 bg-green-500"></div>
      </header>

      <section className="space-y-6">
        <p className="text-xl text-gray-400 font-medium leading-relaxed font-mono">
          <span className="text-green-500">>></span> In a world governed by digital interactions, the network is the primary artery of civilization. But where there is data, there is a target.
        </p>
        
        <div className="p-8 bg-black border border-green-500/30 rounded-none space-y-4 relative overflow-hidden group hover:border-green-500 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
          <h2 className="text-2xl font-bold text-white mt-0 border-none font-mono relative z-10">1.1 The Sentinel Vision</h2>
          <p className="text-sm leading-relaxed text-gray-300 relative z-10">
            This project, authored by <strong>Jebbari, Oulad Dahman, Ougrine, and Ibnsalah</strong>, emerges from a critical necessity: the traditional rule-based firewalls are dead. Modern attacks don't just break the rules—they simulate the rules. Our objective was to build <strong>Sentinel</strong>, a machine-learning-driven Network Intrusion Detection System that moves beyond signature matching into behavioral intelligence.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🛡️', title: 'Resilience', desc: 'Built to withstand adversarial ML attacks and polymorphic malware.' },
          { icon: '⚡', title: 'Latency', desc: 'Optimized feature vectors for sub-millisecond classification in high-load clusters.' },
          { icon: '🧠', title: 'Intelligence', desc: 'Fusing supervised precision with unsupervised anomaly discovery.' }
        ].map(card => (
          <div key={card.title} className="p-6 bg-[#050505] border border-[#1f2937] transition-all duration-300 group hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:-translate-y-2 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform relative z-10">{card.icon}</div>
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs font-mono group-hover:text-green-400 transition-colors relative z-10">{card.title}</h4>
            <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors relative z-10">{card.desc}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">1.2 Research Core Questions</h2>
        <ul className="space-y-3">
          {[
            "Can a linear hyperplane effectively separate 'Worms' from 'Reconnaissance' in a 40-dimensional space?",
            "How does the UNSW-NB15 dataset challenge current state-of-the-art NIDS benchmarks?",
            "Can unsupervised density-based clustering reveal zero-day exploit variants before they are labeled?"
          ].map((q, i) => (
            <li key={i} className="flex items-start space-x-4 p-4 bg-[#0a0a0a] border-l-2 border-green-500 hover:bg-[#111] hover:pl-6 transition-all duration-300 cursor-default">
              <span className="text-green-500 font-mono font-bold">0{i+1}</span>
              <p className="text-sm text-gray-400">{q}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Introduction;
