import { Router } from 'express'
import { createValidator, updateValidator } from './task.validator'
import { taskController } from './tasks.controller'
import { authenticatedUserMiddleware } from '../auth/authenticatedUserMiddleware'

export const taskRouter: Router = Router()

taskRouter.get('/tasks', authenticatedUserMiddleware, taskController.getAll)
taskRouter.post(
  '/tasks',
  authenticatedUserMiddleware,
  createValidator,
  taskController.create,
)
taskRouter.put(
  '/tasks',
  authenticatedUserMiddleware,
  updateValidator,
  taskController.update,
)
