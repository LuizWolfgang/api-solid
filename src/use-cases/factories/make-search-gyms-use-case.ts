import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { SearchGymsUseCase } from "../search-gyms"

//automatizar o trabalho de um caso de uso
export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new SearchGymsUseCase(gymsRepository) //mandou para a classe todos os meu metodos

    return useCase
}