import { Barcode } from '../../effects/Barcode';
import './Footer.css';

type FooterProps = {
  content: {
    footer: {
      build: string;
      stamp: string;
    };
    contact: {
      info: {
        email: string;
        location: string;
      };
    };
  };
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__build">{content.footer.build}</span>
          <span className="footer__stamp">{content.footer.stamp}</span>
        </div>
        <div className="footer__center">
          <Barcode height={32} bars={[2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4]} />
        </div>
        <div className="footer__right">
          <a href={`mailto:${content.contact.info.email}`}>{content.contact.info.email}</a>
          <span>{content.contact.info.location}</span>
        </div>
      </div>
    </footer>
  );
}
