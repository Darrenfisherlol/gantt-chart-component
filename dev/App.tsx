// Local playground — not published. Imports from '../src' so you are
// editing the real source with hot reload.
import { GanttChart } from '../src';
import type { GanttRow } from '../src';

const items: GanttRow[] = [
  { id: 1, title: 'Research', startDate: '2026-01-01', endDate: '2026-01-05', order: 1 },
  { id: 2, title: 'Design', startDate: '2026-01-04', endDate: '2026-01-10', order: 2 },
  { id: 3, title: 'Build', startDate: '2026-01-09', endDate: '2026-01-20', order: 3 },
  { id: 4, title: 'Ship', startDate: '2026-01-20', endDate: '2026-01-22', order: 4 },
];

export const App = () => {
  return (
    <main className="playground">
      <h1>gantt-chart-component</h1>
      <p className="playground__hint">
        Dev playground — edit <code>src/GanttChart/GanttChart.tsx</code> and this updates instantly.
      </p>

      <GanttChart items={items} />
    </main>
  );
};
