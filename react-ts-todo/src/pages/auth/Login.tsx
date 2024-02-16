import { FC, ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateAuthForm from "../../components/createAuthForm/CreateAuthForm";
import AuthEmailField from "../../components/createAuthForm/_authEmailField";
import { Alert, Grid, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import AuthPasswordField from "../../components/createAuthForm/_authPasswordField";
import { useMutation } from "react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateUser } from "../../components/createAuthForm/interfaces/ICreateUser";
import { useCookies } from "react-cookie";

const Login: FC = (): ReactElement => {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [cookie, setCookie] = useCookies(["IsAuthenticated"]);

  const registerMutation = useMutation((data: ICreateUser) =>
    sendApiRequest("/auth/login", "POST", data)
  );

  useEffect(() => {
    if (cookie["IsAuthenticated"]) {
      window.location.href = "/";
    }
  }, [cookie]);

  const handleSubmit = () => {
    const user: ICreateUser = {
      email: email ? email : "test@example.com",
      password: password ? password : "password",
    };
    registerMutation.mutate(user);
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setShowSuccess(true);
      setCookie("IsAuthenticated", true);
      window.location.href = "/";
    }

    if (registerMutation.isError) {
      setShowError(true);
      if (
        registerMutation.error &&
        typeof registerMutation.error === "object" &&
        "message" in registerMutation.error
      ) {
        setErrorMessage(registerMutation.error.message as string);
      } else {
        setErrorMessage("An error occurred");
      }
    }

    const successTimeOut = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    const errorTimeOut = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(successTimeOut);
      clearTimeout(errorTimeOut);
    };
  }, [
    registerMutation.isSuccess,
    registerMutation.isError,
    registerMutation.error,
    setCookie,
  ]);

  return (
    <CreateAuthForm>
      <Typography component="h1" variant="h5">
        Sign in to your account
      </Typography>

      <Box sx={{ mt: 1 }}>
        {showSuccess && (
          <Alert
            severity="success"
            sx={{ width: "100%", marginBottom: "10px" }}
          >
            Login successful
          </Alert>
        )}

        {showError && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: "10px" }}>
            {errorMessage}
          </Alert>
        )}

        <AuthEmailField
          onChange={(e) => setEmail(e.target.value)}
          disabled={registerMutation.isLoading}
          defaultValue="test@example.com"
        />
        <AuthPasswordField
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerMutation.isLoading}
          defaultValue="password"
        />
        {registerMutation.isLoading && <LinearProgress />}
        <Button
          disabled={registerMutation.isLoading}
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "#fff" }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                marginTop: "10px",
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </CreateAuthForm>
  );
};

export default Login;
