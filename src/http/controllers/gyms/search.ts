import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "../../../use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  //validaçao dos dados
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1), //trasnformando em numero e o default é igual a 1
  });

  const { q, page } = searchGymQuerySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}
