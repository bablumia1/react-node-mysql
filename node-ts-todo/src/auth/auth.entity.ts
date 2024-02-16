import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Task } from '../tasks/tasks.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  name!: string

  @Column({ unique: true })
  email!: string

  @Column({ type: 'longtext' })
  password!: string

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}
