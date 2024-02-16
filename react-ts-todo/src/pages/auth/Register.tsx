import { FC, ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateAuthForm from "../../components/createAuthForm/CreateAuthForm";
import AuthEmailField from "../../components/createAuthForm/_authEmailField";
import { Alert, Grid, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import AuthNameField from "../../components/createAuthForm/_authNameField";
import AuthPasswordField from "../../components/createAuthForm/_authPasswordField";
import { useMutation } from "react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateUser } from "../../components/createAuthForm/interfaces/ICreateUser";

const Register: FC = (): ReactElement => {
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const registerMutation = useMutation((data: ICreateUser) =>
    sendApiRequest("/auth/register", "POST", data)
  );

  const handleSubmit = () => {
    if (!name || !email || !password) return;
    const user: ICreateUser = {
      name,
      email,
      password,
    };
    registerMutation.mutate(user);
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setShowSuccess(true);
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
  ]);

  return (
    <CreateAuthForm>
      <Typography component="h1" variant="h5">
        Create an account
      </Typography>

      <Box sx={{ mt: 1 }}>
        {showSuccess && (
          <Alert
            severity="success"
            sx={{ width: "100%", marginBottom: "10px" }}
          >
            Account has been created successfully —{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Login
            </Link>
          </Alert>
        )}

        {showError && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: "10px" }}>
            {errorMessage}
          </Alert>
        )}

        <AuthNameField
          onChange={(e) => setName(e.target.value)}
          disabled={registerMutation.isLoading}
        />
        <AuthEmailField
          onChange={(e) => setEmail(e.target.value)}
          disabled={registerMutation.isLoading}
        />
        <AuthPasswordField
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerMutation.isLoading}
        />
        {registerMutation.isLoading && <LinearProgress />}
        <Button
          disabled={registerMutation.isLoading || !name || !email || !password}
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
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                marginTop: "10px",
              }}
            >
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </CreateAuthForm>
  );
};

export default Register;
