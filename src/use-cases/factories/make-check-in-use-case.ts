import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { CheckinUseCase } from "../check-in"

//automatizar o trabalho de um caso de uso
export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository() //todos os metodos que vou utilizar do banco
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckinUseCase(checkInsRepository, gymsRepository) //mandou para a classe todos os meu metodos

    return useCase
}