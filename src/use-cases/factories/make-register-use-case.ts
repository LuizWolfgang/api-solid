import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository() //todos os metodos que vou utilizar do banco
    const registerUseCase = new RegisterUseCase(prismaUsersRepository) //mandou para a classe todos os meu metodos

    return registerUseCase
}