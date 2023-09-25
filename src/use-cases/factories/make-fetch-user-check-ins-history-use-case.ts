import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

//automatizar o trabalho de um caso de uso
export function makeFetchUserCheckInsHistoryUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository) //mandou para a classe todos os meu metodos

    return useCase
}