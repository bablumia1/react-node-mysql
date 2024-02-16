import { ThemeProvider } from "@emotion/react";
import { FC, ReactElement } from "react";
import { customTheme } from "./theme/customTheme";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import ComposeContext from "./context/Compose.context";
import { rootContext } from "./context/root.context";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <CookiesProvider>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </CookiesProvider>
      </ComposeContext>
    </QueryClientProvider>
  );
};

export default App;
