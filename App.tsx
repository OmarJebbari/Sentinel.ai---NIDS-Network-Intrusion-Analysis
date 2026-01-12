
import React, { useState, useEffect } from 'react';
import { REPORT_STRUCTURE, ALL_PAGES, ICONS, AUTHORS } from './constants';
import Introduction from './sections/Introduction';
import EDA from './sections/EDA';
import ClassificationSVM from './sections/ClassificationSVM';
import ClassificationDT from './sections/ClassificationDT';
import ClassificationNB from './sections/ClassificationNB';
import ModelComparison from './sections/ModelComparison';
import ClusteringKMeans from './sections/ClusteringKMeans';
import ClusteringDBSCAN from './sections/ClusteringDBSCAN';
import ClusteringComparison from './sections/ClusteringComparison';
import Conclusion from './sections/Conclusion';
import Preprocessing from './sections/Preprocessing';
import EvaluationResults from './sections/EvaluationResults';
import { Abstract, Acknowledgments, ExecutiveSummary } from './sections/FrontMatter';
import StateOfTheArt from './sections/StateOfTheArt';

const DynamicPage = ({ pageId, title }: { pageId: string, title: string }) => {
  switch (pageId) {
    case 'title-page': return <TitlePage />;
    case 'abstract': return <Abstract />;
    case 'acknowledgments': return <Acknowledgments />;
    case 'summary': return <ExecutiveSummary />;
    case 'context': 
    case 'objectives':
    case 'methodology': return <Introduction />;
    case 'nids-overview':
    case 'threat-landscape':
    case 'lit-review': return <StateOfTheArt />;
    case 'dataset-profile':
    case 'univariate':
    case 'multivariate':
    case 'feature-importance': return <EDA />;
    case 'cleaning':
    case 'encoding':
    case 'scaling':
    case 'pca': return <Preprocessing />;
    case 'svm-deep': return <ClassificationSVM />;
    case 'dt-deep': return <ClassificationDT />;
    case 'nb-deep': return <ClassificationNB />;
    case 'benchmarking': return <ModelComparison />;
    case 'confusion-matrices': return <EvaluationResults />;
    case 'kmeans-results': return <ClusteringKMeans />;
    case 'dbscan-results': return <ClusteringDBSCAN />;
    case 'clustering-comparison': return <ClusteringComparison />;
    case 'conclusion-final': return <Conclusion />;
    case 'future-perspectives':
    case 'refs': return <Conclusion />;
    default: return <div className="text-center py-20 text-[#484f58] font-mono animate-pulse">ACCESS_DENIED // Content Locked</div>;
  }
};

