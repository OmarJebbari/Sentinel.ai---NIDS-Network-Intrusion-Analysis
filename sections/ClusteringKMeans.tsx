import React from 'react';
import { ResponsiveContainer, Tooltip, Legend } from 'recharts';

const clusterData = [
  { name: 'Cluster 0 (Legitimate)', value: 48, count: '84,164', fill: '#22c55e' }, // Green
  { name: 'Cluster 1 (High Rate/DoS)', value: 35, count: '61,369', fill: '#ef4444' }, // Red
  { name: 'Cluster 2 (Reconnaissance)', value: 17, count: '29,808', fill: '#a855f7' }, // Purple
];

const ATTACK_COLORS: { [key: string]: string } = {
  Normal: '#22c55e',   // Green
  Generic: '#eab308',  // Yellow
  Exploits: '#a855f7', // Purple
  DoS: '#3b82f6',      // Blue
  Recon: '#f97316',    // Orange
  Fuzzers: '#ec4899',  // Pink
  Backdoor: '#ef4444', // Red
  Analysis: '#14b8a6', // Teal
  Shellcode: '#6366f1', // Indigo
  Worms: '#9ca3af'     // Gray
};

const ClusteringKMeans: React.FC = () => {
  
  // Helper for SVG Arcs
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
  };

  // Custom SVG Renderer for Cluster Composition (Donut)
  const renderCompositionChart = () => {
    const width = 500;
    const height = 350;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;
    const strokeWidth = 35;
    
    let currentAngle = 0;
    const gap = 4; // degrees gap

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm" preserveAspectRatio="xMidYMid meet">
         <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
         </defs>

         {/* Central Text */}
         <circle cx={centerX} cy={centerY} r={radius - strokeWidth/2 - 5} fill="none" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 4" />
         <text x={centerX} y={centerY - 10} textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="JetBrains Mono">TOTAL SAMPLES</text>
         <text x={centerX} y={centerY + 15} textAnchor="middle" fontSize="24" fill="#fff" fontWeight="bold" fontFamily="JetBrains Mono">175,341</text>
         
         {/* Donut Segments */}
         {clusterData.map((entry, i) => {
            const angleSize = (entry.value / 100) * 360;
            const startAngle = currentAngle + gap/2;
            const endAngle = currentAngle + angleSize - gap/2;
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            
            // Calculate label position
            const labelRadius = radius + 50;
            const labelPos = polarToCartesian(centerX, centerY, labelRadius, midAngle);
            const lineStart = polarToCartesian(centerX, centerY, radius + strokeWidth/2 + 5, midAngle);

            currentAngle += angleSize;

            return (
               <g key={i}>
                  {/* Arc Path */}
                  <path 
                    d={describeArc(centerX, centerY, radius, startAngle, endAngle)} 
                    fill="none" 
                    stroke={entry.fill} 
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Connector Line */}
                  <path d={`M ${lineStart.x} ${lineStart.y} L ${labelPos.x} ${labelPos.y}`} stroke={entry.fill} strokeWidth="1" opacity="0.5" />
                  <circle cx={labelPos.x} cy={labelPos.y} r="2" fill={entry.fill} />
                  
                  {/* Label Text */}
                  <text 
                    x={labelPos.x} 
                    y={labelPos.y - 15} 
                    textAnchor={midAngle > 180 ? "end" : "start"} 
                    fontSize="12" 
                    fill="#fff" 
                    fontWeight="bold" 
                    fontFamily="JetBrains Mono"
                    dx={midAngle > 180 ? -5 : 5}
                  >
                    {entry.value}%
                  </text>
                   <text 
                    x={labelPos.x} 
                    y={labelPos.y - 4} 
                    textAnchor={midAngle > 180 ? "end" : "start"} 
                    fontSize="10" 
                    fill={entry.fill} 
                    fontWeight="bold" 
                    fontFamily="JetBrains Mono"
                    dx={midAngle > 180 ? -5 : 5}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {entry.name.split('(')[0]}
                  </text>
                  <text 
                    x={labelPos.x} 
                    y={labelPos.y + 8} 
                    textAnchor={midAngle > 180 ? "end" : "start"} 
                    fontSize="9" 
                    fill="#6b7280" 
                    fontFamily="JetBrains Mono"
                    dx={midAngle > 180 ? -5 : 5}
                  >
                    N={entry.count}
                  </text>
               </g>
            );
         })}
      </svg>
    );
  };

  // Custom SVG Renderer for Stacked Bar Chart (Cluster Purity)
  const renderPurityChart = () => {
    const data = [
      { name: 'Cluster 0', total: 37720, composition: { Normal: 36500, Generic: 1000, Exploits: 100, DoS: 50, Recon: 50, Fuzzers: 20 } },
      { name: 'Cluster 1', total: 31010, composition: { Generic: 15000, Exploits: 11000, DoS: 4000, Normal: 200, Recon: 200, Fuzzers: 500, Backdoor: 100, Shellcode: 10 } },
      { name: 'Cluster 2', total: 15380, composition: { Fuzzers: 5500, Recon: 3200, Generic: 2000, Analysis: 600, Exploits: 500, Backdoor: 400, Shellcode: 300, Normal: 100 } }
    ];
    
    // Order of keys for stacking
    const keys = Object.keys(ATTACK_COLORS);

    const width = 800;
    const height = 450;
    const margin = { top: 60, right: 160, bottom: 40, left: 60 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    
    const barWidth = 100;
    const gap = (plotWidth - (data.length * barWidth)) / (data.length + 1);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm shadow-2xl" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="gridLines" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        
        {/* Background Grid */}
        <rect x={margin.left} y={margin.top} width={plotWidth} height={plotHeight} fill="url(#gridLines)" />
        
        {/* Y-Axis Grid Lines & Labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
           const y = margin.top + plotHeight - (tick * plotHeight);
           return (
             <g key={tick}>
               <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#333" strokeDasharray="4 4" />
               <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="10" fill="#6b7280" fontFamily="JetBrains Mono">{Math.round(tick * 100)}%</text>
             </g>
           )
        })}

        {/* Bars */}
        {data.map((cluster, i) => {
          const x = margin.left + gap + (i * (barWidth + gap));
          let currentY = margin.top + plotHeight;
          
          return (
            <g key={i}>
              {keys.map((key) => {
                 const count = (cluster.composition as any)[key] || 0;
                 const percentage = count / cluster.total;
                 const barH = percentage * plotHeight;
                 currentY -= barH;
                 
                 if (barH < 0.1) return null; // Skip tiny segments

                 return (
                   <rect 
                     key={key}
                     x={x}
                     y={currentY}
                     width={barWidth}
                     height={barH}
                     fill={ATTACK_COLORS[key]}
                     stroke="#050505"
                     strokeWidth="1"
                   >
                     <title>{`${key}: ${count} (${(percentage * 100).toFixed(1)}%)`}</title>
                   </rect>
                 )
              })}
              {/* X-Axis Label */}
              <text x={x + barWidth/2} y={margin.top + plotHeight + 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff" fontFamily="JetBrains Mono">{cluster.name}</text>
            </g>
          )
        })}

        {/* Legend */}
        <g transform={`translate(${width - 140}, ${margin.top})`}>
           <text x="0" y="-10" fontSize="10" fill="#fff" fontFamily="JetBrains Mono" fontWeight="bold" textDecoration="underline">ATTACK TYPES</text>
           {keys.map((key, i) => (
             <g key={key} transform={`translate(0, ${i * 18})`}>
                <rect width="10" height="10" fill={ATTACK_COLORS[key]} rx="2" />
                <text x="15" y="9" fontSize="9" fill="#9ca3af" fontFamily="JetBrains Mono">{key}</text>
             </g>
           ))}
        </g>
        
        {/* Title */}
        <text x={width/2} y={30} textAnchor="middle" fontSize="14" fill="#green-400" className="fill-green-400 font-mono font-bold uppercase tracking-widest">
           Composition Purity Analysis (100% Stack)
        </text>

        {/* Axes Lines */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#6b7280" strokeWidth="1" />
        <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#6b7280" strokeWidth="1" />
      </svg>
    )
  }

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 6.1: K-Means Anomaly Profiling</h1>
        <p className="text-gray-400 mt-4 text-lg">Unsupervised discovery of traffic behavioral modes.</p>
      </header>

      {/* 6.1.1 Elbow Method */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">6.1.1 Elbow Method & Silhouette Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Inertia Curve Visualization */}
          <div className="bg-[#050505] border border-[#1f2937] rounded-xl p-8 h-[350px] relative flex flex-col justify-end overflow-hidden">
             <div className="absolute top-8 left-0 w-full text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">Inertia Curve</span>
             </div>
             {/* Curve/Bar Visualization */}
             <div className="flex items-end justify-between px-4 h-[200px] mb-4 relative z-10">
                {[
                  { k: 1, v: 100 }, { k: 2, v: 60 }, { k: 3, v: 35 }, 
                  { k: 4, v: 25 }, { k: 5, v: 20 }, { k: 6, v: 16 }, { k: 7, v: 14 }
                ].map((item, i) => (
                  <div key={item.k} className="flex flex-col items-center space-y-3 group w-full relative">
                    <div className="w-1.5 bg-[#1f2937] group-hover:bg-blue-600 transition-colors rounded-full relative" style={{ height: `${item.v}%` }}>
                        {item.k === 3 && (
                            <div className="absolute -top-10 -left-3 w-8 h-8 rounded-full border border-dashed border-yellow-500 animate-pulse flex items-center justify-center">
                                <span className="text-[8px] font-bold text-yellow-500 bg-black px-1 absolute -top-3">K=3</span>
                            </div>
                        )}
                        {item.k <= 3 && <div className="absolute bottom-0 w-full bg-blue-900/50 rounded-full" style={{ height: '100%' }}></div>}
                        {item.k === 3 && <div className="absolute bottom-0 w-full bg-blue-500 shadow-[0_0_10px_#3b82f6] rounded-full" style={{ height: '100%' }}></div>}
                    </div>
                    <span className={`text-[10px] font-mono ${item.k === 3 ? 'text-white font-bold' : 'text-gray-600'}`}>K={item.k}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-bold text-white font-mono">Optimal K=3</h3>
             <p className="text-sm text-gray-400 leading-relaxed">
               The Elbow Method suggested <strong className="text-green-400">K=3</strong> as the optimal number of clusters. This aligns with the silhouette score analysis which peaked at <strong className="text-green-400">0.2787</strong> for K=3.
             </p>
             <div className="p-6 bg-[#0a0a0a] border border-[#1f2937] rounded-lg flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Silhouette Score</span>
                <span className="text-3xl font-black text-white font-mono">0.2787</span>
             </div>
          </div>
        </div>
      </section>

      {/* 6.1.2 Cluster Composition */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">6.1.2 Cluster Composition (Overall)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-[#050505] border border-[#1f2937] rounded-none p-4 h-[350px]">
             {/* Replaced PieChart with Custom SVG Donut */}
             {renderCompositionChart()}
          </div>
          <div className="space-y-4">
             <h3 className="text-white font-bold font-mono text-sm uppercase tracking-wider">Profile Definitions</h3>
             <ul className="space-y-4">
               {[
                 { label: 'Cluster 0 (Legitimate)', text: 'Characterized by low TTL and stable packet rates. Correlates 92% with labeled Normal traffic.', color: 'border-green-500' },
                 { label: 'Cluster 1 (Attacks)', text: 'High byte counts and sustained flow duration. Contains the majority of DoS and Exploit samples.', color: 'border-red-500' },
                 { label: 'Cluster 2 (Probing)', text: 'Irregular interval packets, signature of Reconnaissance and low-volume anomalies.', color: 'border-purple-500' }
               ].map(item => (
                 <li key={item.label} className={`p-4 bg-[#0a0a0a] border-l-2 ${item.color} shadow-lg`}>
                   <div className="text-xs font-bold text-white uppercase mb-1 font-mono">{item.label}</div>
                   <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </section>

      {/* 6.1.3 Cluster Purity */}
      <section className="space-y-8 pt-8 border-t border-[#1f2937]">
        <h2 className="text-2xl font-bold font-mono text-green-400">6.1.3 Cluster Purity & Attack Distribution</h2>
        <p className="text-sm text-gray-400">
           To validate the semantic meaning of our unsupervised clusters, we cross-referenced the cluster assignments with the ground-truth labels. The figure below visualizes the <strong>composition purity</strong> of each cluster by attack category.
        </p>
        
        {/* Custom SVG Stacked Bar Chart */}
        <div className="border border-[#1f2937] p-2 bg-[#000]">
           {renderPurityChart()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { c: 'Cluster 0', purity: '96.8%', label: 'Legitimate Traffic', desc: 'Dominated by Normal traffic (Green). The small bands of yellow/purple represent "Generic" and "Exploits" that mimic normal flow statistics (False Negatives).' },
             { c: 'Cluster 1', purity: '99.3%', label: 'Volumetric Attacks', desc: 'Almost entirely composed of Generic, DoS, and Exploits. This cluster captures high-rate, high-byte anomalies.' },
             { c: 'Cluster 2', purity: '92.1%', label: 'Probing & Fuzzers', desc: 'A diverse mix of Reconnaissance, Fuzzers, and Analysis attacks. The presence of multiple colors indicates these attacks share "low-and-slow" characteristics.' }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-[#0a0a0a] border border-[#1f2937] hover:border-green-500/30 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-600 font-mono opacity-50">0{i+1}</div>
                <div className="text-sm font-bold text-white mb-1 font-mono group-hover:text-green-400">{item.c}</div>
                <div className="text-xl font-black text-green-500 mb-2">{item.purity} <span className="text-[10px] text-gray-500 font-normal align-middle uppercase">Purity</span></div>
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider border-b border-[#222] pb-2">{item.label}</div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-mono">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default ClusteringKMeans;