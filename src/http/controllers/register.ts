import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '../../use-cases/register'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {

  //validaçao dos dados
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository() //todos os metodos que vou utilizar do banco
    const registerUseCase = new RegisterUseCase(prismaUsersRepository) //mandou para a classe todos os meu metodos
    
    await registerUseCase.execute({
      name,
      email,
      password,
    })

  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(500).send({ message: err.message})
    }
  }

  return reply.status(201).send()
}