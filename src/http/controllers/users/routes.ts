import { FastifyInstance } from 'fastify'
import { register } from './register'

import { verifyJwt } from '../../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.patch('/token/refresh', refresh)
  app.post('/users', register)
  app.post('/sessions', authenticate)
 

  //authenticate
  app.get('/profile', {onRequest: [verifyJwt]}, profile)
}