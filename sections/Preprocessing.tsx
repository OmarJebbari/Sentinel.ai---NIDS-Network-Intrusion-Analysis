
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const Preprocessing: React.FC = () => {
  // Custom SVG Renderer for PCA Plot (Simulated 3D)
  const renderPCAPlot = () => {
    const width = 600;
    const height = 450;
    
    // Isometric Projection Helper
    const project = (x: number, y: number, z: number) => {
        const cx = width / 2;
        const cy = height / 2;
        const scale = 110;
        // x goes right-down, z goes left-down, y goes up
        const x2d = cx + (x - z) * scale * Math.cos(Math.PI / 6);
        const y2d = cy + (x + z) * scale * Math.sin(Math.PI / 6) - (y * scale);
        return { x: x2d, y: y2d, depth: x + z - y, zOriginal: z };
    };

    const points = [];
    // 1. Normal Traffic (Green)
    for (let i = 0; i < 400; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.3;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const y = (Math.random() - 0.5) * 0.2;
        const p = project(x, y, z);
        points.push({ ...p, color: '#22c55e', opacity: 0.7, r: 1.5 });
    }
    // 2. DoS Attack (Red)
    for (let i = 0; i < 200; i++) {
        const t = Math.random();
        const x = t * 1.5;
        const y = t * 1.2 + (Math.random() - 0.5) * 0.1;
        const z = (Math.random() - 0.5) * 0.2;
        const p = project(x, y, z);
        points.push({ ...p, color: '#ef4444', opacity: 0.8, r: 2 });
    }
    // 3. Probe (Orange)
    for (let i = 0; i < 150; i++) {
        const t = Math.random();
        const x = (Math.random() - 0.5) * 0.5;
        const y = t * 0.8;
        const z = -t * 1.2 + (Math.random() - 0.5) * 0.3;
        const p = project(x, y, z);
        points.push({ ...p, color: '#f97316', opacity: 0.6, r: 1.5 });
    }

    points.sort((a, b) => a.depth - b.depth);

    // Cube Vertices
    const range = 1.8;
    const v = [
        project(-range/2, -0.5, -range/2), project(range/2, -0.5, -range/2), project(range/2, -0.5, range/2), project(-range/2, -0.5, range/2), 
        project(-range/2, 1.5, -range/2), project(range/2, 1.5, -range/2), project(range/2, 1.5, range/2), project(-range/2, 1.5, range/2)
    ];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-[#0a0a0a] rounded-sm" preserveAspectRatio="xMidYMid meet">
            <defs>
                <pattern id="grid3d" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
                </pattern>
                <radialGradient id="glow3d" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#000" stopOpacity="0"/>
                </radialGradient>
            </defs>
            <circle cx={width/2} cy={height/2} r={200} fill="url(#glow3d)" />
            <path d={`M ${v[0].x} ${v[0].y} L ${v[1].x} ${v[1].y} L ${v[2].x} ${v[2].y} L ${v[3].x} ${v[3].y} Z`} fill="none" stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1={v[0].x} y1={v[0].y} x2={v[4].x} y2={v[4].y} stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1={v[1].x} y1={v[1].y} x2={v[5].x} y2={v[5].y} stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1={v[3].x} y1={v[3].y} x2={v[7].x} y2={v[7].y} stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" />
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.color} fillOpacity={p.opacity} />
            ))}
             <line x1={v[2].x} y1={v[2].y} x2={v[6].x} y2={v[6].y} stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
            <text x={v[1].x + 10} y={v[1].y} fill="#4ade80" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">PC1</text>
            <text x={v[4].x} y={v[4].y - 10} fill="#4ade80" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">PC2</text>
            <text x={v[3].x - 25} y={v[3].y} fill="#4ade80" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">PC3</text>
            <g transform={`translate(${width - 130}, 20)`}>
                <rect width="110" height="80" fill="rgba(5,5,5,0.9)" stroke="#1f2937" rx="4" />
                <circle cx="20" cy="25" r="3" fill="#22c55e" />
                <text x="35" y="29" fontSize="9" fontFamily="JetBrains Mono" fill="#9ca3af">Normal</text>
                <circle cx="20" cy="45" r="3" fill="#ef4444" />
                <text x="35" y="49" fontSize="9" fontFamily="JetBrains Mono" fill="#9ca3af">DoS</text>
                <circle cx="20" cy="65" r="3" fill="#f97316" />
                <text x="35" y="69" fontSize="9" fontFamily="JetBrains Mono" fill="#9ca3af">Probe</text>
            </g>
        </svg>
    );
  };

  const pcaVarianceData = [
    { id: 'PC1', variance: 21.8, cumulative: 21.8 },
    { id: 'PC2', variance: 9.0, cumulative: 30.8 },
    { id: 'PC3', variance: 8.3, cumulative: 39.1 },
    { id: 'PC4', variance: 6.5, cumulative: 45.6 },
    { id: 'PC5', variance: 5.2, cumulative: 50.8 },
    { id: 'PC6', variance: 4.8, cumulative: 55.6 },
    { id: 'PC7', variance: 4.1, cumulative: 59.7 },
    { id: 'PC8', variance: 3.5, cumulative: 63.2 },
    { id: 'PC9', variance: 3.0, cumulative: 66.2 },
    { id: 'PC10', variance: 2.5, cumulative: 68.7 },
  ];

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-700">
      <header className="border-b border-green-900/30 pb-8">
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 4: Data Engineering Pipeline</h1>
        <p className="text-gray-400 mt-4 text-lg">Transforming raw packets into feature vectors.</p>
      </header>

      {/* 4.1 CLEANING & IMPUTATION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">4.1 Cleaning & Imputation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              The raw dataset contained artifacts from the traffic capture process. Specifically, infinite values in flow duration were generated during timeout events. We employ a rigorous imputation strategy to handle these gaps.
            </p>
            <div className="p-4 bg-[#050505] border border-[#1f2937] font-mono text-xs shadow-lg relative overflow-hidden">
               <div className="text-gray-500 mb-4 border-b border-[#222] pb-2 font-bold uppercase tracking-wider flex justify-between items-center">
                   <span># Cleaning Log</span>
                   <div className="flex space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div></div>
               </div>
               <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center group border-b border-[#111] pb-2">
                  <span className="text-red-400 group-hover:text-red-300 transition-colors">NaN values found</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-600">>>></span>
                    <span className="text-green-500 font-bold">Replaced with 0</span>
                  </div>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-red-400 group-hover:text-red-300 transition-colors">Inf / -Inf found</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-600">>>></span>
                    <span className="text-green-500 font-bold">Replaced with NaN → 0</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <CodeBlock 
            title="HANDLING INFINITE VALUES & IMPUTATION"
            code={`
from sklearn.impute import SimpleImputer

# 1. Sanitize: Replace infinite values with NaN
train_encoded.replace([np.inf, -np.inf], np.nan, inplace=True)
test_encoded.replace([np.inf, -np.inf], np.nan, inplace=True)

# 2. Impute: Fill missing values with 0 using SimpleImputer
# Strategy='constant' with fill_value=0 effectively handles artifacts
imputer = SimpleImputer(strategy='constant', fill_value=0)
train_imputed = imputer.fit_transform(train_encoded)
test_imputed = imputer.transform(test_encoded)
            `}
          />
        </div>
      </section>

      {/* 4.4 PCA */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono text-green-400">4.4 Dimensionality Reduction (PCA)</h2>
        <p className="text-gray-400 text-sm">
          We applied Principal Component Analysis to project the 42-dimensional feature space into lower dimensions.
        </p>

        <CodeBlock 
          title="PCA Implementation"
          code={`
from sklearn.decomposition import PCA

# Initialize PCA with 10 components for variance analysis
pca = PCA(n_components=10, random_state=42)
X_pca = pca.fit_transform(X_scaled)

var_ratio = pca.explained_variance_ratio_
print(f"Top 3 Components Variance: {var_ratio[:3]}")
          `}
          output={`Top 3 Components Variance: [0.218 0.090 0.083]`}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* CHART 1: PCA SCATTER (3D) */}
           <div className="bg-[#050505] border border-[#1f2937] p-1 relative flex flex-col rounded-sm h-[450px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-full text-center py-2 bg-[#0a0a0a] border-b border-[#1f2937] z-10">
                  <span className="text-green-500 font-bold text-xs font-mono uppercase tracking-[0.2em]">PCA Projection (3D)</span>
              </div>
              <div className="w-full h-full pt-8">
                  {renderPCAPlot()}
              </div>
           </div>

           {/* CHART 2: VARIANCE EXPLAINED */}
           <div className="space-y-6">
              <div className="bg-[#050505] border border-[#1f2937] p-6 flex flex-col h-[300px] shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xs font-bold text-gray-500 uppercase font-mono tracking-widest">Explained Variance Ratio</h4>
                     <div className="flex space-x-3 text-[9px] font-mono">
                        <div className="flex items-center"><div className="w-2 h-2 bg-green-500 mr-1"></div>Var %</div>
                        <div className="flex items-center"><div className="w-2 h-2 bg-white rounded-full mr-1"></div>Cum %</div>
                     </div>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={pcaVarianceData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                        <defs>
                          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="id" stroke="#6b7280" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} />
                        <YAxis yAxisId="left" stroke="#6b7280" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={10} fontFamily="JetBrains Mono" domain={[0, 80]} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                          formatter={(value: number) => [`${value}%`, '']}
                        />
                        <Bar yAxisId="left" dataKey="variance" fill="url(#colorBar)" barSize={24} radius={[2, 2, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#ffffff" strokeWidth={2} dot={{ r: 3, fill: '#000', stroke: '#fff', strokeWidth: 1.5 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
              </div>
              
              <div className="p-4 bg-[#0a0a0a] border-l-2 border-green-500">
                 <h4 className="text-sm font-bold text-white mb-2 font-mono">Interpretation</h4>
                 <p className="text-xs text-gray-400 leading-relaxed">
                    The scree plot indicates that the first 10 components explain roughly <strong>68.7%</strong> of the total variance. The "elbow" occurs around PC4, suggesting that 4-6 dimensions are sufficient to capture the main traffic behaviors.
                 </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Preprocessing;
