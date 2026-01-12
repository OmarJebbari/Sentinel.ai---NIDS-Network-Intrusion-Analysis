
import React from 'react';

export const Abstract: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <h1 className="text-4xl font-black text-white font-mono uppercase">Abstract</h1>
    <p className="text-lg leading-relaxed italic text-gray-400 border-l-2 border-green-500 pl-6">
      "Network Intrusion Detection Systems (NIDS) are critical for modern cybersecurity. This 133-page study presents a holistic evaluation of supervised and unsupervised machine learning models applied to the UNSW-NB15 dataset."
    </p>
    <p className="text-gray-400">
      This research project explores the efficacy of various machine learning algorithms in identifying network intrusions. The investigation addresses the limitations of traditional firewalls by employing <strong className="text-green-400">Support Vector Machines (SVM)</strong>, <strong className="text-green-400">Decision Trees</strong>, and <strong className="text-green-400">Naive Bayes</strong> for classification, alongside <strong className="text-green-400">K-Means</strong> and <strong className="text-green-400">DBSCAN</strong> for anomaly discovery. 
    </p>
    <p className="text-gray-400">
      Our methodology involves rigorous data preprocessing including imputation, normalization, and dimensionality reduction via PCA. The results indicate that while Decision Trees provide high explainability, the Linear SVM model offers superior robustness for modern network flow patterns, achieving a balanced F1-score of 0.874. Unsupervised clustering further reveals hidden structures in traffic that correspond to zero-day exploit variants.
    </p>
    <div className="p-6 bg-[#050505] border border-[#1f2937] rounded-none">
      <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-widest font-mono">Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {['Cybersecurity', 'NIDS', 'UNSW-NB15', 'Machine Learning', 'Anomaly Detection', 'SVM', 'Clustering', 'Python', 'Scikit-Learn'].map(k => (
          <span key={k} className="px-3 py-1 bg-[#0a0a0a] border border-green-900 rounded-none text-[10px] text-green-500 font-mono hover:bg-green-900/20 cursor-default transition-colors">
            {k}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Acknowledgments: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <h1 className="text-4xl font-black text-white font-mono uppercase">Acknowledgments</h1>
    <p className="text-gray-400">
      We would like to express our deepest gratitude to our supervisor, <strong className="text-green-400">Prof. Belcaid Anass</strong>, for his invaluable guidance, technical insights, and unwavering support throughout this research project. His expertise in the field of data mining and cybersecurity has been instrumental in the success of this work.
    </p>
    <p className="text-gray-400">
      Furthermore, we thank the <strong>University of Abdelmalek Essaâdi</strong> for providing the computational resources and academic environment required for processing the massive datasets used in this report. 
    </p>
    <div className="pt-10 border-t border-[#1f2937] flex justify-between text-xs text-gray-500 font-mono">
      <span>Tanger, Morocco</span>
      <span>January 2026</span>
    </div>
  </div>
);

export const ExecutiveSummary: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <h1 className="text-4xl font-black text-white font-mono uppercase">Executive Summary</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4 p-6 bg-[#050505] border border-red-900/30 hover:border-red-500 transition-colors">
        <h3 className="text-red-500 font-bold uppercase tracking-wider text-xs font-mono">Problem Statement</h3>
        <p className="text-sm text-gray-400">
          The evolution of polymorphic network attacks has rendered traditional signature-based detection systems obsolete. There is a pressing need for adaptive, behavioral systems that can detect novel threats in high-velocity traffic.
        </p>
      </div>
      <div className="space-y-4 p-6 bg-[#050505] border border-green-900/30 hover:border-green-500 transition-colors">
        <h3 className="text-green-500 font-bold uppercase tracking-wider text-xs font-mono">Proposed Solution</h3>
        <p className="text-sm text-gray-400">
          "Sentinel" is a tripartite architecture leveraging the UNSW-NB15 dataset. It combines supervised classification for known patterns with unsupervised density-based clustering to isolate anomalous traffic behavior.
        </p>
      </div>
    </div>
    
    <div className="p-8 bg-[#050505] border border-[#1f2937] rounded-none border-l-4 border-l-green-500">
      <h3 className="text-white font-bold mb-4 font-mono uppercase">Core Performance Metrics</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Max Accuracy', val: '84.58%', sub: 'SVM' },
          { label: 'Detection Rate', val: '98.2%', sub: 'Generic' },
          { label: 'AUC Score', val: '0.977', sub: 'Linear SVC' },
          { label: 'Noise Rejection', val: '3.63%', sub: 'DBSCAN' },
        ].map(m => (
          <div key={m.label} className="text-center group">
            <div className="text-3xl font-black text-white font-mono group-hover:text-green-400 transition-colors">{m.val}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter font-mono mt-1">{m.label}</div>
            <div className="text-[9px] text-green-600 font-mono uppercase">{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
