import Link from 'next/link';
import Button from '@/components/ui/Button/Button';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>404</h1>
      <p style={{ color: 'var(--gray-alpha-600)', fontSize: '1.125rem' }}>
        ページが見つかりませんでした。
      </p>
      <Link href="/">
        <Button variant="primary">
          ホームへ戻る
        </Button>
      </Link>
    </div>
  );
}
