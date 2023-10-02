import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "../../../use-cases/factories/make-search-gyms-use-case";
import { makeFetchUserCheckInsHistoryUseCase } from "../../../use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  //validaçao dos dados
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1), //trasnformando em numero e o default é igual a 1
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
