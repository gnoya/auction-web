import {
  createAuction,
  getAuction,
  getAuctionBids,
  MOCK_AUCTION_STORE_DATA,
  placeAuctionBid,
} from '../utils/auction'
import { loginAsUser } from '../utils/auth'

let userOneToken: string
let userTwoToken: string

beforeAll(async () => {
  userOneToken = (await loginAsUser(1)).token
  userTwoToken = (await loginAsUser(2)).token
})

describe('Get auction bids testing', () => {
  it('User 1 should be able to get auction bids', async () => {
    // -------- Create an auction
    const res = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(res.status).toEqual(201)

    // -------- Get the auction bids
    const getRes = await getAuctionBids(res.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data).toEqual([])
  })
})

describe('Post auction bid testing', () => {
  it('User 1 should be able to post auction bid', async () => {
    // -------- Create an auction
    const res = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(res.status).toEqual(201)

    // -------- Post auction bid
    const postRes = await placeAuctionBid(
      res.body.data.id,
      { amount: 1200 },
      userTwoToken
    )
    expect(postRes.status).toEqual(201)

    // -------- Get the auction bids
    const getRes = await getAuctionBids(res.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.length).toEqual(1)
    expect(getRes.body.data[0].amount).toEqual(1200)
  })

  it('Posting auction bid with price lower than actual price returns 400 and no bid should be created', async () => {
    // -------- Create an auction
    const res = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(res.status).toEqual(201)

    // -------- Post auction bid
    const postRes = await placeAuctionBid(
      res.body.data.id,
      { amount: 600 },
      userTwoToken
    )
    expect(postRes.status).toEqual(400)

    // -------- Get the auction bids
    const getRes = await getAuctionBids(res.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.length).toEqual(0)
  })

  it('Biding should update currentPrice', async () => {
    // -------- Create an auction
    const res = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(res.status).toEqual(201)

    // -------- Post auction bid
    const postRes = await placeAuctionBid(
      res.body.data.id,
      { amount: 1200 },
      userTwoToken
    )
    expect(postRes.status).toEqual(201)

    // -------- Get the auction
    const getRes = await getAuction(res.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.currentPrice).toEqual(1200)
  })
})
