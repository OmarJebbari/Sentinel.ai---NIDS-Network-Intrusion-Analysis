
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const ClusteringDBSCAN: React.FC = () => {
  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-bold text-white">Chapter 8: Density-Based Discovery (DBSCAN)</h2>
        <p className="text-[#8b949e] mt-2">Isolating outliers in the K-Distance graph.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
           <h4 className="text-lg font-bold text-white">K-Distance Analysis</h4>
           <p className="text-sm text-[#8b949e]">
             We used the K-Distance graph (K=5) to determine the optimal Epsilon value. The "elbow" point where distances spike indicates the threshold between cluster membership and noise.
           </p>
           <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
             <div className="flex justify-between text-xs mb-1">
               <span>Calculated EPS (95th percentile)</span>
               <span className="text-[#58a6ff]">1.2767</span>
             </div>
             <div className="flex justify-between text-xs">
               <span>Min Samples</span>
               <span className="text-[#3fb950]">5</span>
             </div>
           </div>
        </div>
        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col justify-center text-center">
           <div className="text-4xl font-black text-white mb-2">3.63%</div>
           <div className="text-xs text-[#8b949e] uppercase tracking-widest">Points Identified as Noise</div>
           <div className="text-[10px] text-red-400 mt-2">Potential Zero-Day Anomalies</div>
        </div>
      </section>

      <CodeBlock 
        title="DBSCAN Implementation"
        code={`
from sklearn.cluster import DBSCAN

# Using parameters derived from K-Distance Graph
dbscan = DBSCAN(eps=1.2767, min_samples=5)
dbscan_labels = dbscan.fit_predict(X_scaled)

# Result Statistics
n_clusters = 162
n_noise = 2,989 (3.63%)
        `}
      />
      
      <section className="p-4 bg-blue-900/10 border border-blue-500/30 rounded-lg">
        <h4 className="text-sm font-bold text-blue-400 mb-2">Security Implication</h4>
        <p className="text-xs text-gray-400">
          The 2,989 noise points identified by DBSCAN represent traffic that does not conform to any standard cluster (neither Normal nor known Attack profiles). These require manual forensic investigation as they are high-probability candidates for novel obfuscated attacks.
        </p>
      </section>
    </div>
  );
};

export default ClusteringDBSCAN;
