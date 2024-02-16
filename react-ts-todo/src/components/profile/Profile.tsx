import { Avatar, Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

interface IProfile {
  name: string;
}

const Profile: FC<IProfile> = (props): ReactElement => {
  const { name = "John" } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          width: "96px",
          height: "96px",
          backgroundColor: "primary.main",
          marginBottom: "16px",
          marginTop: "16px",
        }}
      >
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {`${name.substring(0, 2)}`}
        </Typography>
      </Avatar>
      <Typography variant="h6" color="text.primary">
        {`Welcome, ${name}`}
      </Typography>
      <Typography variant="body1" color="text.primary">
        This is your personal tasks manager
      </Typography>
    </Box>
  );
};

export default Profile;
