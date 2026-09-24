// Local playground — not published. Imports from '../src' so you are
// editing the real source with hot reload.
import { GanttChart } from '../src';
import type { GanttRow } from '../src';

// dates must be in ISO format // YYYY-MM-DD
const items: GanttRow[] = [
  { title: 'Research', startDate: '2026-01-01', endDate: '2026-01-05' },
  { title: 'Design', startDate: '2026-01-04', endDate: '2026-01-10' },
  { title: 'Build', startDate: '2026-01-09', endDate: '2026-01-20' },
  { title: 'Ship', startDate: '2026-01-22', endDate: '2026-01-22' },
  { title: 'Ship', startDate: '2026-01-21', endDate: '2026-01-22' },
  { title: 'Ship', startDate: '2026-01-19', endDate: '2026-01-22' },
  { title: 'Ship', startDate: '2026-01-20', endDate: '2026-01-22' },
  { title: 'Ship', startDate: '2026-01-20', endDate: '2026-01-22' },
  { title: 'Ship', startDate: '2026-01-20', endDate: '2026-01-22' },
  {
    title:
      'A VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR VERR',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
  },
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
