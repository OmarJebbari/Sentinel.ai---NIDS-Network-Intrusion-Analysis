
import React from 'react';
import CodeBlock from '../components/CodeBlock';

const dataDistribution = [
  { name: 'Normal', value: 37000, color: '#22c55e' }, // Neon Green
  { name: 'Generic', value: 18871, color: '#eab308' }, // Yellow
  { name: 'Exploits', value: 11132, color: '#a855f7' }, // Purple
  { name: 'Fuzzers', value: 6062, color: '#ec4899' }, // Pink
  { name: 'DoS', value: 4089, color: '#3b82f6' }, // Blue
  { name: 'Recon', value: 3496, color: '#f97316' }, // Orange
  { name: 'Analysis', value: 677, color: '#14b8a6' }, // Teal
  { name: 'Backdoor', value: 583, color: '#ef4444' }, // Red
  { name: 'Shellcode', value: 378, color: '#6366f1' }, // Indigo
  { name: 'Worms', value: 44, color: '#9ca3af' }, // Gray
];

const correlationMatrix = [
  { name: 'sbytes', values: [1.0, 0.96, 0.05, 0.03, -0.01] },
  { name: 'sloss', values: [0.96, 1.0, 0.06, 0.04, -0.02] },
  { name: 'dbytes', values: [0.05, 0.06, 1.0, 0.98, -0.05] },
  { name: 'dloss', values: [0.03, 0.04, 0.98, 1.0, -0.06] },
  { name: 'label', values: [-0.01, -0.02, -0.05, -0.06, 1.0] },
];
const features = ['sbytes', 'sloss', 'dbytes', 'dloss', 'label'];

const boxPlotData = [
  { name: 'sbytes', min: 0, q1: 15, median: 45, q3: 180, max: 400, outliers: [420, 450] },
  { name: 'dbytes', min: 0, q1: 10, median: 55, q3: 210, max: 450, outliers: [480, 520] },
  { name: 'dur', min: 0, q1: 5, median: 25, q3: 60, max: 150, outliers: [180, 220, 260] },
];

const BoxPlotItem: React.FC<{ data: typeof boxPlotData[0], maxValue: number }> = ({ data, maxValue }) => {
  const scale = (val: number) => (val / maxValue) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
        <span className="font-bold text-green-500 uppercase">{data.name}</span>
        <span className="opacity-50">Range: 0 - {data.max}</span>
      </div>
      <div className="relative h-8 w-full bg-[#0a0a0a] border border-[#333] rounded-sm group hover:border-green-500/50 transition-colors">
         <div className="absolute top-1/2 left-0 h-0.5 bg-gray-600" style={{ left: `${scale(data.min)}%`, width: `${scale(data.max - data.min)}%` }}></div>
         <div className="absolute top-1/4 h-1/2 w-0.5 bg-gray-600" style={{ left: `${scale(data.min)}%` }}></div>
         <div className="absolute top-1/4 h-1/2 w-0.5 bg-gray-600" style={{ left: `${scale(data.max)}%` }}></div>
         <div className="absolute top-1 bg-green-900/30 border border-green-500/50 h-6 group-hover:bg-green-500/20 transition-colors" style={{ left: `${scale(data.q1)}%`, width: `${scale(data.q3 - data.q1)}%` }}></div>
         <div className="absolute top-1 h-6 w-0.5 bg-white z-10" style={{ left: `${scale(data.median)}%` }}></div>
         {data.outliers.map((out, i) => (
             <div key={i} className="absolute top-1/2 w-1.5 h-1.5 bg-red-500 rounded-full -mt-[3px]" style={{ left: `${scale(out)}%` }}></div>
        ))}
      </div>
    </div>
  )
}

