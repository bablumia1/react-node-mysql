import { Box, CircularProgress } from "@mui/material";
import { FC, ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  children: ReactElement;
}

const PrivateRoute: FC<Props> = ({ children }): ReactElement | null => {
  const [cookie, setCookie] = useCookies(["IsAuthenticated"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (!cookie["IsAuthenticated"]) {
        window.location.href = "/login";
        setCookie("IsAuthenticated", false);
      }
    }, 1000);
  }, [cookie, setCookie]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // Render the children only if the authentication check is complete
  return cookie["IsAuthenticated"] ? children : null;
};

export default PrivateRoute;
