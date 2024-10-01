import LandingPage from '@/components/pages/marketPlace';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CHAINPLUG',
  description: 'Simple Marketplace',
  openGraph: {
    images: ['https://i.imgur.com/FjcUss9.png'],
  },
};

export default function Home() {
  return <LandingPage />
}
