
import React from 'react';

const ConfusionMatrixSVM = () => (
  <div className="grid grid-cols-2 gap-1 text-center font-mono text-sm bg-gray-900 border border-gray-800 p-1">
    {/* Header */}
    <div className="col-span-2 text-[10px] text-gray-500 uppercase py-1">Predicted Label</div>
    <div className="bg-[#2c7bb6] text-white p-4 flex flex-col justify-center items-center h-24 hover:brightness-110 transition-all cursor-default">
      <span className="text-2xl font-bold">54,583</span>
      <span className="text-[10px] opacity-70">TN (Normal)</span>
    </div>
    <div className="bg-[#d1e5f0] text-gray-800 p-4 flex flex-col justify-center items-center h-24 hover:brightness-110 transition-all cursor-default">
      <span className="text-2xl font-bold">1,417</span>
      <span className="text-[10px] opacity-70">FP</span>
    </div>
    <div className="bg-[#abd9e9] text-gray-800 p-4 flex flex-col justify-center items-center h-24 hover:brightness-110 transition-all cursor-default">
      <span className="text-2xl font-bold">25,614</span>
      <span className="text-[10px] opacity-70">FN</span>
    </div>
    <div className="bg-[#0c2c84] text-white p-4 flex flex-col justify-center items-center h-24 hover:brightness-110 transition-all cursor-default">
      <span className="text-2xl font-bold">93,727</span>
      <span className="text-[10px] opacity-70">TP (Attack)</span>
    </div>
  </div>
);

