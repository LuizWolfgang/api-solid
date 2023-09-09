import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";


let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  //recriando variaveis de memoria antes dos testes
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should to register", async () => {
    const { gym } = await sut.execute({
      title: "Blue fit",
      description: "A sua academia",
      phone: "981662963",
      latitude: -15.673093,
      longitude: -48.088506,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
