
import React from 'react';

export const AUTHORS = [
  "Jebbari Omar",
  "Oulad Dahman Zainab",
  "Ougrine Rokaya",
  "Ibnsalah Dirar"
];

export const REPORT_STRUCTURE = [
  {
    id: 'front',
    title: 'Front Matter',
    children: [
      { id: 'title-page', title: 'Title Page', icon: 'file' },
      { id: 'abstract', title: 'Abstract', icon: 'file' },
      { id: 'acknowledgments', title: 'Acknowledgments', icon: 'file' },
      { id: 'summary', title: 'Executive Summary', icon: 'file' },
    ]
  },
  {
    id: 'ch1',
    title: 'Chapter 1: Introduction',
    children: [
      { id: 'context', title: '1.1 Context & Motivation', icon: 'file' },
      { id: 'objectives', title: '1.2 Project Objectives', icon: 'file' },
      { id: 'methodology', title: '1.3 Research Methodology', icon: 'file' },
    ]
  },
  {
    id: 'ch2',
    title: 'Chapter 2: State of the Art',
    children: [
      { id: 'nids-overview', title: '2.1 NIDS Foundations', icon: 'file' },
      { id: 'threat-landscape', title: '2.2 Cyber Threat Evolution', icon: 'file' },
      { id: 'lit-review', title: '2.3 Literature Review', icon: 'file' },
    ]
  },
  {
    id: 'ch3',
    title: 'Chapter 3: Exploratory Data Analysis',
    children: [
      { id: 'dataset-profile', title: '3.1 UNSW-NB15 Profiling', icon: 'file' },
      { id: 'univariate', title: '3.2 Univariate Analysis', icon: 'file' },
      { id: 'multivariate', title: '3.3 Correlation Analysis', icon: 'file' },
      { id: 'feature-importance', title: '3.4 Preliminary Importance', icon: 'file' },
    ]
  },
  {
    id: 'ch4',
    title: 'Chapter 4: Data Preprocessing',
    children: [
      { id: 'cleaning', title: '4.1 Data Imputation', icon: 'file' },
      { id: 'encoding', title: '4.2 Categorical Encoding', icon: 'file' },
      { id: 'scaling', title: '4.3 Normalization Strategies', icon: 'file' },
      { id: 'pca', title: '4.4 Dimension Reduction (PCA)', icon: 'file' },
    ]
  },
  {
    id: 'ch5',
    title: 'Chapter 5: Supervised Classification',
    children: [
      { id: 'svm-deep', title: '5.1 SVM Architecture', icon: 'code' },
      { id: 'dt-deep', title: '5.2 Decision Tree Logic', icon: 'code' },
      { id: 'nb-deep', title: '5.3 Naive Bayes Probability', icon: 'code' },
    ]
  },
  {
    id: 'ch6',
    title: 'Chapter 6: Unsupervised Clustering',
    children: [
      { id: 'kmeans-results', title: '6.1 K-Means Discovery', icon: 'code' },
      { id: 'dbscan-results', title: '6.2 DBSCAN Anomaly Isolation', icon: 'code' },
      { id: 'clustering-comparison', title: '6.3 Comparative Analysis', icon: 'file' },
    ]
  },
  {
    id: 'ch7',
    title: 'Chapter 7: Evaluation & Results',
    children: [
      { id: 'benchmarking', title: '7.1 Cross-Model Benchmarking', icon: 'file' },
      { id: 'confusion-matrices', title: '7.2 Error Matrix Analysis', icon: 'file' },
    ]
  },
  {
    id: 'back',
    title: 'Conclusion & References',
    children: [
      { id: 'conclusion-final', title: 'Final Conclusions', icon: 'file' },
      { id: 'future-perspectives', title: 'Future Perspectives', icon: 'file' },
      { id: 'refs', title: 'References', icon: 'file' },
    ]
  }
];

export const ALL_PAGES = REPORT_STRUCTURE.flatMap(s => s.children);

export const ICONS = {
  file: (
    <svg className="w-4 h-4 text-[#8b949e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  code: (
    <svg className="w-4 h-4 text-[#79c0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  folder: (
    <svg className="w-4 h-4 text-[#d29922]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  chevron: (open: boolean) => (
    <svg className={`w-3 h-3 text-[#8b949e] transition-transform ${open ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
    </svg>
  )
};
