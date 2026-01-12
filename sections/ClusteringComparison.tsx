
import React from 'react';

const metrics = [
  { id: 'KM', name: 'K-Means', silhouette: 0.2787, db_index: 1.3421, ch_score: 4250.5 },
  { id: 'DB', name: 'DBSCAN', silhouette: 0.1542, db_index: 2.8910, ch_score: 1120.3 },
  { id: 'HC', name: 'Hierarchical', silhouette: 0.2654, db_index: 1.4150, ch_score: 3980.1 },
];

const ClusteringComparison: React.FC = () => {

  const renderMetricChart = (
    title: string, 
    key: 'silhouette' | 'db_index' | 'ch_score', 
    color: string, 
    mode: 'max' | 'min'
  ) => {
    // Find limits
    const values = metrics.map(m => m[key]);
    const maxValue = Math.max(...values);
    const bestValue = mode === 'max' ? Math.max(...values) : Math.min(...values);
    
    // Dimensions
    const width = 300;
    const height = 220;
    const margin = { top: 50, bottom: 30, left: 20, right: 20 };
    const chartHeight = height - margin.top - margin.bottom;
    const barWidth = 40;
    const gap = 45; // Space between bars
    const startX = (width - (3 * barWidth + 2 * gap)) / 2;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm border border-[#1f2937]" preserveAspectRatio="xMidYMid meet">
        <defs>
            <pattern id={`grid-${key}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <linearGradient id={`grad-${key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
            </linearGradient>
            <filter id={`glow-${key}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* Background Grid */}
        <rect x="0" y="0" width={width} height={height} fill={`url(#grid-${key})`} />

        {/* Header Area */}
        <rect x="0" y="0" width={width} height="40" fill="#0a0a0a" />
        <line x1="0" y1="40" x2={width} y2="40" stroke="#1f2937" strokeWidth="1" />
        
        <text x={width/2} y="22" textAnchor="middle" fill={color} fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" letterSpacing="1" filter={`url(#glow-${key})`}>
            {title}
        </text>
        <text x={width/2} y="34" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="0.5">
            {mode === 'max' ? 'HIGHER IS BETTER' : 'LOWER IS BETTER'}
        </text>

        {/* Bars */}
        {metrics.map((m, i) => {
            const val = m[key];
            const isBest = val === bestValue;
            
            // Normalize height (relative to max value in set)
            // Ensure minimum visual height of 2px
            const h = Math.max(2, (val / maxValue) * chartHeight);
            const x = startX + i * (barWidth + gap);
            const y = height - margin.bottom - h;
            
            const barFill = isBest ? `url(#grad-${key})` : '#161b22';
            const barStroke = isBest ? color : '#374151';
            const textFill = isBest ? '#ffffff' : '#4b5563';
            const weight = isBest ? 'bold' : 'normal';

            return (
                <g key={m.id}>
                    {/* Bar */}
                    <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={h} 
                        fill={barFill} 
                        stroke={barStroke} 
                        strokeWidth={isBest ? 1.5 : 1} 
                        rx="2"
                    />
                    
                    {/* Value Label */}
                    <text x={x + barWidth/2} y={y - 8} textAnchor="middle" fill={textFill} fontSize="10" fontFamily="JetBrains Mono" fontWeight={weight}>
                        {val}
                    </text>
                    
                    {/* X Axis Label */}
                    <text x={x + barWidth/2} y={height - 12} textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                        {m.id}
                    </text>
                    
                    {/* Indicator for Best */}
                    {isBest && (
                        <circle cx={x + barWidth/2} cy={height - 5} r="1.5" fill={color} />
                    )}
                </g>
            )
        })}

        {/* Baseline */}
        <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#374151" strokeWidth="1" />
      </svg>
    )
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 6.3: Clustering Comparative Analysis</h1>
        <p className="text-gray-400 mt-4 text-lg">Evaluation of unsupervised learning algorithms.</p>
      </header>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">6.3.1 Performance Metrics Evaluation</h2>
        <p className="text-sm text-gray-400">
          We evaluated three algorithms—K-Means, DBSCAN, and Agglomerative Hierarchical Clustering—using three internal validation indices. 
          <strong>K-Means</strong> achieved the best structural separation (Silhouette Score: 0.279) and compactness (Calinski-Harabasz: 4250.5).
        </p>

        <div className="bg-[#050505] border border-[#1f2937] overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0a0a0a] text-gray-500 font-black uppercase tracking-tighter border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4">Algorithm</th>
                <th className="px-6 py-4 text-green-500">Silhouette Score (↑)</th>
                <th className="px-6 py-4 text-blue-500">Davies-Bouldin (↓)</th>
                <th className="px-6 py-4 text-purple-500">Calinski-Harabasz (↑)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937] text-gray-300">
              <tr className="bg-green-900/10">
                <td className="px-6 py-4 font-bold text-white uppercase border-l-2 border-green-500">K-Means (K=3)</td>
                <td className="px-6 py-4 font-bold text-green-400">0.2787</td>
                <td className="px-6 py-4 text-blue-300">1.3421</td>
                <td className="px-6 py-4 text-purple-300">4250.5</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold text-gray-400 uppercase">Hierarchical</td>
                <td className="px-6 py-4">0.2654</td>
                <td className="px-6 py-4">1.4150</td>
                <td className="px-6 py-4">3980.1</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold text-gray-400 uppercase">DBSCAN</td>
                <td className="px-6 py-4 text-gray-500">0.1542</td>
                <td className="px-6 py-4 text-gray-500">2.8910</td>
                <td className="px-6 py-4 text-gray-500">1120.3</td>
              </tr>
            </tbody>
          </table>
          <div className="p-2 bg-[#0a0a0a] border-t border-[#1f2937] flex justify-between px-6">
             <span className="text-[9px] text-gray-600 uppercase">↑ Higher is Better</span>
             <span className="text-[9px] text-gray-600 uppercase">↓ Lower is Better</span>
          </div>
        </div>
      </section>

      <section className="space-y-8">
         <h3 className="text-xl font-bold text-white font-mono">6.3.2 Visual Comparison</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silhouette Chart */}
            <div className="h-[250px]">
                {renderMetricChart('SILHOUETTE SCORE', 'silhouette', '#22c55e', 'max')}
            </div>

            {/* Davies-Bouldin Chart */}
            <div className="h-[250px]">
                {renderMetricChart('DAVIES-BOULDIN', 'db_index', '#3b82f6', 'min')}
            </div>

            {/* Calinski-Harabasz Chart */}
            <div className="h-[250px]">
                {renderMetricChart('CALINSKI-HARABASZ', 'ch_score', '#a855f7', 'max')}
            </div>
         </div>
      </section>

      <section className="p-6 bg-[#0a0a0a] border-l-4 border-green-500">
         <h3 className="text-lg font-bold text-white font-mono mb-2">Technical Conclusion</h3>
         <p className="text-sm text-gray-400 leading-relaxed">
            While <strong>DBSCAN</strong> is superior for anomaly detection (identifying the 3.63% noise points), it scores poorly on standard clustering metrics which assume globular, convex clusters—a shape that network traffic data rarely conforms to perfectly. <strong>K-Means</strong> offers the best compromise for general traffic profiling, balancing separation (high Silhouette) and compactness (low Davies-Bouldin), provided K is optimized via the Elbow Method.
         </p>
      </section>
    </div>
  );
};

export default ClusteringComparison;
