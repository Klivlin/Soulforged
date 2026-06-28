import './Barcode.css';

type BarcodeProps = {
  bars?: number[];
  height?: number;
};

export function Barcode({
  bars = [2, 1, 3, 1, 1, 4, 2, 2, 1, 3, 2, 1, 4, 1, 2],
  height = 40
}: BarcodeProps) {
  return (
    <div className="barcode" aria-hidden="true" style={{ height: `${height}px` }}>
      {bars.map((width, index) => (
        <span key={index} style={{ width: `${width}px` }} />
      ))}
    </div>
  );
}
