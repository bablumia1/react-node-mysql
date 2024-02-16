import { Box } from "@mui/material";
import { FC, ReactElement } from "react";
import TaskHeader from "./_taskHeader";
import TaskDescription from "./_taskDescription";
import TaskFooter from "./_taskFooter";
import { ITask } from "./interfaces/Itask";
import { Priority } from "../createTaskForm/enums/Priority";

import { renderPriorityBorderColor } from "./helpers/renderPriorityBorderColor";
import { Status } from "../createTaskForm/enums/Status";

const Task: FC<ITask> = (props): ReactElement => {
  const {
    title = "Task Title",
    date = new Date(),
    description = "Task Description",
    priority = Priority.high,
    status = Status.todo,
    id,
    onClick = (e) => console.log(e),
    onStatusChange = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      width="100%"
      mb={4}
      p={2}
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: "6px",
        border: "1px solid",
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        status={status}
        id={id}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

export default Task;
