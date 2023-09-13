import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
        title: "evolve",
        description: "A sua academia",
        phone: "981662963",
        latitude: -15.673093,
        longitude: -48.088506,
    })

    await gymsRepository.create({
        title: "Blue fit",
        description: "A sua academia",
        phone: "981662963",
        latitude: -15.673093,
        longitude: -48.088506,
    })

    const { gyms } = await sut.execute({
      query: "evolve",
      page: 1,
    })
    
    expect(gyms).toEqual([
        expect.objectContaining({ title: "evolve"})
    ]);


//   it('should be able to fetch paginated check-in history', async () => {
//     for (let i = 1; i <= 22; i++) {
//       await checkInsRepository.create({
//         gym_id: `gym-${i}`,
//         user_id: 'user-01',
//       })
//     }

//     const { checkIns } = await sut.execute({
//       userId: 'user-01',
//       page: 2,
//     })

//     expect(checkIns).toHaveLength(2)
//     expect(checkIns).toEqual([
//       expect.objectContaining({ gym_id: 'gym-21' }),
//       expect.objectContaining({ gym_id: 'gym-22' }),
//     ])
  })
})
