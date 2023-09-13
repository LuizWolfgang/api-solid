import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "A sua academia",
      phone: "981662963",
      latitude: -15.673093,
      longitude: -48.088506,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: "A sua academia",
      phone: "981662963",
      latitude: -15.7336271,
      longitude: -48.2584841,
    });


    const { gyms } = await sut.execute({
        userLatitude: -15.673093,
        userLongitude: -48.088506,
    });

    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);

  });
});
