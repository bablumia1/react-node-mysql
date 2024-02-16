import { Grid } from "@mui/material";
import { FC, ReactElement } from "react";
import TaskArea from "../../components/taskArea/TaskArea";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
