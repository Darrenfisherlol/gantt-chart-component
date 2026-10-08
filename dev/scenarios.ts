// Sample data for the demo page and the README screenshots.
// Each scenario is paired with the zoom level that fits its time span.
import type { GanttChartProps, GanttRow } from '../src';

export type DateRange = NonNullable<GanttChartProps['userDateRange']>;
export type Theme = NonNullable<GanttChartProps['userTheme']>;

export const dateRanges: readonly DateRange[] = ['Day', 'Week', 'Month'];
export const themes: readonly Theme[] = ['Prairie', 'Mountain', 'Forest'];

export type Scenario = {
  id: string;
  name: string;
  description: string;
  defaultRange: DateRange;
  items: GanttRow[];
};

// dates must be in ISO format // YYYY-MM-DD

const sprint: Scenario = {
  id: 'sprint',
  name: 'Sprint',
  description: 'A one-week engineering sprint. Tasks last a day or two, so the Day view shows them best.',
  defaultRange: 'Day',
  items: [
    { title: 'Sprint planning', startDate: '2026-03-02', endDate: '2026-03-02' },
    { title: 'Auth flow', startDate: '2026-03-02', endDate: '2026-03-03' },
    { title: 'Settings page', startDate: '2026-03-03', endDate: '2026-03-05' },
    { title: 'API rate limits', startDate: '2026-03-04', endDate: '2026-03-05' },
    { title: 'Code review', startDate: '2026-03-05', endDate: '2026-03-06' },
    { title: 'QA pass', startDate: '2026-03-06', endDate: '2026-03-06' },
    { title: 'Release', startDate: '2026-03-06', endDate: '2026-03-06' },
  ],
};

const launch: Scenario = {
  id: 'launch',
  name: 'Product launch',
  description: 'A two-month launch plan with overlapping phases, shown in the Week view.',
  defaultRange: 'Week',
  items: [
    { title: 'Discovery', startDate: '2026-01-05', endDate: '2026-01-14' },
    { title: 'User research', startDate: '2026-01-08', endDate: '2026-01-23' },
    { title: 'Visual design', startDate: '2026-01-19', endDate: '2026-02-04' },
    { title: 'API build', startDate: '2026-01-26', endDate: '2026-02-18' },
    { title: 'Web app', startDate: '2026-02-02', endDate: '2026-02-24' },
    { title: 'Marketing site', startDate: '2026-02-09', endDate: '2026-02-24' },
    { title: 'QA & bug bash', startDate: '2026-02-16', endDate: '2026-02-26' },
    { title: 'Launch', startDate: '2026-02-26', endDate: '2026-02-27' },
  ],
};

const roadmap: Scenario = {
  id: 'roadmap',
  name: 'Roadmap',
  description: 'Multi-month initiatives across three quarters. The Month view keeps them all on screen.',
  defaultRange: 'Month',
  items: [
    { title: 'Platform migration', startDate: '2026-01-12', endDate: '2026-03-27' },
    { title: 'Mobile app beta', startDate: '2026-02-02', endDate: '2026-05-29' },
    { title: 'Payments v2', startDate: '2026-03-16', endDate: '2026-06-26' },
    { title: 'Localization', startDate: '2026-04-06', endDate: '2026-07-17' },
    { title: 'Analytics', startDate: '2026-05-04', endDate: '2026-08-14' },
    { title: 'Holiday readiness', startDate: '2026-07-06', endDate: '2026-09-25' },
    { title: 'Annual planning', startDate: '2026-08-17', endDate: '2026-09-30' },
  ],
};

// the original playground data ~ long titles, non zero-padded dates, a project that spans the new year
const edgeCases: Scenario = {
  id: 'edge',
  name: 'Edge cases',
  description: 'Very long titles, dates without zero padding, and a project that crosses the new year.',
  defaultRange: 'Week',
  items: [
    { title: 'Planning', startDate: '2025-09-15', endDate: '2025-10-03' },
    { title: 'Research', startDate: '2025-09-22', endDate: '2025-10-17' },
    { title: 'Requirements', startDate: '2025-10-01', endDate: '2025-10-24' },
    { title: 'Design', startDate: '2025-10-13', endDate: '2025-11-07' },
    { title: 'Architecture', startDate: '2025-10-27', endDate: '2025-11-21' },
    { title: 'Development', startDate: '2025-11-03', endDate: '2026-01-16' },
    { title: 'Frontend', startDate: '2025-12-05', endDate: '2025-12-25' },
    { title: 'Backend', startDate: '2025-11-17', endDate: '2026-02-09' },
    { title: 'User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance User Acceptance',
      startDate: '2026-1-01',
      endDate: '2026-3-10' },
  ],
};

export const defaultScenario = launch;
export const scenarios: readonly Scenario[] = [sprint, launch, roadmap, edgeCases];
