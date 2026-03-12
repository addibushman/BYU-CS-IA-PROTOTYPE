import ClassCard from './ClassCard';

function prettyYearLabel(yearKey) {
  const map = {
    freshman: 'Freshman',
    sophomore: 'Sophomore',
    junior: 'Junior',
    senior: 'Senior'
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
  const total = coreCount + electiveCount;

  return (
    <section className="year-section">
      <button
        type="button"
        className="year-header"
        onClick={onToggle}
        aria-expanded={!collapsed}
      >
        <div>
          <h3 className="year-title">{prettyYearLabel(yearKey)} Suggestions</h3>
          <div className="year-subtitle">
            {total} course{total === 1 ? '' : 's'} · {coreCount} core ·{' '}
            {electiveCount} elective
          </div>
        </div>

        <div className="year-chevron" aria-hidden="true">
          {collapsed ? '▸' : '▾'}
        </div>
      </button>

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
    </section>
  );
}