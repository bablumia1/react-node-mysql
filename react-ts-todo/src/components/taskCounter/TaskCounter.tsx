import { Avatar, Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITaskCounter } from "./interfaces/ITaskCounter";
import { Status } from "../createTaskForm/enums/Status";
import { emitCorrectBorderColor } from "./helpers/emitCorrectBorderColor";
import { emitCorrectLabel } from "./helpers/emitCorrectLabel";

const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { status = Status.todo, count = 0 } = props;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          sx={{
            backgroundColor: "transparent",
            border: "5px solid",
            width: "96px",
            height: "96px",
            marginBottom: "16px",
            borderColor: `${emitCorrectBorderColor(status)}`,
          }}
        >
          <Typography variant="h4" color="#ffffff">
            {count}
          </Typography>
        </Avatar>
        <Typography
          variant="h5"
          fontWeight="bold"
          fontSize="20px"
          color="#ffffff"
        >
          {emitCorrectLabel(status)}
        </Typography>
      </Box>
    </>
  );
};

export default TaskCounter;
