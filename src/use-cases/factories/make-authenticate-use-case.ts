import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"
import { RegisterUseCase } from "../register"

export function makeAuthenticateUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository() //todos os metodos que vou utilizar do banco
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository) //mandou para a classe todos os meu metodos

    return authenticateUseCase
}