import ClassCard from './ClassCard';

function prettyYearLabel(yearKey) {
  const map = {
    freshman: 'Freshman Year',
    sophomore: 'Sophomore Year',
    junior: 'Junior Year',
    senior: 'Senior Year'
  };
  return map[yearKey] || yearKey;
}

export default function YearSection({
  yearKey,
  yearData,
  onOpenCourse,
  collapsed,
  onToggle
}) {
  const coreCount = yearData.core.length;
  const electiveCount = yearData.elective.length;

  return (
    <section className="year-block">
      <button
        type="button"
        className="year-block-header"
        onClick={onToggle}
        aria-expanded={!collapsed}
      >
        <span className="year-arrow-box" aria-hidden="true">
          <span className={`year-arrow ${collapsed ? 'down' : 'up'}`} />
        </span>

        <span className="year-block-title">{prettyYearLabel(yearKey)}</span>

        <span className="year-block-meta">
          {coreCount} core · {electiveCount} elective
        </span>
      </button>

      {/* Always render container so it can reserve height/width via CSS */}
      <div
        className={`year-block-content ${collapsed ? 'is-collapsed' : 'is-open'}`}
      >
        {!collapsed && (
          <div className="year-grid">
            <div className="bucket">
              <h4>Core</h4>
              {coreCount === 0 ? (
                <p className="empty-text">No core suggestions listed.</p>
              ) : (
                yearData.core.map((course) => (
                  <ClassCard
                    key={course.id}
                    course={course}
                    onClick={() => onOpenCourse(course)}
                  />
                ))
              )}
            </div>

            <div className="bucket">
              <h4>Electives / Supporting</h4>
              {electiveCount === 0 ? (
                <p className="empty-text">No elective suggestions listed.</p>
              ) : (
                yearData.elective.map((course) => (
                  <ClassCard
                    key={course.id}
                    course={course}
                    onClick={() => onOpenCourse(course)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}