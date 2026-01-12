
import React from 'react';

interface CodeBlockProps {
  code: string;
  output?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, output, title }) => {
  return (
    <div className="my-8 border border-[#1f2937] rounded-none bg-black shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#050505] border-b border-[#1f2937]">
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest font-mono flex items-center">
            <span className="mr-2 text-gray-600">➜</span> {title}
          </span>
          <div className="flex space-x-1.5 opacity-50">
            <div className="w-2 h-2 rounded-full bg-[#333]"></div>
            <div className="w-2 h-2 rounded-full bg-[#333]"></div>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto bg-[#0a0a0a] relative group">
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] text-green-900 border border-green-900 px-1 rounded font-mono">PYTHON 3.12</span>
        </div>
        <pre className="mono text-sm text-[#4ade80] leading-relaxed">
          <code>{code.trim()}</code>
        </pre>
      </div>
      {output && (
        <div className="border-t border-[#1f2937] p-4 bg-[#050505]">
          <div className="text-[9px] font-bold text-gray-500 uppercase mb-2 tracking-widest">StdOut >></div>
          <pre className="mono text-xs text-gray-400 whitespace-pre-wrap pl-2 border-l-2 border-green-900">
            <code>{output.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
