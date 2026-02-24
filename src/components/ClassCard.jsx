export default function ClassCard({ course, onClick, isHighlighted = false }) {
  return (
    <button
      type="button"
      className={`class-card ${isHighlighted ? 'class-card-highlighted' : ''}`}
      onClick={onClick}
    >
      <div className="class-card-header">
        <strong>{course.code}</strong>
        <span>{course.credits} cr</span>
      </div>

      <div className="class-title">{course.title}</div>

      <p className="class-short">{course.shortDescription}</p>

      <div className="class-prereqs">
        <span className="label">Prereqs:</span>{' '}
        {course.prereqs?.length ? course.prereqs.join(', ') : 'None listed'}
      </div>

      <div className="class-card-footer">Click for more info</div>
    </button>
  );
}