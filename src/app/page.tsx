import { generatePageMetadata } from '@/common/lib/Metadata';
import HomeClient from './HomeClient';

export async function generateMetadata() {
  return generatePageMetadata('ホーム');
}

export default function HomePage() {
  return <HomeClient />;
}
