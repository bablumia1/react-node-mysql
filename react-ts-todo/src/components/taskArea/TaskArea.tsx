import { Alert, Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { FC, MouseEvent, ReactElement, useContext, useEffect } from "react";
import TaskCounter from "../taskCounter/TaskCounter";
import Task from "../task/Task";
import { useMutation, useQuery } from "react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import TaskSkeleton from "../task/_taskSkeleton";
import { Status } from "../createTaskForm/enums/Status";
import { IUpdateTask } from "../createTaskForm/interfaces/IUpdateTask";
import { ITaskApi } from "./interfaces/ITaskApi";
import { countTasks } from "./helpers/countTasks";
import { TaskContext } from "../../context";

const TaskArea: FC = (): ReactElement => {
  const taskContext = useContext(TaskContext);

  // fetch tasks
  const { error, isLoading, data, refetch } = useQuery("tasks", async () => {
    return await sendApiRequest<ITaskApi[]>("/tasks", "GET");
  });

  // Update tasks status
  const updateTaskMutaion = useMutation((data: IUpdateTask) =>
    sendApiRequest<IUpdateTask>("/tasks", "PUT", data)
  );

  useEffect(() => {
    refetch();
  }, [taskContext.updated, refetch]);

  useEffect(() => {
    if (updateTaskMutaion.isSuccess) {
      taskContext.toggle();
    }
  }, [updateTaskMutaion.isSuccess, taskContext]);

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    updateTaskMutaion.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    _e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    updateTaskMutaion.mutate({
      id,
      status: Status.completed,
    });
  }

  return (
    <Grid item md={8} px={4}>
      <Box my={4} px={2}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center" }}
          component="h2"
          mb={2}
        >
          Status Of Your Tasks As On {format(new Date(), "PPPP")}
        </Typography>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            count={data ? countTasks(data, Status.todo) : 0}
            status={Status.todo}
          />

          <TaskCounter
            count={data ? countTasks(data, Status.inProgress) : 0}
            status={Status.inProgress}
          />
          <TaskCounter
            count={data ? countTasks(data, Status.completed) : 0}
            status={Status.completed}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" md={8} xs={12}>
          <>
            {error && (
              <Alert severity="error">
                There was an error fetching your tasks. Please try again later.
              </Alert>
            )}
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">You have no tasks.</Alert>
            )}
            {isLoading ? (
              <Box sx={{ width: "100%", marginTop: 2 }}>
                {[...Array(3)].map((_, index) => (
                  <TaskSkeleton key={index} />
                ))}
              </Box>
            ) : (
              Array.isArray(data) &&
              data.map(
                (task) =>
                  task.status !== Status.completed && (
                    <Task
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      date={new Date(task.date)}
                      priority={task.priority}
                      status={task.status}
                      id={task.id}
                      onStatusChange={onStatusChangeHandler}
                      onClick={markCompleteHandler}
                    />
                  )
              )
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskArea;
