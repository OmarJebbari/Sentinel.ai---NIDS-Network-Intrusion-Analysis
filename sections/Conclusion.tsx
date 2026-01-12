
import React from 'react';
import { AUTHORS } from '../constants';

const Conclusion: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <section className="text-center space-y-8 py-10">
        <h1 className="text-6xl font-black text-white tracking-tighter border-none mb-0 font-mono uppercase">The Digital Frontier</h1>
        <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed font-mono">
          The Sentinel project concludes that while the volume of attacks grows, our ability to intelligently perceive them grows faster.
        </p>
        <div className="w-48 h-1 bg-green-500 mx-auto"></div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#1f2937] pt-16">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-none font-mono">Key Findings</h2>
          <div className="space-y-6">
            <div className="flex space-x-6 group">
              <div className="w-12 h-12 bg-[#050505] border border-[#1f2937] flex items-center justify-center shrink-0 group-hover:border-green-500 transition-colors">
                <span className="text-green-500 font-black font-mono">01</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong className="text-white">Classification Robustness:</strong> Our SVM architecture demonstrated that linear kernels are surprisingly effective for high-dimensional network flow data.
              </p>
            </div>
            <div className="flex space-x-6 group">
              <div className="w-12 h-12 bg-[#050505] border border-[#1f2937] flex items-center justify-center shrink-0 group-hover:border-purple-500 transition-colors">
                <span className="text-purple-500 font-black font-mono">02</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong className="text-white">Unsupervised Potential:</strong> DBSCAN clustering revealed that 3.6% of supposedly 'Normal' traffic in older benchmarks actually contains signatures of modern exploit variations.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-none font-mono">Future Roadmap</h2>
           <div className="p-8 bg-[#050505] border border-[#1f2937] space-y-4 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500"></div>
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-mono font-bold uppercase text-gray-500">Phase 2 Development</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Integration of <strong>Recurrent Neural Networks (RNN)</strong> to capture long-term temporal dependencies in flow duration. Real-time implementation of Sentinel on hardware-accelerated NICs for zero-latency threat mitigation.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-green-500 hover:text-white transition-colors border border-green-500/30 px-4 py-2 hover:bg-green-500/10">
                 Request Full Technical Specification &rarr;
              </button>
           </div>
        </div>
      </div>

      <section className="py-20 border-t border-[#1f2937] text-center">
        <h3 className="text-xs uppercase tracking-[0.5em] font-black text-gray-600 mb-12 font-mono">Scientific Project Signatories</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {AUTHORS.map((name) => (
            <div key={name} className="space-y-4 group">
              <div className="w-20 h-20 bg-black border border-[#333] rounded-full mx-auto flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:border-green-500 transition-all duration-500">
                <svg className="w-10 h-10 text-gray-600 group-hover:text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-black text-white font-mono">{name}</div>
                <div className="text-[9px] font-mono text-green-700">SEC-ID: {name.split(' ')[0].toUpperCase()}-2026</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Conclusion;
