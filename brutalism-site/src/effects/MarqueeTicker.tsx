import './MarqueeTicker.css';

type MarqueeTickerProps = {
  items?: string[];
};

const defaultItems = [
  'LAT 55.7558° N',
  'LON 37.6173° E',
  'GRID::ACTIVE',
  'RENDER::OK',
  'BUILD::v0.1.0',
  'SIGNAL::STABLE',
  'UTC+3',
  'SCAN::01',
];

export function MarqueeTicker({ items = defaultItems }: MarqueeTickerProps) {
  const track = [...items, ...items];

  return (
    <div className="marquee-ticker" aria-hidden="true">
      <div className="marquee-ticker__track">
        {track.map((item, index) => (
          <span key={index} className="marquee-ticker__item">
            {item}
            <span className="marquee-ticker__sep">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
