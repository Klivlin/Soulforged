import './GlitchText.css';

type GlitchTextProps = {
  children: string;
  className?: string;
};

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  return (
    <span className={`glitch ${className}`} data-text={children}>
      {children}
    </span>
  );
}
