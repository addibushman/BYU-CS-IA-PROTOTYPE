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

export default function App() {
  const [selectedEmphasis, setSelectedEmphasis] = useState('general');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('Computer Science');

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

  const toggleYear = (yearKey) => {
    setCollapsedYears((prev) => ({ ...prev, [yearKey]: !prev[yearKey] }));
  };

  const expandAll = () => {
    setCollapsedYears(Object.fromEntries(yearLabels.map((y) => [y, false])));
  };

  const collapseAll = () => {
    setCollapsedYears(Object.fromEntries(yearLabels.map((y) => [y, true])));
  };

  const isSearching = searchQuery.trim().length > 0;
  const effectiveCollapsedYears = isSearching
    ? Object.fromEntries(yearLabels.map((y) => [y, false]))
    : collapsedYears;

  return (
    <div className="app-shell app-shell-layout">
      {/* Full-width header with Department + Search */}
      <header className="big-header big-header-full">
        <div className="header-left">
          <h1>BYU CS Class Guide</h1>
          <p>
            Explore recommended course paths by emphasis and year, and click any
            course for details.
          </p>

          {/* Department moved here */}
          <div className="header-controls">
            <div className="header-control">
              <label className="header-control-label" htmlFor="dept-select">
                Department
              </label>
              <div className="select-wrap header-select-wrap">
                <select
                  id="dept-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="header-select"
                >
                  <option>Computer Science</option>
                  <option disabled>Information Systems</option>
                  <option disabled>Cybersecurity</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="header-right">
          <label className="header-search-label" htmlFor="global-search">
            Search
          </label>
          <div className="header-search-wrap">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              id="global-search"
              type="text"
              placeholder="Try: prerequisites, web, data, algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search"
            />
          </div>
        </div>
      </header>

      {/* Main content is now centered (no sidebar column) */}
      <div className="layout-grid" style={{ gridTemplateColumns: '1fr' }}>
        <main className="content content-no-max">
          <section className="panel">
            <h2>Choose an Emphasis</h2>
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
                onOpenCourse={(course) => setSelectedCourse(course)}
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