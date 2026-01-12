
import React from 'react';

const StateOfTheArt: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black text-white font-mono uppercase">Chapter 2: State of the Art</h1>
        <p className="text-gray-400 mt-2 font-mono">Evolution of Intrusion Detection and Machine Learning Benchmarks.</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">2.1 NIDS Foundations</h2>
        <p className="text-gray-400 leading-relaxed">
          Network Intrusion Detection Systems (NIDS) are the immune system of digital infrastructure. They are broadly categorized into:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-6 bg-[#0a0a0a] border-l-4 border-blue-500">
            <h3 className="text-white font-bold uppercase mb-2">Signature-Based</h3>
            <p className="text-sm text-gray-400">Rely on database matching of known threat signatures. Highly effective against known attacks but blind to Zero-Day exploits.</p>
          </div>
          <div className="p-6 bg-[#0a0a0a] border-l-4 border-green-500">
            <h3 className="text-white font-bold uppercase mb-2">Anomaly-Based</h3>
            <p className="text-sm text-gray-400">Establish a baseline of "Normal" traffic and flag deviations. Capable of detecting novel attacks but prone to high False Positive rates.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-green-400">2.2 Attack Vectors in UNSW-NB15</h2>
        <p className="text-gray-400">
          This study analyzes 9 distinct attack families alongside normal traffic. The complexity ranges from simple generic scans to sophisticated memory corruption exploits.
        </p>
        <div className="bg-[#050505] border border-[#1f2937] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0a0a0a] text-green-500 border-b border-[#1f2937]">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Nature of Threat</th>
                <th className="px-4 py-3">Risk Level</th>
              </tr>
            </thead>
            <tbody className="text-gray-400 divide-y divide-[#1f2937]">
              <tr>
                <td className="px-4 py-3 text-white">Fuzzers</td>
                <td className="px-4 py-3">Automated injection of random data to crash services.</td>
                <td className="px-4 py-3 text-orange-500">HIGH</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Exploits</td>
                <td className="px-4 py-3">Leveraging known software vulnerabilities (CVEs).</td>
                <td className="px-4 py-3 text-red-500">CRITICAL</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Worms</td>
                <td className="px-4 py-3">Self-replicating malware spreading across nodes.</td>
                <td className="px-4 py-3 text-red-500">CRITICAL</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Reconnaissance</td>
                <td className="px-4 py-3">Information gathering (port scans, OS fingerprinting).</td>
                <td className="px-4 py-3 text-yellow-500">MEDIUM</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">DoS</td>
                <td className="px-4 py-3">Denial of Service - Resource exhaustion.</td>
                <td className="px-4 py-3 text-orange-500">HIGH</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Shellcode</td>
                <td className="px-4 py-3">Small pieces of code used as the payload in exploitation.</td>
                <td className="px-4 py-3 text-red-600">SEVERE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StateOfTheArt;
