
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Exact values from your "Top 15 Most Important Features" image, limited to top 10 for clarity
const featureImportance = [
  { feature: 'bytes_ratio', gain: 0.386, color: '#3b82f6' },
  { feature: 'ct_dst_src_ltm', gain: 0.179, color: '#60a5fa' },
  { feature: 'dttl', gain: 0.159, color: '#93c5fd' },
  { feature: 'sbytes', gain: 0.067, color: '#2dd4bf' },
  { feature: 'dbytes', gain: 0.043, color: '#14b8a6' },
  { feature: 'ct_srv_dst', gain: 0.035, color: '#0d9488' },
  { feature: 'smean', gain: 0.017, color: '#10b981' },
  { feature: 'ct_srv_src', gain: 0.014, color: '#34d399' },
  { feature: 'rate', gain: 0.013, color: '#6ee7b7' },
  { feature: 'tcprtt', gain: 0.009, color: '#a7f3d0' },
];

// Enhanced Tree Structure for Visualization (Depth 4)
const treeData = {
  name: "bytes_ratio <= -0.047",
  isLeaf: false,
  gini: 0.45,
  samples: "175k",
  class: "Attack", 
  children: [
    {
      name: "dttl <= -0.426",
      isLeaf: false, 
      gini: 0.05,
      samples: "92k",
      class: "Normal",
      children: [
        { 
          name: "ct_state_ttl <= 0.5", 
          isLeaf: false, 
          gini: 0.02, 
          samples: "88.9k", 
          class: "Normal",
          children: [
             { name: "Normal", isLeaf: true, gini: 0.01, samples: "88k", class: "Normal" },
             { name: "Attack", isLeaf: true, gini: 0.45, samples: "0.9k", class: "Attack" }
          ]
        },
        { 
          name: "sbytes <= -0.15", 
          isLeaf: false, 
          gini: 0.32, 
          samples: "3.1k", 
          class: "Attack",
          children: [
            { name: "Normal", isLeaf: true, gini: 0.12, samples: "1.2k", class: "Normal" },
            { name: "Attack", isLeaf: true, gini: 0.08, samples: "1.9k", class: "Attack" }
          ]
        }
      ]
    },
    {
      name: "ct_dst_src_ltm <= 0.5",
      isLeaf: false,
      gini: 0.38,
      samples: "83k",
      class: "Attack",
      children: [
        { name: "Attack", isLeaf: true, gini: 0.0, samples: "60k", class: "Attack" },
        { 
          name: "sttl <= 2.0", 
          isLeaf: false, 
          gini: 0.41, 
          samples: "23k", 
          class: "Attack",
          children: [
            { 
               name: "service_http <= 0.5",
               isLeaf: false,
               gini: 0.25,
               samples: "8.1k",
               class: "Normal",
               children: [
                  { name: "Normal", isLeaf: true, gini: 0.05, samples: "6k", class: "Normal" },
                  { name: "Attack", isLeaf: true, gini: 0.35, samples: "2.1k", class: "Attack" }
               ]
            },
            { name: "Attack", isLeaf: true, gini: 0.15, samples: "15k", class: "Attack" }
          ]
        }
      ]
    }
  ]
};

