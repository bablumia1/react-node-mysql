import { Box, Chip } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITaskHeader } from "./interfaces/ITaskHeader";
import { format } from "date-fns";

const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
  const { title = "Task Title", date = new Date() } = props;
  return (
    <Box display="flex" width="100%" justifyContent="space-between" mb={3}>
      <Box>{title}</Box>
      <Box>
        <Chip variant="outlined" label={format(date, "PPP")} />
      </Box>
    </Box>
  );
};

export default TaskHeader;