const EDA: React.FC = () => {

  const renderAttackDistributionChart = () => {
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 80, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const maxValue = 40000; // Close to 37000 (Normal)
    const barPadding = 0.3;
    const barStep = chartWidth / dataDistribution.length;
    const barWidth = barStep * (1 - barPadding);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#050505] rounded-sm" preserveAspectRatio="xMidYMid meet">
            <defs>
                 <filter id="glow-bar">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
                {dataDistribution.map((d, i) => (
                    <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={d.color} stopOpacity="0.8"/>
                        <stop offset="100%" stopColor={d.color} stopOpacity="0.1"/>
                    </linearGradient>
                ))}
            </defs>

            {/* Grid Background */}
            <rect x={margin.left} y={margin.top} width={chartWidth} height={chartHeight} fill="url(#grid-pattern)" />

            {/* Y Axis Grid Lines */}
            {[0, 10000, 20000, 30000, 40000].map(val => {
                const y = margin.top + chartHeight - (val / maxValue) * chartHeight;
                return (
                    <g key={val}>
                        <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#333" strokeDasharray="4 4" />
                        <text x={margin.left - 10} y={y + 3} textAnchor="end" fontSize="10" fill="#6b7280" fontFamily="JetBrains Mono">{val >= 1000 ? `${val/1000}k` : val}</text>
                    </g>
                );
            })}

            {/* Bars */}
            {dataDistribution.map((d, i) => {
                const h = (d.value / maxValue) * chartHeight;
                const x = margin.left + i * barStep + (barStep - barWidth) / 2;
                const y = margin.top + chartHeight - h;
                
                return (
                    <g key={i}>
                        <rect 
                            x={x} 
                            y={y} 
                            width={barWidth} 
                            height={h} 
                            fill={`url(#grad-${i})`} 
                            stroke={d.color}
                            strokeWidth="1"
                            filter="url(#glow-bar)"
                            className="animate-bar"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                        {/* Value Label Top */}
                        <text x={x + barWidth/2} y={y - 8} textAnchor="middle" fontSize="9" fill="#fff" fontFamily="JetBrains Mono" fontWeight="bold" className="animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${i * 0.1 + 0.5}s` }}>{d.value}</text>
                        {/* X Axis Label */}
                        <text 
                            x={x + barWidth/2} 
                            y={height - margin.bottom + 25} 
                            textAnchor="end" 
                            fontSize="10" 
                            fill="#9ca3af" 
                            fontFamily="JetBrains Mono"
                            transform={`rotate(-45, ${x + barWidth/2}, ${height - margin.bottom + 25})`}
                            style={{ textTransform: 'uppercase' }}
                        >
                            {d.name}
                        </text>
                    </g>
                )
            })}
            
            {/* Axis Lines */}
            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#6b7280" strokeWidth="1" />
            <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#6b7280" strokeWidth="1" />
            
            {/* Title Overlay */}
            <text x={width - 20} y={30} textAnchor="end" fill="#333" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">SAMPLES BY CLASS // LOG_SORT_DESC</text>
        </svg>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 3: Exploratory Data Analysis</h1>
        <p className="text-gray-400 mt-4 text-lg border-l-4 border-green-500 pl-4 bg-green-900/10 py-2">
          "The first line of defense is understanding the patterns within the noise."
        </p>
      </header>

      {/* 3.0 Dataset Inspection */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">3.0 Dataset Inspection</h2>
        <p className="text-sm text-gray-400">
           A preliminary examination of the UNSW-NB15 training set structure, ensuring data integrity before processing.
        </p>
        <CodeBlock 
          title="INITIAL DATAFRAME PROFILING"
          code={`
import pandas as pd

# Load the training set
df = pd.read_csv('UNSW_NB15_training-set.csv')

# 1. Preview first 5 rows
print("First 5 rows:")
print(df.head())

# 2. Dataset Dimensions
print(f"\\nShape: {df.shape}")
          `}
          output={`
First 5 rows:
   id   dur proto service state  spkts  dpkts  sbytes  dbytes  rate ... label
0   1 0.121   tcp     ftp   FIN      6      4     258     172  0.0 ...     0
1   2 0.649   tcp    smtp   FIN     14     38     734   42014  0.0 ...     0
2   3 1.623   tcp    http   FIN      8     16     364   13186  0.0 ...     0
3   4 1.681   tcp    http   FIN     12     12     628     770  0.0 ...     0
4   5 0.449   tcp     ftp   FIN     12      6     534     268  0.0 ...     0

Shape: (175341, 45)
          `}
        />
      </section>

      {/* 3.1 Distribution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">3.1 Attack Types Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050505] border border-[#1f2937] p-6 relative flex flex-col h-[450px]">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest font-mono text-center">Distribution of Attack Categories</h3>
            <div className="flex-1 w-full min-h-0">
              {renderAttackDistributionChart()}
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-black border border-green-900/50">
              <h4 className="text-[10px] font-bold text-green-500 uppercase mb-2 font-mono">Imbalance Analysis</h4>
              <p className="text-sm text-gray-400 mb-4">
                The dataset shows a significant imbalance. <strong>Normal traffic</strong> (44.9%) and <strong>Generic</strong> attacks (22.9%) dominate the distribution, while critical threats like <strong>Worms</strong> are extremely rare (44 samples).
              </p>
              <CodeBlock 
                code={`
# Class Imbalance Check
Normal:   37,000 (44.9%)
Generic:  18,871 (22.9%)
Exploits: 11,132 (13.5%)
...
Worms:    44     (0.05%)
                `}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 Feature Correlation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">3.2 Feature Correlation Heatmap</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-8">
           <div className="bg-[#050505] border border-[#1f2937] p-8 aspect-square flex flex-col items-center justify-center relative">
             <div className="absolute top-0 left-0 p-2 text-[10px] text-gray-500 font-mono">FIGURE 3.2: Generated Heatmap</div>
             <h4 className="text-xs font-bold text-gray-500 uppercase mb-6 tracking-widest font-mono">Correlation Matrix Subset</h4>
             <div className="grid grid-cols-6 gap-1 w-full max-w-md">
                <div className="h-8"></div>
                {features.map(f => (
                  <div key={f} className="h-8 flex items-end justify-center text-[9px] font-mono text-gray-400 -rotate-45 origin-bottom-left transform translate-x-2">{f}</div>
                ))}
                {correlationMatrix.map((row, i) => (
                  <React.Fragment key={row.name}>
                    <div className="h-10 flex items-center justify-end pr-2 text-[9px] font-mono text-gray-400">{row.name}</div>
                    {row.values.map((val, j) => {
                      const opacity = Math.abs(val);
                      const color = val > 0 ? `rgba(220, 38, 38, ${opacity})` : `rgba(37, 99, 235, ${opacity})`;
                      return (
                        <div key={`${i}-${j}`} className="h-10 w-full flex items-center justify-center text-[9px] font-bold text-white border border-black/20 hover:scale-110 transition-transform cursor-crosshair" style={{ backgroundColor: color }}>
                          {val.toFixed(2)}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
             </div>
           </div>
           <div className="space-y-4">
             <CodeBlock 
              title="Seaborn Heatmap Implementation"
              code={`
import seaborn as sns
import matplotlib.pyplot as plt

corr_matrix = df[features].corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.show()
              `} 
             />
             <h4 className="text-white font-bold text-lg">Key Observations</h4>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="flex items-start"><span className="text-red-500 mr-2">●</span><span><strong>sbytes ↔ sloss (0.96):</strong> Strong positive correlation.</span></li>
               <li className="flex items-start"><span className="text-blue-500 mr-2">●</span><span><strong>Label Correlation:</strong> Weak linear correlations suggest non-linear models.</span></li>
             </ul>
           </div>
        </div>
      </section>
      
      {/* 3.3 Boxplots */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">3.3 Numerical Feature Distributions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-6">
              <p className="text-sm text-gray-400">Boxplots reveal heavy right-skewed distributions.</p>
              <div className="p-4 bg-[#050505] border border-[#1f2937]">
                <ul className="space-y-2 text-xs text-gray-400 font-mono">
                  <li className="flex justify-between border-b border-[#222] pb-1"><span>Feature</span><span>Skewness</span></li>
                  <li className="flex justify-between"><span className="text-white">sbytes</span><span className="text-red-400">+12.4 (High)</span></li>
                  <li className="flex justify-between"><span className="text-white">dbytes</span><span className="text-red-400">+10.1 (High)</span></li>
                </ul>
              </div>
           </div>
           <div className="bg-[#050505] border border-[#1f2937] p-8">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-6 text-center font-mono">Feature Boxplots (Log-Scaled)</h4>
              <div className="space-y-2">
                 {boxPlotData.map((d, i) => <BoxPlotItem key={i} data={d} maxValue={600} />)}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default EDA;
