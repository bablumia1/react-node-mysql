import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactElement, useContext, useEffect, useState } from "react";
import TaskTitleField from "./_taskTitleField";
import TaskDescriptionField from "./_taskDescriptionField";
import TaskDateField from "./_taskDateField";
import TaskSelectField from "./_taskSelectField";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";
import { useMutation } from "react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateTask } from "../taskArea/interfaces/ICreateTask";
import { TaskContext } from "../../context";

const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Status | undefined>(Status.todo);
  const [priority, setPriority] = useState<Priority | undefined>(
    Priority.normal
  );
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const taskContext = useContext(TaskContext);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest("/tasks", "POST", data)
  );

  const createTaskHandler = () => {
    if (!title || !description || !date || !status || !priority) return;
    const task: ICreateTask = {
      title,
      description,
      date,
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  };

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskContext.toggle();
    }
    const successTimeOut = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(successTimeOut);
    };
  }, [createTaskMutation.isSuccess, taskContext]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: "100%", marginBottom: "10px" }}>
          <AlertTitle>Success</AlertTitle>
          Task has been created successfully
        </Alert>
      )}
      <Typography variant="h6" component="h2" mb={2}>
        Create A Task
      </Typography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          onChange={(e) => setDate(e)}
          value={date}
          disabled={createTaskMutation.isLoading}
        />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          sx={{ width: "100%" }}
        >
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            disabled={createTaskMutation.isLoading}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
            ]}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            disabled={createTaskMutation.isLoading}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={
            createTaskMutation.isLoading ||
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
          onClick={createTaskHandler}
          variant="contained"
          color="primary"
          sx={{ color: "#ffff" }}
        >
          Create Task{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
