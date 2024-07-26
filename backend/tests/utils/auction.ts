import request from 'supertest'
import app from '../../app'

export async function createAuction(
  data: {
    title: string
    description: string
    startingPrice: number
    endTime: string
  },
  token: string
) {
  return await request(app)
    .post('/api/auctions')
    .set('Authorization', `Bearer ${token}`)
    .send(data)
}

export async function updateAuction(
  id: number,
  data: {
    title?: string
    description?: string
  },
  token: string
) {
  return await request(app)
    .put(`/api/auctions/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
}

export async function getAuction(id: number, token: string) {
  return await request(app)
    .get(`/api/auctions/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

export async function getAuctions(token: string) {
  return await request(app)
    .get('/api/auctions')
    .set('Authorization', `Bearer ${token}`)
}

export async function deleteAuction(id: number, token: string) {
  return await request(app)
    .delete(`/api/auctions/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

export async function getAuctionBids(id: number, token: string) {
  return await request(app)
    .get(`/api/auctions/${id}/bids`)
    .set('Authorization', `Bearer ${token}`)
}

export async function placeAuctionBid(
  id: number,
  data: { amount: number },
  token: string
) {
  return await request(app)
    .post(`/api/auctions/${id}/bid`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
}

export const MOCK_AUCTION_STORE_DATA = {
  title: 'Audi A4',
  description: 'Good condition',
  startingPrice: 1000,
  endTime: '2024-12-12T12:00:00Z',
}
