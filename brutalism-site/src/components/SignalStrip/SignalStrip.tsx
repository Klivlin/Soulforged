import { Barcode } from '../../effects/Barcode';
import './SignalStrip.css';

type SignalStripProps = {
  items: string[];
};

export function SignalStrip({ items }: SignalStripProps) {
  const track = [...items, ...items];

  return (
    <div className="signal-strip" aria-hidden="true">
      <div className="signal-strip__track">
        {track.map((item, index) => (
          <div key={index} className="signal-strip__item">
            <span className="signal-strip__label">{item}</span>
            <Barcode height={16} bars={[1, 2, 1, 3, 1, 2, 4, 1]} />
          </div>
        ))}
      </div>
    </div>
  );
}
