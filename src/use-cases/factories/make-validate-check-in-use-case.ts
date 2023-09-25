import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

//automatizar o trabalho de um caso de uso
export function makeValidateCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new ValidateCheckInUseCase(checkInsRepository) //mandou para a classe todos os meu metodos

    return useCase
}