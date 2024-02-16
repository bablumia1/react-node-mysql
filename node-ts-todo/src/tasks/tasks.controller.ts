import { instanceToPlain, plainToInstance } from 'class-transformer'
import { Task } from './tasks.entity'
import { AppDataSource } from '../../index'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { UpdateResult } from 'typeorm'
import { User } from '../auth/auth.entity'

class TasksController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[]

    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        where: { user: req.user },
        order: {
          date: 'ASC',
        },
      })
      allTasks = instanceToPlain(allTasks) as Task[]
      return res.json(allTasks).status(200)
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const { title, description, date, priority, status } = req.body

    const newTask = new Task()
    newTask.title = title
    newTask.description = description
    newTask.date = date
    newTask.priority = priority
    newTask.status = status
    newTask.user = req.user as User

    let createdTask: Task
    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask)
      createdTask = instanceToPlain(createdTask) as Task
      return res.json(createdTask).status(201)
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    let task: Task | null

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      })
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    // If task is not found
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Update task
    let updateTask: UpdateResult
    try {
      updateTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      )
      updateTask = instanceToPlain(updateTask) as UpdateResult
      return res.json(updateTask).status(200)
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export const taskController = new TasksController()
