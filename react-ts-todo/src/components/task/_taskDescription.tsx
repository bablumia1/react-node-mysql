import { Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITaskDescription } from "./interfaces/ITaskDescription";

const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
  const { description = "Task Description" } = props;
  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

export default TaskDescription;
