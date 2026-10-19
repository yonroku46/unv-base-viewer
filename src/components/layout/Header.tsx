'use client';

import Link from 'next/link';
import { useHeaderVisibility } from '@/common/hooks/useHeaderVisibility';
import { config } from '@/config';
import Button from '@mui/material/Button';
import './Header.scss';

export default function Header() {
  const { isHeaderVisible } = useHeaderVisibility();

  return (
    <header className={`app-header ${!isHeaderVisible ? 'hidden' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="brand">
          <span>{config.service.name}</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">ホーム</Link>
          <Link href="/about">概要</Link>
          <Button variant="contained" size="small" color="primary">
            ログイン
          </Button>
        </nav>
      </div>
    </header>
  );
}
