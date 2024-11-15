import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding auctions and bids ...')

  const auctions: Prisma.AuctionUncheckedCreateInput[] = [
    {
      id: 1,
      userId: 2,
      title: 'Gourmet Burger',
      description: 'Bid on this delicious gourmet burger with special sauce',
      startingPrice: 10,
      currentPrice: 25,
      endTime: addDays(new Date(), 4),
      bids: {
        create: [
          {
            id: 1,
            userId: 2,
            amount: 15,
          },
          {
            id: 2,
            userId: 3,
            amount: 20,
          },
          {
            id: 3,
            userId: 2,
            amount: 25,
          },
        ],
      },
    },
    {
      id: 2,
      userId: 1,
      title: 'Mechanical Keyboard',
      description: 'High-quality mechanical keyboard with customizable keys',
      startingPrice: 150,
      currentPrice: 350,
      endTime: addDays(new Date(), 5),
      bids: {
        create: [
          {
            id: 4,
            userId: 2,
            amount: 200,
          },
          {
            id: 5,
            userId: 3,
            amount: 350,
          },
        ],
      },
    },
    {
      id: 3,
      userId: 2,
      title: 'Ergonomic Mouse',
      description: 'Ergonomic wireless mouse with high precision',
      startingPrice: 50,
      currentPrice: 130,
      endTime: addDays(new Date(), 6),
      bids: {
        create: [
          {
            id: 6,
            userId: 3,
            amount: 70,
          },
          {
            id: 7,
            userId: 1,
            amount: 100,
          },
          {
            id: 8,
            userId: 3,
            amount: 130,
          },
        ],
      },
    },
    {
      id: 4,
      userId: 3,
      title: 'Gaming Headset',
      description: 'High-fidelity gaming headset with surround sound',
      startingPrice: 100,
      currentPrice: 250,
      endTime: addDays(new Date(), 8),
      bids: {
        create: [
          {
            id: 9,
            userId: 2,
            amount: 150,
          },
          {
            id: 10,
            userId: 1,
            amount: 200,
          },
          {
            id: 11,
            userId: 2,
            amount: 250,
          },
        ],
      },
    },
    {
      id: 5,
      userId: 3,
      title: 'Noise Cancelling Headphones',
      description: 'Premium noise cancelling headphones for immersive sound',
      startingPrice: 200,
      currentPrice: 400,
      endTime: addDays(new Date(), 9),
      bids: {
        create: [
          {
            id: 12,
            userId: 2,
            amount: 250,
          },
          {
            id: 13,
            userId: 1,
            amount: 300,
          },
          {
            id: 14,
            userId: 2,
            amount: 400,
          },
        ],
      },
    },
    {
      id: 6,
      userId: 3,
      title: 'Smartwatch',
      description: 'Latest model smartwatch with health tracking features',
      startingPrice: 180,
      currentPrice: 350,
      endTime: addDays(new Date(), 10),
      bids: {
        create: [
          {
            id: 15,
            userId: 2,
            amount: 200,
          },
          {
            id: 16,
            userId: 1,
            amount: 300,
          },
          {
            id: 17,
            userId: 2,
            amount: 350,
          },
        ],
      },
    },
    {
      id: 7,
      userId: 3,
      title: '4K Monitor',
      description:
        'Ultra HD 4K monitor with vibrant colors and high refresh rate',
      startingPrice: 300,
      currentPrice: 600,
      endTime: addDays(new Date(), 11),
      bids: {
        create: [
          {
            id: 18,
            userId: 2,
            amount: 400,
          },
          {
            id: 19,
            userId: 1,
            amount: 500,
          },
          {
            id: 20,
            userId: 2,
            amount: 600,
          },
        ],
      },
    },
    {
      id: 8,
      userId: 3,
      title: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality',
      startingPrice: 50,
      currentPrice: 150,
      endTime: addDays(new Date(), 12),
      bids: {
        create: [
          {
            id: 21,
            userId: 2,
            amount: 80,
          },
          {
            id: 22,
            userId: 1,
            amount: 120,
          },
          {
            id: 23,
            userId: 2,
            amount: 150,
          },
        ],
      },
    },
    {
      id: 9,
      userId: 3,
      title: 'Wireless Earbuds',
      description: 'Sweatproof wireless earbuds with long battery life',
      startingPrice: 80,
      currentPrice: 200,
      endTime: addDays(new Date(), 13),
      bids: {
        create: [
          {
            id: 24,
            userId: 2,
            amount: 100,
          },
          {
            id: 25,
            userId: 1,
            amount: 150,
          },
          {
            id: 26,
            userId: 2,
            amount: 200,
          },
        ],
      },
    },
    {
      id: 10,
      userId: 3,
      title: 'Portable Charger',
      description:
        'High-capacity portable charger with fast charging technology',
      startingPrice: 30,
      currentPrice: 80,
      endTime: addDays(new Date(), 14),
      bids: {
        create: [
          {
            id: 27,
            userId: 2,
            amount: 40,
          },
          {
            id: 28,
            userId: 1,
            amount: 60,
          },
          {
            id: 29,
            userId: 2,
            amount: 80,
          },
        ],
      },
    },
    {
      id: 11,
      userId: 3,
      title: 'External SSD',
      description: 'High-speed external SSD with large storage capacity',
      startingPrice: 120,
      currentPrice: 300,
      endTime: addDays(new Date(), 15),
      bids: {
        create: [
          {
            id: 30,
            userId: 2,
            amount: 150,
          },
          {
            id: 31,
            userId: 1,
            amount: 250,
          },
          {
            id: 32,
            userId: 2,
            amount: 300,
          },
        ],
      },
    },
    {
      id: 12,
      userId: 3,
      title: 'Webcam',
      description: '1080p webcam with built-in microphone for video calls',
      startingPrice: 40,
      currentPrice: 100,
      endTime: addDays(new Date(), 16),
      bids: {
        create: [
          {
            id: 33,
            userId: 2,
            amount: 60,
          },
          {
            id: 34,
            userId: 1,
            amount: 80,
          },
          {
            id: 35,
            userId: 2,
            amount: 100,
          },
        ],
      },
    },
    {
      id: 13,
      userId: 3,
      title: 'Wireless Keyboard',
      description: 'Wireless keyboard with quiet keys and long battery life',
      startingPrice: 60,
      currentPrice: 120,
      endTime: addDays(new Date(), 17),
      bids: {
        create: [
          {
            id: 36,
            userId: 2,
            amount: 80,
          },
          {
            id: 37,
            userId: 1,
            amount: 100,
          },
          {
            id: 38,
            userId: 2,
            amount: 120,
          },
        ],
      },
    },
    {
      id: 14,
      userId: 3,
      title: 'Gaming Mouse',
      description: 'High-precision gaming mouse with customizable buttons',
      startingPrice: 70,
      currentPrice: 150,
      endTime: addDays(new Date(), 18),
      bids: {
        create: [
          {
            id: 39,
            userId: 2,
            amount: 90,
          },
          {
            id: 40,
            userId: 1,
            amount: 120,
          },
          {
            id: 41,
            userId: 2,
            amount: 150,
          },
        ],
      },
    },
    {
      id: 15,
      userId: 3,
      title: 'Portable Monitor',
      description:
        'Portable monitor with Full HD resolution and USB-C connectivity',
      startingPrice: 100,
      currentPrice: 200,
      endTime: addDays(new Date(), 19),
      bids: {
        create: [
          {
            id: 42,
            userId: 2,
            amount: 120,
          },
          {
            id: 43,
            userId: 1,
            amount: 160,
          },
          {
            id: 44,
            userId: 2,
            amount: 200,
          },
        ],
      },
    },
    {
      id: 16,
      userId: 3,
      title: 'Smart Thermostat',
      description:
        'Smart thermostat with remote control and energy-saving features',
      startingPrice: 80,
      currentPrice: 150,
      endTime: addDays(new Date(), 20),
      bids: {
        create: [
          {
            id: 45,
            userId: 2,
            amount: 100,
          },
          {
            id: 46,
            userId: 1,
            amount: 120,
          },
          {
            id: 47,
            userId: 2,
            amount: 150,
          },
        ],
      },
    },
    {
      id: 17,
      userId: 3,
      title: 'Wireless Router',
      description: 'High-speed wireless router with advanced security features',
      startingPrice: 60,
      currentPrice: 100,
      endTime: addDays(new Date(), 21),
      bids: {
        create: [
          {
            id: 48,
            userId: 2,
            amount: 80,
          },
          {
            id: 49,
            userId: 1,
            amount: 90,
          },
          {
            id: 50,
            userId: 2,
            amount: 100,
          },
        ],
      },
    },
    {
      id: 18,
      userId: 3,
      title: 'Smart Plug',
      description: 'Smart plug with energy monitoring and voice control',
      startingPrice: 20,
      currentPrice: 50,
      endTime: addDays(new Date(), 22),
      bids: {
        create: [
          {
            id: 51,
            userId: 2,
            amount: 30,
          },
          {
            id: 52,
            userId: 1,
            amount: 40,
          },
          {
            id: 53,
            userId: 2,
            amount: 50,
          },
        ],
      },
    },
    {
      id: 19,
      userId: 3,
      title: 'Smart Scale',
      description: 'Smart scale with body composition analysis and mobile app',
      startingPrice: 30,
      currentPrice: 70,
      endTime: addDays(new Date(), 23),
      bids: {
        create: [
          {
            id: 54,
            userId: 2,
            amount: 40,
          },
          {
            id: 55,
            userId: 1,
            amount: 60,
          },
          {
            id: 56,
            userId: 2,
            amount: 70,
          },
        ],
      },
    },
    {
      id: 20,
      userId: 3,
      title: 'Smart Lock',
      description: 'Smart lock with keyless entry and remote access control',
      startingPrice: 50,
      currentPrice: 100,
      endTime: addDays(new Date(), 24),
      bids: {
        create: [
          {
            id: 57,
            userId: 2,
            amount: 60,
          },
          {
            id: 58,
            userId: 1,
            amount: 80,
          },
          {
            id: 59,
            userId: 2,
            amount: 100,
          },
        ],
      },
    },
  ]

  for (const auction of auctions) {
    await prisma.auction.upsert({
      where: { id: auction.id },
      update: {},
      create: auction,
    })
  }

  function addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days)
    return date
  }
}
