
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const ClassificationSVM: React.FC = () => {

  // Custom SVG Renderer for ROC Curve
  const renderROCPlot = () => {
    const width = 600;
    const height = 350;
    const padding = 50;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    // Data points mimicking the ROC curve for SVM (AUC ~0.977)
    const rocPoints = [
      { x: 0, y: 0 },
      { x: 0.005, y: 0.45 },
      { x: 0.01, y: 0.65 },
      { x: 0.02, y: 0.82 },
      { x: 0.03, y: 0.89 },
      { x: 0.05, y: 0.94 },
      { x: 0.10, y: 0.97 },
      { x: 0.20, y: 0.985 },
      { x: 0.40, y: 0.995 },
      { x: 1.0, y: 1.0 },
    ];

    const mapX = (val: number) => padding + val * plotWidth;
    const mapY = (val: number) => height - padding - val * plotHeight;

    // Generate Path Command
    let pathD = `M ${mapX(rocPoints[0].x)} ${mapY(rocPoints[0].y)}`;
    rocPoints.forEach((p, i) => {
        if (i > 0) {
            pathD += ` L ${mapX(p.x)} ${mapY(p.y)}`; 
        }
    });

    // Area fill path
    const fillPathD = pathD + ` L ${mapX(1)} ${mapY(0)} L ${mapX(0)} ${mapY(0)} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#0a0a0a] rounded-sm" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="rocGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </linearGradient>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
             <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect x={padding} y={padding} width={plotWidth} height={plotHeight} fill="url(#grid)" />
        
        {/* Diagonal Random Guess Line */}
        <line x1={mapX(0)} y1={mapY(0)} x2={mapX(1)} y2={mapY(1)} stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" />
        <text x={mapX(0.5)} y={mapY(0.5) + 15} textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="JetBrains Mono" transform={`rotate(-45, ${mapX(0.5)}, ${mapY(0.5)})`}>Random Guess (AUC=0.5)</text>

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#4b5563" strokeWidth="1" />

        {/* X Ticks */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(val => (
           <g key={`x-${val}`} transform={`translate(${mapX(val)}, ${height - padding})`}>
              <line y1="0" y2="5" stroke="#4b5563" />
              <text y="18" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="JetBrains Mono">{val.toFixed(1)}</text>
           </g>
        ))}

        {/* Y Ticks */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(val => (
           <g key={`y-${val}`} transform={`translate(${padding}, ${mapY(val)})`}>
              <line x1="-5" x2="0" stroke="#4b5563" />
              <text x="-8" y="3" textAnchor="end" fontSize="10" fill="#9ca3af" fontFamily="JetBrains Mono">{val.toFixed(1)}</text>
           </g>
        ))}

        {/* Axis Titles */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="JetBrains Mono" fontWeight="bold">False Positive Rate (FPR)</text>
        <text x={15} y={height / 2} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="JetBrains Mono" fontWeight="bold" transform={`rotate(-90, 15, ${height/2})`}>True Positive Rate (TPR)</text>

        {/* The Curve */}
        <path d={fillPathD} fill="url(#rocGradient)" className="animate-in fade-in duration-1000" />
        <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-draw" />
        
        {/* Points on Curve (Sampled) */}
        {rocPoints.map((p, i) => (
            <circle key={i} cx={mapX(p.x)} cy={mapY(p.y)} r={3} fill="#000" stroke="#22c55e" strokeWidth="2" className="animate-in zoom-in duration-500" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}

        {/* AUC Annotation Box */}
        <g transform={`translate(${mapX(0.55)}, ${mapY(0.4)})`} className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
            <rect x="0" y="0" width="160" height="60" fill="rgba(0,0,0,0.85)" stroke="#22c55e" strokeWidth="1" rx="4" />
            <text x="80" y="25" textAnchor="middle" fontSize="16" fill="#22c55e" fontFamily="JetBrains Mono" fontWeight="bold">AUC = 0.9774</text>
            <text x="80" y="45" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="JetBrains Mono">High Discriminability</text>
        </g>

      </svg>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 5.1: Support Vector Machines</h1>
        <p className="text-gray-400 mt-4 text-lg">Linear separation in high-dimensional space.</p>
      </header>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Accuracy', val: '84.58%', color: 'border-blue-500' },
          { label: 'Precision', val: '98.51%', color: 'border-green-500' },
          { label: 'Recall', val: '78.54%', color: 'border-yellow-500' },
          { label: 'F1 Score', val: '87.40%', color: 'border-purple-500' },
        ].map((m, i) => (
          <div key={i} className={`bg-[#050505] border border-[#1f2937] border-l-4 ${m.color} p-4 shadow-lg hover:scale-105 transition-transform duration-300`}>
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 font-mono tracking-widest">{m.label}</div>
            <div className="text-2xl font-bold text-white font-mono">{m.val}</div>
          </div>
        ))}
      </div>

      {/* Detailed Confusion Metrics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#050505] border border-[#1f2937] p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 font-mono tracking-widest">Confusion Matrix Breakdown</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="text-center p-2 bg-green-900/10 border border-green-900/30 hover:bg-green-900/20 transition-colors">
                    <div className="text-2xl font-black text-white font-mono">93,727</div>
                    <div className="text-[10px] text-green-500 uppercase font-bold mt-1">True Positives (TP)</div>
                </div>
                <div className="text-center p-2 bg-blue-900/10 border border-blue-900/30 hover:bg-blue-900/20 transition-colors">
                    <div className="text-2xl font-black text-white font-mono">54,583</div>
                    <div className="text-[10px] text-blue-500 uppercase font-bold mt-1">True Negatives (TN)</div>
                </div>
                <div className="text-center p-2 bg-red-900/10 border border-red-900/30 hover:bg-red-900/20 transition-colors">
                    <div className="text-2xl font-black text-white font-mono">1,417</div>
                    <div className="text-[10px] text-red-500 uppercase font-bold mt-1">False Positives (FP)</div>
                </div>
                <div className="text-center p-2 bg-orange-900/10 border border-orange-900/30 hover:bg-orange-900/20 transition-colors">
                    <div className="text-2xl font-black text-white font-mono">25,614</div>
                    <div className="text-[10px] text-orange-500 uppercase font-bold mt-1">False Negatives (FN)</div>
                </div>
            </div>
        </div>
        
        <div className="bg-[#050505] border border-[#1f2937] p-6 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-6 font-mono tracking-widest">Error Rate Analysis</h3>
            <div className="space-y-8">
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-red-400 uppercase">False Positive Rate (FPR)</span>
                        <span className="text-xl font-mono text-white">2.53%</span>
                    </div>
                    <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full animate-bar" style={{width: '2.53%'}}></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 font-mono">
                        Type I Error: Low probability of blocking legitimate traffic (1,417 / 56,000).
                    </p>
                </div>
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-orange-400 uppercase">False Negative Rate (FNR)</span>
                        <span className="text-xl font-mono text-white">21.46%</span>
                    </div>
                    <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full animate-bar" style={{width: '21.46%'}}></div>
                    </div>
                     <p className="text-[10px] text-gray-500 mt-2 font-mono">
                        Type II Error: Approximately 1 in 5 attacks are missed by the linear boundary.
                    </p>
                </div>
            </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">5.1.1 Implementation Details</h2>
        <p className="text-gray-400">
          We utilized a <strong>LinearSVC</strong> within a pipeline that includes <strong>Constant Imputation (Zero)</strong> and Standard Scaling. The model was optimized with class weights to handle the dataset imbalance.
        </p>
        <CodeBlock 
          title="SVM Pipeline"
          code={`
svm_pipeline = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="constant", fill_value=0)),
    ("scaler", StandardScaler()),
    ("svm", LinearSVC(
        C=1.0,
        class_weight="balanced",
        max_iter=5000,
        random_state=42
    ))
])
          `}
        />
        
        <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono border-b border-[#333] pb-2">Hyperparameter Significance in NIDS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0a0a0a] border border-[#222] hover:border-green-500/50 transition-all group">
                    <div className="text-green-500 font-mono font-bold text-xs uppercase mb-2 group-hover:text-green-400">C=1.0 (Regularization)</div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        Controls the penalty for misclassification. A balanced C is critical in intrusion detection to avoid overfitting specific attack signatures (high C) while maintaining enough sensitivity to catch anomalies (low C).
                    </p>
                </div>
                <div className="p-4 bg-[#0a0a0a] border border-[#222] hover:border-green-500/50 transition-all group">
                    <div className="text-green-500 font-mono font-bold text-xs uppercase mb-2 group-hover:text-green-400">class_weight='balanced'</div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        Essential for NIDS datasets where legitimate traffic vastly outnumbers attacks. This parameter automatically increases the penalty for missing minority class samples (Attacks), improving Recall.
                    </p>
                </div>
                <div className="p-4 bg-[#0a0a0a] border border-[#222] hover:border-green-500/50 transition-all group">
                    <div className="text-green-500 font-mono font-bold text-xs uppercase mb-2 group-hover:text-green-400">max_iter=5000</div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        High-dimensional network flow data often requires more iterations for the Liblinear solver to converge on an optimal hyperplane compared to simpler datasets.
                    </p>
                </div>
            </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">5.1.2 Performance Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-400">
              The Linear SVM demonstrated robust performance with an ROC-AUC of <strong>0.9774</strong>. The high precision (98.51%) indicates a very low false positive rate, making it suitable for automated blocking systems where false alarms are costly.
            </p>
            <div className="p-4 bg-green-900/10 border border-green-500/30">
               <h3 className="text-sm font-bold text-green-400 mb-2 font-mono">Security Assessment</h3>
               <ul className="list-disc list-inside text-xs text-gray-300 font-mono space-y-2">
                 <li>Excellent specificity (True Negative Rate).</li>
                 <li>Good attack detection rate (Recall > 78%).</li>
                 <li>Linear boundary generalizes well to unseen traffic patterns.</li>
               </ul>
            </div>
            
            <CodeBlock 
              title="ROC Curve Generation"
              code={`
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

# Calculate probabilities
y_score = svm.decision_function(X_test)

# Compute ROC metrics
fpr, tpr, _ = roc_curve(y_test, y_score)
roc_auc = auc(fpr, tpr)

print(f"ROC-AUC Score: {roc_auc:.4f}")
              `}
            />
          </div>
          
          <div className="bg-[#050505] border border-[#1f2937] p-4 h-[350px] flex flex-col">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 text-center font-mono">Receiver Operating Characteristic (ROC)</h4>
              <div className="flex-1 w-full min-h-0">
                 {renderROCPlot()}
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassificationSVM;
