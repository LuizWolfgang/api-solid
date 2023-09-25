import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"


//automatizar o trabalho de um caso de uso
export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new CreateGymUseCase(gymsRepository) //mandou para a classe todos os meu metodos

    return useCase
}