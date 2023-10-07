import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../../middlewares/verify-jwt";
import { create } from "./create";
import { history } from "./history";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { verifyUserRole } from "../../../middlewares/verify-user-role";


export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt); // todas as rotas daqui pra baixo, é necessario esta autenticado

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', {onRequest: [verifyUserRole('ADMIN')]}, validate)
}
