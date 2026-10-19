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
          <Link href="/terms">利用規約</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/contact">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
}