const TitlePage = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-12 animate-in fade-in duration-1000 z-10 relative">
    <div className="relative">
      <div className="absolute inset-0 blur-[100px] bg-green-500/20 rounded-full animate-pulse"></div>
      <div className="w-48 h-48 bg-black border border-green-500/30 rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-[pulse_4s_infinite] group cursor-pointer transition-transform hover:scale-105">
        <div className="absolute inset-0 rounded-full border border-green-500/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
        <svg className="w-24 h-24 text-green-500 animate-pulse-glow group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    </div>
    <div className="space-y-4">
      <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-none font-mono hover:tracking-widest transition-all duration-500 cursor-default">Sentinel<span className="text-green-500 animate-pulse">.ai</span></h1>
      <div className="text-xl text-green-500/80 font-bold tracking-[0.5em] uppercase font-mono border-y border-green-500/20 py-2 inline-block">Advanced NIDS Laboratory</div>
      <p className="text-lg text-[#8b949e] max-w-2xl mx-auto font-mono leading-relaxed mt-4">
        > INITIALIZING UNSW-NB15 PROTOCOLS...<br/>
        > LOADING NEURAL WEIGHTS...<br/>
        > SYSTEM STATUS: <span className="text-green-500 animate-pulse">ONLINE</span>
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
      {AUTHORS.map((a, i) => (
        <div key={a} className="group relative px-6 py-8 bg-black border border-green-900 rounded-none hover:border-green-500 transition-colors cursor-default animate-in fade-in slide-in-from-bottom-4 duration-500 hover:-translate-y-1 flex items-center justify-center min-h-[100px]" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="absolute top-0 left-0 w-1 h-1 bg-green-500 group-hover:w-full transition-all duration-300"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-500 group-hover:w-full transition-all duration-300"></div>
          <div className="text-gray-300 font-mono text-xs uppercase tracking-widest group-hover:text-green-400 relative z-10 text-center">{a}</div>
        </div>
      ))}
    </div>
    <div className="pt-20 animate-in fade-in duration-1000 delay-500">
      <div className="px-8 py-2 border border-green-500/30 bg-green-500/5 text-[10px] font-mono text-green-400 tracking-[0.3em] uppercase hover:bg-green-500/20 transition-colors cursor-crosshair">
        Encrypted Connection Established
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('title-page');
  const [openFolders, setOpenFolders] = useState<string[]>(['front', 'ch1', 'ch3', 'ch5']);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const activePage = ALL_PAGES.find(p => p.id === activeTab);

  return (
    <div className="flex h-screen bg-black text-[#e5e7eb] font-sans overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* Activity Bar (Cyber Style) */}
      <div className="w-16 bg-[#050505] border-r border-[#1f2937] flex flex-col items-center py-6 space-y-8 shrink-0 z-20">
        <div className="text-green-500 p-2 border-l-2 border-green-500 bg-green-500/10 cursor-pointer hover:bg-green-500/20 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg>
        </div>
        <div className="text-[#4b5563] hover:text-green-400 transition-colors cursor-pointer transform hover:scale-110 duration-200">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </div>
        <div className="text-[#4b5563] hover:text-green-400 transition-colors cursor-pointer transform hover:scale-110 duration-200">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H9v-2h6v2zm0-5H9v-2h6v2zm0-5H9V6h6v2z"/></svg>
        </div>
        <div className="mt-auto text-[#4b5563] hover:text-red-500 cursor-pointer transform hover:scale-110 duration-200">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
        </div>
      </div>

      {/* Explorer Sidebar */}
      <aside className="w-72 bg-[#050505] border-r border-[#1f2937] flex flex-col shrink-0 font-mono z-20">
        <div className="p-4 flex justify-between items-center bg-[#050505] border-b border-[#1f2937]">
          <h2 className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">ROOT DIRECTORY</h2>
          <span className="text-[10px] text-[#4b5563]">./src</span>
        </div>
        <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
          {REPORT_STRUCTURE.map(group => (
            <div key={group.id} className="mb-1">
              <button 
                onClick={() => toggleFolder(group.id)}
                className="w-full flex items-center px-4 py-1.5 text-[11px] font-bold text-[#9ca3af] hover:bg-[#111] hover:text-white transition-colors group"
              >
                <span className="mr-1 group-hover:text-green-400 transition-colors">{ICONS.chevron(openFolders.includes(group.id))}</span>
                <span className="mr-2 text-yellow-600 group-hover:text-yellow-400">{ICONS.folder}</span>
                <span className="truncate tracking-tight group-hover:tracking-widest transition-all duration-300">{group.title.toUpperCase()}</span>
              </button>
              {openFolders.includes(group.id) && (
                <div className="ml-4 border-l border-[#1f2937] my-1 animate-in slide-in-from-left-2 duration-300">
                  {group.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => setActiveTab(child.id)}
                      className={`w-full flex items-center px-4 py-1 text-[11px] transition-all group duration-200 ${
                        activeTab === child.id ? 'bg-green-900/20 text-green-400 border-r-2 border-green-500 pl-6' : 'text-[#6b7280] hover:bg-[#111] hover:text-[#d1d5db] hover:pl-5'
                      }`}
                    >
                      <span className="mr-2 shrink-0 opacity-70">{child.icon === 'code' ? ICONS.code : ICONS.file}</span>
                      <span className="truncate">{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Document Panel */}
      <main className="flex-1 flex flex-col bg-[#000] min-w-0 relative">
        
        {/* Interactive Background Spotlight */}
        <div 
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.08), transparent 40%)`
            }}
        />
        
        {/* Background Grid & Noise */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0"></div>

        {/* Workspace Tabs */}
        <div className="h-9 bg-[#050505] flex border-b border-[#1f2937] overflow-x-auto shrink-0 hide-scrollbar z-10">
           <div className="flex items-center px-4 bg-[#0a0a0a] border-t-2 border-green-500 border-r border-[#1f2937] min-w-[180px]">
              <span className="mr-2 text-green-500">{activePage?.icon === 'code' ? ICONS.code : ICONS.file}</span>
              <span className="text-[11px] font-bold text-gray-200 truncate font-mono">{activePage?.title || 'INDEX'}</span>
           </div>
           {['abstract', 'context', 'svm-deep'].filter(id => id !== activeTab).map(id => (
              <div key={id} onClick={() => setActiveTab(id)} className="flex items-center px-4 border-r border-[#1f2937] min-w-[150px] cursor-pointer hover:bg-[#111] transition-colors opacity-60 hover:opacity-100">
                <span className="mr-2 text-gray-500">{ICONS.file}</span>
                <span className="text-[11px] text-gray-500 truncate font-mono">{ALL_PAGES.find(p => p.id === id)?.title}</span>
              </div>
           ))}
        </div>

        {/* Breadcrumbs */}
        <div className="px-6 py-2 bg-[#050505] border-b border-[#1f2937] flex items-center space-x-2 text-[10px] text-gray-500 font-mono tracking-widest shrink-0 uppercase z-10">
          <span className="text-green-600">root</span>
          <span>/</span>
          <span>sentinel_v1</span>
          <span>/</span>
          <span className="text-gray-300">{activePage?.title.toLowerCase().replace(/\s+/g, '_') || 'untitled'}</span>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto p-12 lg:p-20 scroll-smooth custom-scrollbar relative z-10">
          <div className="max-w-4xl mx-auto prose-custom animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeTab}>
            <DynamicPage pageId={activeTab} title={activePage?.title || ''} />
          </div>
        </div>

        {/* Intelligence Status Bar */}
        <footer className="h-6 bg-[#050505] border-t border-green-900/50 text-gray-400 px-4 flex items-center justify-between text-[10px] font-mono shrink-0 z-20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 font-bold tracking-wider">SENTINEL_DAEMON: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-3 h-3 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span>LATENCY: 12ms</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 tracking-widest">
             <span className="hover:text-green-400 cursor-pointer">X: {mousePos.x} Y: {mousePos.y}</span>
             <span>MEM: 64%</span>
             <span>CPU: 12%</span>
             <span className="text-green-500">SECURE</span>
          </div>
        </footer>
      </main>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border: 1px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22c55e; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;
