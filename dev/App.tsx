// Local playground — not published. Imports from '../src' so you are
// editing the real source with hot reload.
import { GanttChart } from '../src';
import type { GanttRow } from '../src';

// dates must be in ISO format // YYYY-MM-DD
const items: GanttRow[] = [
  { title: 'Planning', startDate: '2025-09-15', endDate: '2025-10-03' },
  { title: 'Research', startDate: '2025-09-22', endDate: '2025-10-17' },
  { title: 'Requirements', startDate: '2025-10-01', endDate: '2025-10-24' },
  { title: 'Design', startDate: '2025-10-13', endDate: '2025-11-07' },
  { title: 'Architecture', startDate: '2025-10-27', endDate: '2025-11-21' },
  { title: 'Development', startDate: '2025-11-03', endDate: '2026-01-16' },
  { title: 'Frontend', startDate: '2025-11-10', endDate: '2025-01-19' },
  { title: 'Backend', startDate: '2025-11-17', endDate: '2026-01-09' },
  { title: 'User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance', startDate: '2025-12-01', endDate: '2025-12-12' },
];




export const App = () => {
  return (
    <main className="playground">
      <h1>gantt-chart-component</h1>
      <p className="playground__hint">
        Dev playground — edit <code>src/GanttChart/GanttChart.tsx</code> and this updates instantly.
      </p>

      <GanttChart 
      items={items}
      theme='Mountain'
      size='Large' />
    </main>
  );
};
