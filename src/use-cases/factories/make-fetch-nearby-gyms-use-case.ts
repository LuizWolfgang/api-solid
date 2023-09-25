import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms"


//automatizar o trabalho de um caso de uso
export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new FetchNearbyGymsUseCase(gymsRepository) //mandou para a classe todos os meu metodos

    return useCase
}