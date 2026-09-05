// Local-only browser fixture. See docs/pixel-displacement.md; do not ship as a route.
'use client';

import PixelDisplacementGrid from '@/components/PixelDisplacementGrid';
import PixelPanel from '@/components/PixelPanel';
import ShopHero from '@/components/shop/ShopHero';

const displacements = [
  { row: 0, col: 0, displaceX: -1, displaceY: -1 },
  { row: 0, col: 3, displaceX: 0, displaceY: -1 },
  { row: 1, col: 0, displaceX: -2, displaceY: 0 },
  { row: 7, col: 0, displaceX: -1, displaceY: 2 },
  { row: 7, col: 2, displaceX: 2, displaceY: 2 },
];

export default function PixelPerformanceFixture() {
  return (
    <main>
      <div id='pixel-benchmark' style={{ padding: 80, background: 'repeating-linear-gradient(45deg, #224466 0 20px, #668844 20px 40px)' }}>
        <div style={{ position: 'relative', height: 600 }}>
          <PixelDisplacementGrid backgroundColor='#007AFF' holeColor='transparent' displacedPixelColor='#FCC552' pixelSize={40} displacements={displacements} animationDelay={0.15} animationDuration={0.5} />
        </div>
        <PixelPanel color='#FE6A5A' pixelSize={32} displacements={displacements} className='mt-40' >
          <div style={{ height: 480 }}>Measured panel</div>
        </PixelPanel>
      </div>
      <div id='shop-hero-fixture'>
        <ShopHero product={{ id: 'pixel-qa', stripeProductId: '', name: 'Pixel QA collectible', description: 'Local visual fixture — no checkout is exercised.', price: 1200, currency: 'gbp', type: 'physical', category: 'collectibles', image: '/products/midicircuit/app-icon.png', soldOut: true }} />
      </div>
    </main>
  );
}
