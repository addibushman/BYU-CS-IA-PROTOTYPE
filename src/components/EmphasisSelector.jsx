export default function EmphasisSelector({
    emphases,
    selectedEmphasis,
    onChange
  }) {
    return (
      <div className="emphasis-grid">
        {emphases.map((emphasis) => {
          const isSelected = emphasis.id === selectedEmphasis;
          return (
            <button
              key={emphasis.id}
              type="button"
              className={`emphasis-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onChange(emphasis.id)}
            >
              {emphasis.label}
            </button>
          );
        })}
      </div>
    );
  }