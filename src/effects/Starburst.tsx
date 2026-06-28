import './Starburst.css';

export function Starburst() {
  return (
    <svg className="starburst" viewBox="0 0 200 200" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          transform={`rotate(${i * 30} 100 100)`}
          className="starburst__line"
        />
      ))}
      <circle cx="100" cy="100" r="8" className="starburst__core" />
    </svg>
  );
}
