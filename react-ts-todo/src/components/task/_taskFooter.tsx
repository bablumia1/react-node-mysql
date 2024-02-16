import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITaskFooter } from "./interfaces/ITaskFooter";
import { Status } from "../createTaskForm/enums/Status";

const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    onClick = (e) => console.log(e),
    onStatusChange = (e) => console.log(e),
    status,
    id,
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            defaultChecked={status === Status.inProgress}
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: "#ffffff" }}
        onClick={(e) => onClick(e, id)}
      >
        Make Completed
      </Button>
    </Box>
  );
};

export default TaskFooter;
