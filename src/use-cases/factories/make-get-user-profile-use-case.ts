import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"


//automatizar o trabalho de um caso de uso
export function makeGetUserProfileUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository() //todos os metodos que vou utilizar do banco
    const useCase = new GetUserProfileUseCase(prismaUsersRepository) //mandou para a classe todos os meu metodos

    return useCase
}