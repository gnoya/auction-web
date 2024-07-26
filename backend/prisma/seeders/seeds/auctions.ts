import { PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding auctions and bids ...')

  await prisma.auction.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: 1,
      title: 'Auction Test 1',
      description: 'Auction Test 1 Description',
      startingPrice: 100,
      currentPrice: 200,
      endTime: new Date('2025-12-17T03:24:00'),
      bids: {
        create: [
          {
            id: 1,
            userId: 2,
            amount: 100,
          },
          {
            id: 2,
            userId: 3,
            amount: 150,
          },
          {
            id: 3,
            userId: 2,
            amount: 200,
          },
        ],
      },
    },
  })

  await prisma.auction.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      userId: 2,
      title: 'Auction Test 2',
      description: 'Auction Test 2 Description',
      startingPrice: 200,
      currentPrice: 300,
      endTime: new Date('2024-12-17T03:24:00'),
      bids: {
        create: [
          {
            id: 4,
            userId: 1,
            amount: 250,
          },
          {
            id: 5,
            userId: 3,
            amount: 300,
          },
        ],
      },
    },
  })

  await prisma.auction.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      userId: 2,
      title: 'Auction Test 3',
      description: 'Auction Test 3 Description',
      startingPrice: 300,
      currentPrice: 450,
      endTime: new Date('2024-07-28T03:24:00'),
      bids: {
        create: [
          {
            id: 6,
            userId: 1,
            amount: 350,
          },
          {
            id: 7,
            userId: 2,
            amount: 400,
          },
          {
            id: 8,
            userId: 1,
            amount: 450,
          },
        ],
      },
    },
  })

  await prisma.auction.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      userId: 3,
      title: 'Auction Test 4',
      description: 'Auction Test 4 Description',
      startingPrice: 500,
      currentPrice: 800,
      endTime: new Date('2022-07-28T03:24:00'),
      bids: {
        create: [
          {
            id: 9,
            userId: 2,
            amount: 600,
          },
          {
            id: 10,
            userId: 1,
            amount: 800,
          },
        ],
      },
    },
  })
}
