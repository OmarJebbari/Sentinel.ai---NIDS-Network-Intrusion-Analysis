
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const ClassificationNB: React.FC = () => {
  
  // Custom SVG Renderer for Gaussian Distribution (Feature: sttl)
  const renderGaussianPlot = () => {
    const width = 600;
    const height = 300;
    const padding = 40;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    // Helper to map plot coordinates
    // X domain (Z-Score): -4 to 4
    // Y domain (Probability): 0 to 1.1
    const mapX = (x: number) => padding + ((x + 4) / 8) * plotWidth;
    const mapY = (y: number) => height - padding - (y / 1.1) * plotHeight;

    const generateGaussianPath = (mu: number, sigma: number) => {
      let path = `M ${mapX(-4)} ${mapY(0)}`;
      // Sample 100 points
      for (let i = 0; i <= 100; i++) {
        const x = -4 + (i / 100) * 8;
        const y = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
        path += ` L ${mapX(x)} ${mapY(y)}`;
      }
      path += ` L ${mapX(4)} ${mapY(0)} Z`;
      return path;
    };

    // Parameters estimated from sttl feature distribution
    // Normal traffic (green): centered around -0.8 (low TTL variance)
    // Attack traffic (red): centered around 1.2 (unusual TTLs)
    const normalPath = generateGaussianPath(-0.8, 0.8); 
    const attackPath = generateGaussianPath(1.2, 1.0);  

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#0a0a0a] rounded-sm" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="gradNormal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradAttack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
            </linearGradient>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
            </pattern>
        </defs>
        
        {/* Background Grid */}
        <rect x={padding} y={padding} width={plotWidth} height={plotHeight} fill="url(#grid)" />

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#4b5563" strokeWidth="1" />
        
        {/* X-Axis Ticks */}
        {[-4, -2, 0, 2, 4].map(tick => (
            <g key={tick} transform={`translate(${mapX(tick)}, ${height - padding + 15})`}>
                <text textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="JetBrains Mono">{tick}</text>
                <line x1="0" y1="-15" x2="0" y2="-10" stroke="#4b5563" />
            </g>
        ))}

        {/* Curves */}
        <path d={normalPath} fill="url(#gradNormal)" stroke="#22c55e" strokeWidth="2" />
        <path d={attackPath} fill="url(#gradAttack)" stroke="#ef4444" strokeWidth="2" />

        {/* Labels/Legend */}
        <g transform={`translate(${width - 140}, ${padding + 10})`}>
             <rect width="110" height="50" fill="rgba(0,0,0,0.8)" stroke="#333" rx="4" />
             <circle cx="20" cy="15" r="4" fill="#22c55e" />
             <text x="35" y="19" fontSize="10" fill="#ccc" fontFamily="JetBrains Mono" fontWeight="bold">Normal</text>
             <circle cx="20" cy="35" r="4" fill="#ef4444" />
             <text x="35" y="39" fontSize="10" fill="#ccc" fontFamily="JetBrains Mono" fontWeight="bold">Attack</text>
        </g>
        
        {/* Intersection / Decision Boundary Annotation */}
        <line x1={mapX(0.2)} y1={padding} x2={mapX(0.2)} y2={height-padding} stroke="#fff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <text x={mapX(0.2)} y={padding - 10} textAnchor="middle" fontSize="10" fill="#fff" fontFamily="JetBrains Mono">Decision Boundary</text>

      </svg>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-white font-mono uppercase">Chapter 5.3: Gaussian Naive Bayes</h2>
        <p className="text-gray-400 mt-2">Probabilistic classification assuming feature independence.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Accuracy', val: '64.62%', color: 'border-yellow-500' },
          { label: 'Precision', val: '99.67%', color: 'border-green-500' },
          { label: 'Recall', val: '48.18%', color: 'border-red-500' },
          { label: 'ROC-AUC', val: '0.9228', color: 'border-blue-500' },
        ].map((m, i) => (
          <div key={i} className={`bg-[#050505] border border-[#1f2937] border-l-4 ${m.color} p-4 shadow-lg`}>
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 font-mono tracking-widest">{m.label}</div>
            <div className="text-2xl font-bold text-white font-mono">{m.val}</div>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-green-400 font-mono">Feature Separation Analysis</h3>
           <p className="text-sm text-gray-400">
             Our analysis shows that Naive Bayes achieves extremely high precision (99.67%) but poor recall. The visualization below mimics the <strong>Feature Distribution Analysis</strong> (Cell 23 in notebook), showing how the model separates Normal (Green) vs Attack (Red) traffic distributions for a discriminative feature like <code>sttl</code>.
           </p>
           <div className="bg-[#050505] border border-[#1f2937] p-4">
             <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-4 text-center font-mono">Gaussian Probability Distribution (Feature: sttl)</h4>
             <div style={{ width: '100%', height: '300px' }}>
                {renderGaussianPlot()}
             </div>
             <div className="text-[9px] text-center text-gray-500 mt-2 font-mono">X-Axis: Standardized Feature Value (Z-Score) | Y-Axis: Probability Density</div>
           </div>
        </div>
        
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-white font-mono">5.3.1 Model Pipeline</h3>
           <p className="text-sm text-gray-400">
             The Naive Bayes pipeline incorporates zero-imputation to handle potential data gaps before scaling.
           </p>
           <CodeBlock 
             title="Naive Bayes Pipeline"
             code={`
nb_pipeline = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="constant", fill_value=0)),
    ("scaler", StandardScaler()),
    ("nb", GaussianNB())
])
             `}
           />

           <h3 className="text-xl font-bold text-white font-mono mt-8">5.3.2 Hyperparameter Tuning</h3>
           <p className="text-sm text-gray-400">
             We tuned the <code>var_smoothing</code> parameter to handle numerical stability and zero probabilities. This acts as a smoothing prior for the Gaussian curve calculation.
           </p>
           <CodeBlock 
             title="GridSearchCV for Naive Bayes"
             code={`
param_grid_nb = {
  'var_smoothing': [1e-9, 1e-8, 1e-6, 1e-3, 1e-1]
}

# Tuning Result
Best var_smoothing: 1e-3
Impact: Improved F1-Score from 0.62 to 0.65
             `}
           />
           <div className="p-4 bg-yellow-900/10 border border-yellow-500/30 rounded">
              <h4 className="text-xs font-bold text-yellow-500 mb-1">Observation</h4>
              <p className="text-xs text-gray-400">The high precision but low recall suggests the Gaussian assumption holds for "clear" attacks but fails to capture the "long tail" of subtle anomalies.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ClassificationNB;
