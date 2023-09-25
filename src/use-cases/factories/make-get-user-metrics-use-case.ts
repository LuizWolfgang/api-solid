import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"

//automatizar o trabalho de um caso de uso
export function makeGetUserMetricsUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository() //todos os metodos que vou utilizar do banco
    const useCase = new GetUserMetricsUseCase(checkInsRepository) //mandou para a classe todos os meu metodos

    return useCase
}