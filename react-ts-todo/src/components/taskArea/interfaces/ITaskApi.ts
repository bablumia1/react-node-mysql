import { Priority } from "../../createTaskForm/enums/Priority";
import { Status } from "../../createTaskForm/enums/Status";

export interface ITaskApi {
  id: string;
  title: string;
  date: string;
  description: string;
  status: `${Status}`;
  priority: `${Priority}`;
}