const TreeNode: React.FC<{ node: any, isLast?: boolean, isFirst?: boolean, parent?: boolean }> = ({ node, isLast, isFirst, parent }) => {
  const isLeaf = node.isLeaf;
  const isNormal = node.class === 'Normal';
  
  // Style based on class and leaf status
  const nodeColor = isLeaf 
    ? (isNormal ? 'bg-green-900/40 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-red-900/40 border-red-500 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]')
    : 'bg-[#161b22] border-gray-600 text-gray-300';

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className={`relative flex flex-col items-center justify-center p-2 border rounded-md mb-4 z-10 w-32 transition-transform hover:scale-105 ${nodeColor}`}>
        <div className={`text-[9px] font-mono font-bold text-center leading-tight ${isLeaf ? 'uppercase tracking-wider' : ''}`}>
          {node.name}
        </div>
        <div className="flex justify-between w-full mt-1 px-1 text-[8px] font-mono opacity-80">
          <span>Gini: {node.gini}</span>
          <span>N: {node.samples}</span>
        </div>
        {/* Connector dot bottom */}
        {!isLeaf && <div className="absolute -bottom-1 w-2 h-2 bg-gray-500 rounded-full"></div>}
        {/* Connector dot top */}
        {parent && <div className="absolute -top-1 w-2 h-2 bg-gray-500 rounded-full"></div>}
      </div>

      {node.children && (
        <div className="flex relative space-x-2 lg:space-x-6">
           {/* Horizontal Bar */}
           {node.children.length > 1 && (
             <div className="absolute top-[-1rem] left-0 right-0 h-px bg-gray-600 mx-[25%] animate-in fade-in duration-700 delay-300"></div>
           )}
           
           {node.children.map((child: any, i: number) => (
             <div key={i} className="relative flex flex-col items-center">
                {/* Vertical line from parent bar to child */}
                <div className="h-4 w-px bg-gray-600 absolute -top-4 animate-in slide-in-from-top-2 duration-500"></div>
                <TreeNode node={child} parent={true} />
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

const ClassificationDT: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-white font-mono uppercase">Chapter 5.2: Decision Tree Intelligence</h2>
        <p className="text-gray-400 mt-2">Heuristic splitting for interpretable rules.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Accuracy', val: '62.8%', color: 'border-red-500' }, 
          { label: 'Precision', val: '97.9%', color: 'border-green-500' },
          { label: 'Recall', val: '46.4%', color: 'border-red-500' },
          { label: 'Specificity', val: '97.8%', color: 'border-blue-500' },
        ].map((m, i) => (
          <div key={i} className={`bg-[#050505] border border-[#1f2937] border-l-4 ${m.color} p-4 shadow-lg hover:scale-105 transition-transform duration-300`}>
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 font-mono tracking-widest">{m.label}</div>
            <div className="text-2xl font-bold text-white font-mono">{m.val}</div>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-400 font-mono">5.2.1 Feature Importance Analysis</h3>
            <p className="text-sm text-gray-400">
                Decision Trees provide native feature selection by calculating the decrease in impurity (Gini) brought by each feature. The chart on the right visualizes the <strong>Top 10 Most Important Features</strong>.
            </p>
            <p className="text-sm text-gray-400">
                <strong>bytes_ratio</strong> (0.386) is the dominant splitting criterion, indicating that the relationship between data volume sent and received is more predictive than raw packet counts.
            </p>
            <CodeBlock 
              title="Feature Extraction"
              code={`
# Extracting Feature Importances
importances = dt_clf.feature_importances_
indices = np.argsort(importances)[::-1]

# Display Top 10
for i in range(10):
    print(f"{i+1}. {features[indices[i]]} ({importances[indices[i]]:.4f})")
              `}
              output={`
1. bytes_ratio (0.3860)
2. ct_dst_src_ltm (0.1790)
3. dttl (0.1590)
4. sbytes (0.0670)
...
              `}
            />
            <div className="p-4 bg-[#111] border border-gray-800">
               <h4 className="text-[10px] text-gray-500 uppercase mb-2">Interpretation</h4>
               <p className="font-mono text-xs text-green-400">
                 The dominance of 'bytes_ratio' suggests that flow symmetry (or asymmetry) is a key indicator of malicious activity (e.g., exfiltration vs normal browsing).
               </p>
            </div>
        </div>
        <div className="bg-[#050505] border border-[#1f2937] p-4 flex flex-col" style={{ height: '450px' }}>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-4 text-center font-mono">Top 10 Most Important Features</h4>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportance} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                      <XAxis type="number" stroke="#4b5563" fontSize={10} domain={[0, 0.45]} />
                      <YAxis dataKey="feature" type="category" stroke="#9ca3af" fontSize={10} width={90} fontFamily="JetBrains Mono" />
                      <Tooltip 
                        cursor={{fill: '#ffffff11'}} 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }}
                        formatter={(value: number) => [value, 'Importance Score']}
                      />
                      <Bar dataKey="gain" barSize={18} radius={[0, 4, 4, 0]}>
                          {featureImportance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="black" className="animate-bar" style={{ transformOrigin: 'left', animationDelay: `${index * 0.1}s` }} />
                          ))}
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
      </section>

      {/* Decision Tree Visualization Section */}
      <section className="space-y-8 pt-8 border-t border-[#1f2937]">
         <div className="flex items-center justify-between">
            <div>
               <h3 className="text-xl font-bold text-green-400 font-mono">5.2.2 Model Structure Visualization</h3>
               <p className="text-sm text-gray-400">Visualizing the logic flow of 'best_dt_binary' (Depth 4).</p>
            </div>
            <div className="text-[10px] font-mono text-gray-500 border border-gray-700 px-2 py-1 bg-black animate-pulse">
               Root Node Samples: 175,341
            </div>
         </div>
         
         <div className="w-full overflow-x-auto bg-[#0a0a0a] border border-[#1f2937] p-8 shadow-inner custom-scrollbar">
            <div className="min-w-[1200px] flex justify-center pt-4">
               <TreeNode node={treeData} />
            </div>
            <div className="flex justify-center mt-8 space-x-6 text-[10px] font-mono text-gray-500">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-900/40 border border-red-500"></div>
                  <span>Attack Node</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-900/40 border border-green-500"></div>
                  <span>Normal Node</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#161b22] border border-gray-600"></div>
                  <span>Decision Node</span>
               </div>
            </div>
         </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-[#1f2937]">
         <h3 className="text-xl font-bold text-green-400 font-mono">5.2.3 Hyperparameter Tuning (GridSearchCV)</h3>
         <p className="text-sm text-gray-400">
           To optimize the model's generalization capability, we employed <strong>GridSearchCV</strong> to exhaustively search for the best combination of <code>max_depth</code>, <code>min_samples_split</code>, and <code>min_samples_leaf</code>, optimizing for the <strong>F1-Score</strong>.
         </p>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CodeBlock 
              title="Grid Search Implementation"
              code={`
from sklearn.model_selection import GridSearchCV
from sklearn.tree import DecisionTreeClassifier

# Define the parameter grid
param_grid = {
    'max_depth': [10, 20, 30, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Initialize Grid Search with 5-fold CV
grid_search = GridSearchCV(
    estimator=DecisionTreeClassifier(random_state=42),
    param_grid=param_grid,
    cv=5,
    scoring='f1_weighted',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
              `}
            />
            
            <div className="flex flex-col justify-center space-y-6">
                <div className="p-8 bg-[#0a0a0a] border border-green-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] group hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] transition-shadow duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-green-500 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                    </div>
                    <h4 className="text-green-500 font-black uppercase tracking-[0.2em] text-xs font-mono mb-6 border-b border-green-900/50 pb-2">Optimal Configuration Found</h4>
                    <div className="space-y-4 font-mono text-sm relative z-10">
                        <div className="flex justify-between items-center group/item">
                            <span className="text-gray-500 group-hover/item:text-gray-300 transition-colors">max_depth</span>
                            <span className="text-white font-bold bg-[#111] px-2 py-1 border border-[#333]">20</span>
                        </div>
                        <div className="flex justify-between items-center group/item">
                            <span className="text-gray-500 group-hover/item:text-gray-300 transition-colors">min_samples_split</span>
                            <span className="text-white font-bold bg-[#111] px-2 py-1 border border-[#333]">10</span>
                        </div>
                        <div className="flex justify-between items-center group/item">
                            <span className="text-gray-500 group-hover/item:text-gray-300 transition-colors">min_samples_leaf</span>
                            <span className="text-white font-bold bg-[#111] px-2 py-1 border border-[#333]">2</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-dashed border-[#333] mt-2">
                            <span className="text-green-400 font-bold uppercase text-xs tracking-wider">Best CV F1-Score</span>
                            <span className="text-green-400 font-black text-xl animate-pulse">63.12%</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-yellow-900/10 border-l-4 border-yellow-500 text-xs text-gray-400 font-mono">
                    <strong>Analysis:</strong> The optimization confirms that a constrained depth (20) with higher leaf purity requirements (min_samples=10) yields the most stable results, minimizing overfitting while maintaining predictive power.
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ClassificationDT;
