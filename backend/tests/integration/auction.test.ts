import {
  createAuction,
  deleteAuction,
  getAuction,
  getAuctions,
  MOCK_AUCTION_STORE_DATA,
  updateAuction,
} from '../utils/auction'
import { loginAsUser } from '../utils/auth'

let userOneToken: string
let userTwoToken: string

beforeAll(async () => {
  userOneToken = (await loginAsUser(1)).token
  userTwoToken = (await loginAsUser(2)).token
})

describe('Create auction testing', () => {
  it('User 1 should be able to create an auction', async () => {
    // -------- Create an auction
    const res = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(res.status).toEqual(201)

    // -------- Get the auction
    const getRes = await getAuction(res.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.title).toEqual('Audi A4')
  })

  it('User 2 should be able to create an auction', async () => {
    // -------- Create an auction
    const res = await createAuction(
      {
        title: 'Audi A1',
        description: 'Good condition',
        startingPrice: 1000,
        endTime: '2024-12-12T12:00:00Z',
      },
      userTwoToken
    )
    expect(res.status).toEqual(201)

    // -------- Get the auction
    const getRes = await getAuction(res.body.data.id, userTwoToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.title).toEqual('Audi A1')
  })
})

describe('Update auction testing', () => {
  it('User 1 should be able to update an auction', async () => {
    // -------- Create an auction
    const createRes = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(createRes.status).toEqual(201)

    // -------- Update the auction
    const updateRes = await updateAuction(
      createRes.body.data.id,
      {
        title: 'Audi A5',
        description: 'Great condition',
      },
      userOneToken
    )
    expect(updateRes.status).toEqual(200)

    // -------- Get the auction
    const getRes = await getAuction(updateRes.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.title).toEqual('Audi A5')
    expect(getRes.body.data.description).toEqual('Great condition')
  })
})

describe('Delete auction testing', () => {
  it('User 1 should be able to delete its auction', async () => {
    // -------- Create an auction
    const createRes = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(createRes.status).toEqual(201)

    // -------- Delete the auction
    const deleteRes = await deleteAuction(createRes.body.data.id, userOneToken)
    expect(deleteRes.status).toEqual(200)

    // -------- Get the auction
    const getRes = await getAuction(createRes.body.data.id, userOneToken)
    expect(getRes.status).toEqual(404)
  })
})

describe('Auction show testing', () => {
  it('User 1 should be able to see an auction', async () => {
    // -------- Create an auction
    const createRes = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(createRes.status).toEqual(201)

    // -------- Get the auction
    const getRes = await getAuction(createRes.body.data.id, userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.title).toEqual(MOCK_AUCTION_STORE_DATA.title)
  })
})

describe('Auction index testing', () => {
  it('User 1 should be able to see all auctions', async () => {
    // -------- Create an auction
    const createRes = await createAuction(MOCK_AUCTION_STORE_DATA, userOneToken)
    expect(createRes.status).toEqual(201)

    // -------- Get all auctions
    const getRes = await getAuctions(userOneToken)
    expect(getRes.status).toEqual(200)
    expect(getRes.body.data.length).toBeGreaterThanOrEqual(1)

    const auction = getRes.body.data.find(
      (auction: any) => auction.id === createRes.body.data.id // eslint-disable-line
    )
    expect(auction).toBeDefined()
  })
})
