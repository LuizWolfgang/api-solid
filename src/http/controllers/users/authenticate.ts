import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );
    return reply
      .setCookie("refreshToken", refreshToken, {
        // enviando pelos cookies evita que o front end tenha acesso, cookie = contexto entre requisicoes ( salva informacoes do usuario, os processos que vc fez na aplicacao, colentando seus dados)
        path: "/", // todo backend pode ler esse valor
        secure: true, // encriptado atraves do https
        sameSite: true, // acessivel somente dentro do mesmo dominio ( site )
        httpOnly: true, // so vai ser acessado aqui pelo backend
      })
      .status(200)
      .send({
        token, //esse token o front end tem acesso
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
