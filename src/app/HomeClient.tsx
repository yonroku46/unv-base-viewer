'use client';

import { useSnackbar } from 'notistack';
import { config } from '@/config';
import Button from '@/components/ui/Button/Button';
import '@/styles/pages/home.scss';

// 軽量なインラインSVGアイコン（外部UIライブラリ非依存）
function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
    </svg>
  );
}

export default function HomeClient() {
  const { enqueueSnackbar } = useSnackbar();

  const handleTestNotice = () => {
    enqueueSnackbar(`${config.service.name} サービスへようこそ！`, { variant: 'success' });
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>
          次世代の <span>{config.service.name}</span> プラットフォーム
        </h1>
        <p>
          Next.js App Router、Dembrandt独自デザインシステム、Redux Toolkit、SCSSを活用した、
          高速で拡張性の高いモダンなウェブアプリケーションの基盤です。
        </p>
        <div className="cta-buttons">
          <Button
            variant="primary"
            size="lg"
            startIcon={<RocketIcon />}
            onClick={handleTestNotice}
          >
            通知テスト
          </Button>
          <Button variant="outlined" size="lg">
            ドキュメントを見る
          </Button>
        </div>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon-wrapper">
            <SpeedIcon />
          </div>
          <h3>Next.js 15+ App Router</h3>
          <p>
            SSR/CSRの分離パターンにより、SEOとインタラクティブ性の両立を実現します。
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper">
            <ShieldIcon />
          </div>
          <h3>堅牢な状態管理</h3>
          <p>
            Redux Toolkitとredux-persistによる安全で予測可能なステート永続化。
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper">
            <PaletteIcon />
          </div>
          <h3>Dembrandt デザインシステム</h3>
          <p>
            外部ライブラリ非依存の軽量コンポーネントと、完全なトークン一元管理体系。
          </p>
        </div>
      </div>
    </div>
  );
}
