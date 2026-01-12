
import React from 'react';

const data = [
  { subject: 'Accuracy', svm: 84.58, dt: 59.96, nb: 64.62 },
  { subject: 'Precision', svm: 98.51, dt: 98.18, nb: 99.67 },
  { subject: 'Recall', svm: 78.54, dt: 41.95, nb: 48.18 },
  { subject: 'F1-Score', svm: 87.40, dt: 58.78, nb: 64.96 },
  { subject: 'ROC-AUC', svm: 97.74, dt: 58.78, nb: 92.28 },
];

const ModelComparison: React.FC = () => {

  const renderRadarChart = () => {
    const width = 600;
    const height = 450;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 150;
    const levels = 5;
    
    const totalAxes = data.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

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
    const axisLines = data.map((d, i) => {
        const point = getCoordinates(100, i);
        return { x1: cx, y1: cy, x2: point.x, y2: point.y, label: d.subject };
    });

    // Datasets
    const models = [
        { key: 'svm', color: '#22c55e', label: 'SVM' },
        { key: 'dt', color: '#ef4444', label: 'Decision Tree' },
        { key: 'nb', color: '#a855f7', label: 'Naive Bayes' }
    ];

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm" preserveAspectRatio="xMidYMid meet">
         <defs>
            <filter id="glow-radar-mc">
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
                     {/* Label only on the top axis */}
                     {i === levels - 1 ? null : (
                        <text x={level.points[0].x} y={level.points[0].y - 5} textAnchor="middle" fontSize="9" fill="#4b5563" fontFamily="JetBrains Mono">{level.label}</text>
                     )}
                 </g>
             );
         })}

         {/* Axis Lines & Labels */}
         {axisLines.map((axis, i) => {
             const labelPos = getCoordinates(118, i);
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
         {models.map((model, i) => {
             const values = data.map(d => (d as any)[model.key]);
             const points = values.map((v, idx) => getCoordinates(v, idx));
             const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');
             
             return (
                 <g key={model.key} className="animate-polygon" style={{ animationDelay: `${i * 0.4}s` }}>
                     <polygon 
                        points={pointsStr} 
                        fill={model.color} 
                        fillOpacity="0.15" 
                        stroke={model.color} 
                        strokeWidth="2"
                        filter="url(#glow-radar-mc)"
                     />
                     {points.map((p, idx) => (
                         <circle key={idx} cx={p.x} cy={p.y} r="2.5" fill={model.color} />
                     ))}
                 </g>
             );
         })}

         {/* Legend */}
         <g transform={`translate(20, ${height - 80})`}>
             {models.map((m, i) => (
                 <g key={i} transform={`translate(0, ${i * 20})`}>
                     <rect width="12" height="12" fill={m.color} rx="2" />
                     <text x="20" y="10" fontSize="10" fill="#ccc" fontFamily="JetBrains Mono" fontWeight="bold">{m.label}</text>
                 </g>
             ))}
         </g>
      </svg>
    );
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 7: Evaluation Benchmarking</h1>
        <p className="text-gray-400 mt-4 text-lg">Head-to-head comparison of supervised learning architectures.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-[#050505] border border-[#1f2937] p-4 h-[500px] shadow-2xl relative flex flex-col">
           <div className="absolute top-4 right-4 text-[8px] font-mono text-green-500 animate-pulse">RADAR_METRIC_V2 // ACTIVE</div>
           <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white mb-2 text-center font-mono">Performance Topology</h4>
           <div className="flex-1 min-h-0">
             {renderRadarChart()}
           </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 bg-green-900/10 border border-green-500/30 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-6xl opacity-10 text-green-500 animate-pulse">🏆</div>
              <h3 className="text-2xl font-black text-white mb-4 font-mono uppercase">The Winner: SVM</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong className="text-green-500">Support Vector Machine</strong> outperformed both Decision Trees and Naive Bayes across the most critical metrics for intrusion detection (Recall and F1-Score).
              </p>
              <ul className="mt-4 space-y-2 text-xs text-gray-300 font-mono">
                <li className="flex justify-between">
                  <span>Highest F1-Score:</span>
                  <span className="text-white font-bold">87.40%</span>
                </li>
                <li className="flex justify-between">
                  <span>Highest Recall:</span>
                  <span className="text-white font-bold">78.54%</span>
                </li>
                <li className="flex justify-between">
                  <span>Best ROC-AUC:</span>
                  <span className="text-white font-bold">0.9774</span>
                </li>
              </ul>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-[#050505] border border-[#1f2937] hover:border-red-500/50 transition-colors">
                <h4 className="text-xs font-bold text-red-500 uppercase mb-2 font-mono">Critical Failure Analysis</h4>
                <p className="text-xs text-gray-500">
                  Decision Tree and Naive Bayes failed significantly in <strong>Recall</strong> (41% and 48% respectively). In a security context, this means they missed more than half of the incoming attacks, which is unacceptable for a primary defense line.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
