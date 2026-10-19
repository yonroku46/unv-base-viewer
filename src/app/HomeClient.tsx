'use client';

import { useSnackbar } from 'notistack';
import { config } from '@/config';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import '@/styles/pages/home.scss';

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
          Next.js App Router、MUI v6、Redux Toolkit、SCSSを活用した、
          高速で拡張性の高いモダンなウェブアプリケーションの基盤です。
        </p>
        <div className="cta-buttons">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<RocketLaunchIcon />}
            onClick={handleTestNotice}
          >
            通知テスト
          </Button>
          <Button variant="outlined" color="primary" size="large">
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
            <DevicesIcon />
          </div>
          <h3>MUI v6 &amp; SCSS</h3>
          <p>
            統一感のあるマテリアルデザインと、柔軟なカスタムSCSS設計体系。
          </p>
        </div>
      </div>
    </div>
  );
}
