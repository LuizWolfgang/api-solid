import { FastifyInstance } from 'fastify'
import { register } from './register'

import { verifyJwt } from '../../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  //authenticate
  app.get('/profile', {onRequest: [verifyJwt]}, profile)
}