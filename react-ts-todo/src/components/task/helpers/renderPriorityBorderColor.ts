import { Priority } from "../../createTaskForm/enums/Priority";

export const renderPriorityBorderColor = (priority: string): string => {
  switch (priority) {
    case Priority.normal:
      return "#808080";

    case Priority.low:
      return "#3498db"; //

    case Priority.high:
      return "error.light";

    default:
      return "#808080";
  }
};
``;
