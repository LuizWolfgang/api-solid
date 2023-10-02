import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  //validaçao dos dados
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().min(6),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();

 const oi =  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  console.log('aaaaaa', oi.gym)

  return reply.status(201).send();
}
