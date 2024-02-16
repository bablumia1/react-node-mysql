import { Alert, Grid } from "@mui/material";
import { FC, ReactElement } from "react";
import Profile from "../profile/Profile";
import CreateTaskForm from "../createTaskForm/CreateTaskForm";
import { useQuery } from "react-query";
import { IUserApi } from "../createAuthForm/interfaces/IUserApi";
import { sendApiRequest } from "../../helpers/sendApiRequest";

const Sidebar: FC = (): ReactElement => {
  const { error, isLoading, data } = useQuery<IUserApi>("users", async () => {
    return await sendApiRequest<IUserApi>("/auth/profile", "GET");
  });

  return (
    <Grid
      item
      md={4}
      sx={{
        height: "100vh",
        position: "fixed",
        overflow: "auto",
        right: 0,
        top: 0,
        width: "100%",
        backgroundColor: "background.paper",

        "@media (max-width: 960px)": {
          height: "auto",
          position: "static",
          width: "100%",
          marginTop: "64px",
        },
      }}
    >
      <>
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            Something went wrong
          </Alert>
        )}
        {!isLoading && data && <Profile name={data.name} />}
      </>
      <CreateTaskForm />
    </Grid>
  );
};

export default Sidebar;
