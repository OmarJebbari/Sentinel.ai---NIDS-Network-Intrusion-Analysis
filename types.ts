
export interface Section {
  id: string;
  title: string;
  icon: string;
  category: 'introduction' | 'analysis' | 'modeling' | 'evaluation' | 'clustering';
}

export interface MetricData {
  name: string;
  svm: number;
  dt: number;
  nb: number;
}

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  output?: string;
}