const EvaluationResults: React.FC = () => {
  
  // Custom SVG Radar Chart Renderer
  const renderRadarChart = () => {
    const width = 600;
    const height = 450;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 160;
    const levels = 5;
    
    // Axes configuration
    const axes = ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC'];
    const totalAxes = axes.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    // Data corresponding to the metrics
    const datasets = [
      { label: 'SVM', values: [84.58, 98.51, 78.54, 87.40, 97.74], color: '#3b82f6', fill: '#3b82f6' }, // Blue
      { label: 'Decision Tree', values: [62.81, 97.85, 46.38, 62.94, 58.88], color: '#ef4444', fill: '#ef4444' }, // Red
      { label: 'Naive Bayes', values: [64.62, 99.67, 48.18, 64.96, 92.23], color: '#22c55e', fill: '#22c55e' } // Green
    ];

    // Helper to get coordinates
    const getCoordinates = (value: number, index: number, maxVal: number = 100) => {
      const angle = index * angleSlice - Math.PI / 2; // Start at top
      const r = (value / maxVal) * radius;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    };

    // Grid Levels
    const gridLevels = [];
    for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i;
        const levelPoints = [];
        for (let j = 0; j < totalAxes; j++) {
            const angle = j * angleSlice - Math.PI / 2;
            levelPoints.push({
                x: cx + levelRadius * Math.cos(angle),
                y: cy + levelRadius * Math.sin(angle)
            });
        }
        gridLevels.push({ points: levelPoints, label: `${i * 20}%` });
    }

    // Axis Lines
    const axisLines = axes.map((label, i) => {
        const point = getCoordinates(100, i);
        return { x1: cx, y1: cy, x2: point.x, y2: point.y, label };
    });

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm" preserveAspectRatio="xMidYMid meet">
         <defs>
            <filter id="glow-radar">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
         </defs>

         {/* Background Grid (Concentric Polygons) */}
         {gridLevels.map((level, i) => {
             const pointsStr = level.points.map(p => `${p.x},${p.y}`).join(' ');
             return (
                 <g key={i}>
                     <polygon points={pointsStr} fill="none" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 4" />
                     {/* Label for the level (only on the first axis) */}
                     <text x={level.points[0].x} y={level.points[0].y - 5} textAnchor="middle" fontSize="9" fill="#4b5563" fontFamily="JetBrains Mono">{level.label}</text>
                 </g>
             );
         })}

         {/* Axis Lines & Labels */}
         {axisLines.map((axis, i) => {
             const labelPos = getCoordinates(115, i);
             return (
                 <g key={i}>
                     <line x1={axis.x1} y1={axis.y1} x2={axis.x2} y2={axis.y2} stroke="#374151" strokeWidth="1" />
                     <text 
                        x={labelPos.x} 
                        y={labelPos.y} 
                        textAnchor="middle" 
                        alignmentBaseline="middle"
                        fontSize="11" 
                        fill="#9ca3af" 
                        fontWeight="bold" 
                        fontFamily="JetBrains Mono"
                     >
                        {axis.label}
                     </text>
                 </g>
             );
         })}

         {/* Data Areas */}
         {datasets.map((ds, i) => {
             const points = ds.values.map((v, idx) => getCoordinates(v, idx));
             const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');
             return (
                 <g key={i} className="animate-polygon" style={{ animationDelay: `${i * 0.3}s` }}>
                     <polygon 
                        points={pointsStr} 
                        fill={ds.fill} 
                        fillOpacity="0.15" 
                        stroke={ds.color} 
                        strokeWidth="2"
                        filter="url(#glow-radar)"
                     />
                     {/* Data Points */}
                     {points.map((p, idx) => (
                         <circle key={idx} cx={p.x} cy={p.y} r="3" fill={ds.color} />
                     ))}
                 </g>
             );
         })}

         {/* Legend */}
         <g transform={`translate(20, ${height - 60})`}>
             {datasets.map((ds, i) => (
                 <g key={i} transform={`translate(0, ${i * 20})`}>
                     <rect width="12" height="12" fill={ds.color} rx="2" />
                     <text x="20" y="10" fontSize="10" fill="#ccc" fontFamily="JetBrains Mono">{ds.label}</text>
                 </g>
             ))}
         </g>
         
         {/* Title Annotation */}
         <text x={width - 20} y={height - 20} textAnchor="end" fontSize="10" fill="#333" fontFamily="JetBrains Mono">
            NORMALIZED METRIC COMPARISON
         </text>
      </svg>
    );
  };

  return (
    <div className="space-y-16 pb-20">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 7: Evaluation Results</h1>
        <p className="text-gray-400 mt-4 text-lg">Statistical confirmation of model performance.</p>
      </header>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">7.1 Confusion Matrix Analysis</h2>
        <p className="text-sm text-gray-400">
           The confusion matrix visualizes the performance of the best model (SVM). Note the extremely high True Positive count (93,727), indicating the model captures the vast majority of attacks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h4 className="text-xs font-bold text-gray-500 uppercase text-center">SVM Confusion Matrix</h4>
               <ConfusionMatrixSVM />
            </div>
            <div className="flex flex-col justify-center space-y-4">
                <div className="p-4 border border-blue-900/50 bg-blue-900/10 hover:border-blue-500/50 transition-colors">
                   <h5 className="text-blue-400 font-bold text-xs uppercase mb-1">Precision: 98.5%</h5>
                   <p className="text-xs text-gray-400">Only 1,417 False Positives out of ~56k Normal samples.</p>
                </div>
                <div className="p-4 border border-green-900/50 bg-green-900/10 hover:border-green-500/50 transition-colors">
                   <h5 className="text-green-400 font-bold text-xs uppercase mb-1">Recall: 78.5%</h5>
                   <p className="text-xs text-gray-400">Correctly identified 93,727 attacks.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">7.2 Model Comparison (Radar)</h2>
        <div className="bg-[#050505] border border-[#1f2937] p-4 h-[500px] relative flex flex-col items-center justify-center">
            <div className="absolute top-4 left-0 w-full text-center">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Performance Topology</h4>
            </div>
            {renderRadarChart()}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">7.3 Final Metrics Table</h2>
        <div className="bg-[#050505] border border-[#1f2937] overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0a0a0a] text-gray-500 font-black uppercase tracking-tighter border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4">Algorithm</th>
                <th className="px-6 py-4">Accuracy</th>
                <th className="px-6 py-4">F1 Score</th>
                <th className="px-6 py-4">Precision</th>
                <th className="px-6 py-4">Recall</th>
                <th className="px-6 py-4">ROC-AUC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937] text-gray-300">
              <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                <td className="px-6 py-4 font-bold text-blue-400 uppercase">SVM (#1)</td>
                <td className="px-6 py-4 text-blue-400">84.58%</td>
                <td className="px-6 py-4 text-blue-400">87.40%</td>
                <td className="px-6 py-4 text-blue-400">98.51%</td>
                <td className="px-6 py-4 text-blue-400">78.54%</td>
                <td className="px-6 py-4 text-blue-400">0.9774</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold uppercase">Decision Tree</td>
                <td className="px-6 py-4">62.81%</td>
                <td className="px-6 py-4">62.94%</td>
                <td className="px-6 py-4">97.85%</td>
                <td className="px-6 py-4 text-red-400">46.38%</td>
                <td className="px-6 py-4">0.5888</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold uppercase">Naive Bayes</td>
                <td className="px-6 py-4">64.62%</td>
                <td className="px-6 py-4">64.96%</td>
                <td className="px-6 py-4 text-green-400">99.67%</td>
                <td className="px-6 py-4 text-red-400">48.18%</td>
                <td className="px-6 py-4">0.9223</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EvaluationResults;
