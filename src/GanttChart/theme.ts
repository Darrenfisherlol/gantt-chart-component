import './globaltheme.css';

export type GanttTheme = 'Prairie' | 'Mountain' | 'Forest';

// root class from globaltheme.css ex - 'Forest' => 'ForestTheme'. it sets the --gantt-* color variables the chart reads
export const themeClass = (theme: GanttTheme): string => `${theme}Theme`;
