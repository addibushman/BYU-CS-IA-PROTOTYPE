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

export default function YearSection({ yearKey, yearData, onOpenCourse }) {
  return (
    <section className="year-section">
      <h3>{prettyYearLabel(yearKey)} Suggestions</h3>

      <div className="year-grid">
        <div className="bucket">
          <h4>Core</h4>
          {yearData.core.length === 0 ? (
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
          {yearData.elective.length === 0 ? (
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
    </section>
  );
}