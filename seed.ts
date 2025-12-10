// This file is for reference as requested in step 3.
// It cannot be executed in the browser environment.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const products = [
    {
      title: 'ProWave Swim Briefs',
      description: 'Hydrodynamic performance swimwear designed for competitive athletes. Chlorine resistant fabric.',
      price: 45.00,
      stock: 12,
      brand: 'Speedster',
      category: 'Swimwear',
      images: ['https://picsum.photos/400/500?random=1'],
      rating: 4.8,
      reviewsCount: 124
    },
    // ... (Typically you would iterate over the 20 items defined in MOCK_PRODUCTS here)
    {
      title: 'Azure Deep Goggles',
      description: 'Anti-fog, UV protection goggles with a wide field of vision.',
      price: 32.50,
      stock: 8,
      brand: 'AquaView',
      category: 'Goggles',
      images: ['https://picsum.photos/400/500?random=2'],
      rating: 4.5,
      reviewsCount: 89
    }
    // Add remaining products...
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    (process as any).exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });