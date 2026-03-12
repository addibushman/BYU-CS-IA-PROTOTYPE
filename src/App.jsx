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
    ...(course.prereqs || []),
    ...(course.tags || [])
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

  // Collapsed by default so the page isn't overwhelming
  const [collapsedYears, setCollapsedYears] = useState(() =>
    Object.fromEntries(yearLabels.map((y) => [y, true]))
  );

  const fullPlan = useMemo(() => {
    return buildPlanForEmphasis(selectedEmphasis, courses);
  }, [selectedEmphasis]);

  const visiblePlan = useMemo(() => {
    return filterPlanBySearch(fullPlan, searchQuery);
  }, [fullPlan, searchQuery]);

  const emphasisMeta =
    emphases.find((e) => e.id === selectedEmphasis) ?? emphases[0];

  const firstSearchMatch = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return findFirstMatchInPlan(visiblePlan);
  }, [visiblePlan, searchQuery]);

  const chipCourse = firstSearchMatch || selectedCourse;

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
  };

  const clearSearch = () => setSearchQuery('');

  const toggleYear = (yearKey) => {
    setCollapsedYears((prev) => ({ ...prev, [yearKey]: !prev[yearKey] }));
  };

  const expandAll = () => {
    setCollapsedYears(Object.fromEntries(yearLabels.map((y) => [y, false])));
  };

  const collapseAll = () => {
    setCollapsedYears(Object.fromEntries(yearLabels.map((y) => [y, true])));
  };

  // Nice behavior: if searching, auto-expand all so results are visible
  const isSearching = searchQuery.trim().length > 0;
  const effectiveCollapsedYears = isSearching
    ? Object.fromEntries(yearLabels.map((y) => [y, false]))
    : collapsedYears;

  return (
    <div className="app-shell app-shell-layout">
      <header className="big-header">
        <h1>BYU CS Class Guide</h1>
        <p>
          Explore recommended course paths by emphasis and year, and click any
          course for details.
        </p>
      </header>

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
                <option disabled>Information Systems</option>
                <option disabled>Cybersecurity</option>
              </select>
            </div>
          </div>

          <div className="sidebar-block">
            <label className="sidebar-label" htmlFor="global-search">
              Search
            </label>
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                id="global-search"
                type="text"
                placeholder="Try: prerequisites, web, data, algorithms..."
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
                title={isSearching ? 'Clear search' : 'Selected course'}
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
        <main className="content content-no-max">
          <section className="panel">
            <div className="panel-header-row">
              <h2>Choose an Emphasis</h2>
            </div>

            <EmphasisSelector
              emphases={emphases}
              selectedEmphasis={selectedEmphasis}
              onChange={setSelectedEmphasis}
            />
            <p className="emphasis-description">{emphasisMeta.description}</p>
          </section>

          <section className="panel">
            <div className="panel-header-row">
              <h2>Recommended Course Path by Year</h2>

              {!isSearching && (
                <div className="year-controls">
                  <button type="button" className="text-btn" onClick={expandAll}>
                    Expand all
                  </button>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={collapseAll}
                  >
                    Collapse all
                  </button>
                </div>
              )}
            </div>

            {isSearching && (
              <p className="search-status">
                Results for: <strong>{searchQuery}</strong>
              </p>
            )}

            {yearLabels.map((yearKey) => (
              <YearSection
                key={yearKey}
                yearKey={yearKey}
                yearData={visiblePlan[yearKey]}
                onOpenCourse={handleOpenCourse}
                collapsed={effectiveCollapsedYears[yearKey]}
                onToggle={() => toggleYear(yearKey)}
              />
            ))}
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>BYU CS course planning view</p>
      </footer>

      <ClassDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}