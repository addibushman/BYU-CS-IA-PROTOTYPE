import { useMemo, useState } from 'react';
import { emphases, courses, yearLabels } from './data/catalog';
import { buildPlanForEmphasis } from './utils/planner';
import EmphasisSelector from './components/EmphasisSelector';
import YearSection from './components/YearSection';
import ClassDetailModal from './components/ClassDetailModal';

export default function App() {
  const [selectedEmphasis, setSelectedEmphasis] = useState('general');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const plan = useMemo(() => {
    return buildPlanForEmphasis(selectedEmphasis, courses);
  }, [selectedEmphasis]);

  const emphasisMeta =
    emphases.find((e) => e.id === selectedEmphasis) ?? emphases[0];

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>BYU CS Classes Information Architecture Prototype</h1>
        <p className="subtitle">
          Prototype for organizing classes by emphasis, year, and core vs.
          elective
        </p>
      </header>

      <main className="content">
        <section className="panel">
          <h2>1) Choose an Emphasis</h2>
          <EmphasisSelector
            emphases={emphases}
            selectedEmphasis={selectedEmphasis}
            onChange={setSelectedEmphasis}
          />
          <p className="emphasis-description">{emphasisMeta.description}</p>
        </section>

        <section className="panel">
          <h2>2) Suggested Course Path by Year</h2>
          <p className="small-note">
            This is a prototype view. Course offerings, prereqs, and degree
            requirements should be verified with official BYU sources.
          </p>

          {yearLabels.map((yearKey) => (
            <YearSection
              key={yearKey}
              yearKey={yearKey}
              yearData={plan[yearKey]}
              onOpenCourse={setSelectedCourse}
            />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>
          Built for a BYU CS Information Architecture draft assignment (React
          prototype)
        </p>
      </footer>

      <ClassDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}