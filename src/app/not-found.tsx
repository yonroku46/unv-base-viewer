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
        페이지를 찾을 수 없습니다.
      </p>
      <Link href="/">
        <Button variant="primary">
          홈으로 이동
        </Button>
      </Link>
    </div>
  );
}
