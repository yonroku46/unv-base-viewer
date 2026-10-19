import { Metadata } from 'next';
import { config } from '@/config';

export function generatePageMetadata(
  title?: string,
  description?: string
): Metadata {
  const metaTitle = title
    ? `${title} - ${config.service.name}`
    : config.service.metadata.title.default;
  const metaDesc = description || config.service.metadata.description;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: config.baseUrl,
      siteName: config.service.name,
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
    },
  };
}
