import { TaskCounterStatusType } from "../../taskCounter/interfaces/ITaskCounter";
import { ITaskApi } from "../interfaces/ITaskApi";

export const countTasks = (
  tasks: ITaskApi[],
  status: TaskCounterStatusType
): number => {
  if (Array.isArray(tasks)) {
    return tasks.filter((task) => task.status === status).length;
  }
  return 0;
};
