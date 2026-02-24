import { useEffect } from 'react';

export default function ClassDetailModal({ course, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (course) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        <div className="modal-header">
          <h3 id="course-modal-title">
            {course.code}: {course.title}
          </h3>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p>
            <strong>Credits:</strong> {course.credits}
          </p>
          <p>
            <strong>Prerequisites:</strong>{' '}
            {course.prereqs?.length ? course.prereqs.join(', ') : 'None listed'}
          </p>
          <p>
            <strong>Description:</strong> {course.longDescription}
          </p>

          {course.tags?.length > 0 && (
            <p>
              <strong>Tags:</strong> {course.tags.join(', ')}
            </p>
          )}

          {course.links?.length > 0 && (
            <div>
              <strong>Helpful Links:</strong>
              <ul>
                {course.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="small-note">
            Prototype note: data shown here is for IA/demo structure and should
            be verified against official BYU course catalog / class search.
          </p>
        </div>
      </div>
    </div>
  );
}