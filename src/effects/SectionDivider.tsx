import './SectionDivider.css';

type SectionDividerProps = {
  label?: string;
};

export function SectionDivider({ label = 'SECTOR_BREAK' }: SectionDividerProps) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__label">{label}</span>
      <span className="section-divider__line" />
    </div>
  );
}
