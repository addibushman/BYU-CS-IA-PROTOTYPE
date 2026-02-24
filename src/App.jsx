import { useMemo, useState } from 'react';
import { emphases, courses, yearLabels } from './data/catalog';
import { buildPlanForEmphasis } from './utils/planner';
import EmphasisSelector from './components/EmphasisSelector';
import YearSection from './components/YearSection';
import ClassDetailModal from './components/ClassDetailModal';

function matchesSearch(course, query) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();

  const haystack = [
    course.code,
    course.title,
    course.shortDescription,
    course.longDescription,
    ...(course.prereqs || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

function filterPlanBySearch(plan, query) {
  if (!query.trim()) return plan;

  const filtered = {};
  for (const year of Object.keys(plan)) {
    filtered[year] = {
      core: plan[year].core.filter((c) => matchesSearch(c, query)),
      elective: plan[year].elective.filter((c) => matchesSearch(c, query))
    };
  }
  return filtered;
}

function findFirstMatchInPlan(plan) {
  for (const year of Object.keys(plan)) {
    if (plan[year].core.length > 0) return plan[year].core[0];
    if (plan[year].elective.length > 0) return plan[year].elective[0];
  }
  return null;
}

export default function App() {
  const [selectedEmphasis, setSelectedEmphasis] = useState('general');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('Computer Science');

  const fullPlan = useMemo(() => {
    return buildPlanForEmphasis(selectedEmphasis, courses);
  }, [selectedEmphasis]);

  const visiblePlan = useMemo(() => {
    return filterPlanBySearch(fullPlan, searchQuery);
  }, [fullPlan, searchQuery]);

  const emphasisMeta =
    emphases.find((e) => e.id === selectedEmphasis) ?? emphases[0];

  const searchMatchedCourse = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return findFirstMatchInPlan(visiblePlan);
  }, [visiblePlan, searchQuery]);

  const chipCourse = searchMatchedCourse || selectedCourse;

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="app-shell app-shell-layout">
      <div className="layout-grid">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-block">
            <label className="sidebar-label" htmlFor="dept-select">
              Department
            </label>
            <div className="select-wrap">
              <select
                id="dept-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="sidebar-select"
              >
                <option>Computer Science</option>
                <option disabled>Information Systems (prototype)</option>
                <option disabled>Cybersecurity (prototype)</option>
              </select>
            </div>
          </div>

          <div className="sidebar-block">
            <label className="sidebar-label" htmlFor="class-search">
              Search for a Class
            </label>
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                id="class-search"
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search"
              />
            </div>
          </div>

          {chipCourse && (
            <div className="selected-chip-row">
              <button
                type="button"
                className="selected-chip"
                onClick={clearSearch}
                title={
                  searchQuery
                    ? 'Clear search'
                    : 'Selected course (click to clear search if active)'
                }
              >
                <span className="chip-x" aria-hidden="true">
                  ×
                </span>
                <span>{chipCourse.code}</span>
              </button>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <div className="main-column">
          <main className="content content-no-max">
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

              {searchQuery.trim() && (
                <p className="small-note search-status">
                  Showing classes matching: <strong>{searchQuery}</strong>
                </p>
              )}

              {yearLabels.map((yearKey) => (
                <YearSection
                  key={yearKey}
                  yearKey={yearKey}
                  yearData={visiblePlan[yearKey]}
                  onOpenCourse={handleOpenCourse}
                />
              ))}
            </section>
          </main>
        </div>
      </div>

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