import Link from 'next/link';
import { config } from '@/config';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div>
          &copy; {new Date().getFullYear()} {config.service.copyright} All rights reserved.
        </div>
        <div className="footer-links">
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/contact">문의하기</Link>
        </div>
      </div>
    </footer>
  );
}
