import { FC, ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface CreateAuthFormProps {
  children: ReactNode;
}

const CreateAuthForm: FC<CreateAuthFormProps> = ({
  children,
}): ReactElement => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default CreateAuthForm;
