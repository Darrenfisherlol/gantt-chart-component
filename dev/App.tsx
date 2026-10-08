// Demo page + local playground — not published. Imports from '../src' so you are
// editing the real source with hot reload. Deployed to GitHub Pages by .github/workflows/deploy-demo.yml
import { useState } from 'react';
import { GanttChart } from '../src';
import {
  dateRanges,
  defaultScenario,
  scenarios,
  themes,
  type DateRange,
  type Scenario,
} from './scenarios';

const REPO_URL = 'https://github.com/Darrenfisherlol/gantt-chart-component';

// only accept values we know about ~ anything else in the url falls back to the default
const pick = <T extends string>(value: string | null, allowed: readonly T[], fallback: T): T =>
  allowed.find((x) => x === value) ?? fallback;

// ?scenario=sprint&theme=Prairie&range=Day deep links to one setup (the screenshot script uses this)
const readUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const scenario = scenarios.find((s) => s.id === params.get('scenario')) ?? defaultScenario;

  return {
    scenario,
    range: pick(params.get('range'), dateRanges, scenario.defaultRange),
    // no theme in the url -> undefined, so the chart falls back to its own default (Forest)
    theme: themes.find((x) => x === params.get('theme')),
  };
};

export const App = () => {
  const [initial] = useState(readUrl);
  const [scenario, setScenario] = useState<Scenario>(initial.scenario);
  const [range, setRange] = useState<DateRange>(initial.range);

  const selectScenario = (next: Scenario) => {
    setScenario(next);
    setRange(next.defaultRange);

    // keep the url shareable
    const params = new URLSearchParams(window.location.search);
    params.set('scenario', next.id);
    params.delete('range');
    window.history.replaceState(null, '', `?${params}`);
  };

  return (
    <main className="playground">
      <header className="playground__header">
        <div>
          <h1>Gantt Chart Component</h1>
          <p className="playground__hint">A typed React Gantt chart. Data in, chart out.</p>
        </div>
        <a className="playground__link" href={REPO_URL}>
          View on GitHub
        </a>
      </header>

      <nav className="playground__tabs" aria-label="Sample data">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className="playground__tab"
            aria-pressed={s.id === scenario.id}
            onClick={() => selectScenario(s)}
          >
            {s.name}
          </button>
        ))}
      </nav>
      <p className="playground__description">{scenario.description}</p>

      {/* the chart only reads userTheme / userDateRange on mount, so the key remounts it per scenario */}
      <GanttChart
        key={`${scenario.id}-${range}`}
        items={scenario.items}
        userDateRange={range}
        userTheme={initial.theme}
        size={'Large'}
      />

      <p className="playground__footer">
        Drag the divider to resize · hover a bar for details · click a row to highlight it · use the chart's own buttons to change the view and theme
      </p>
    </main>
  );
};
