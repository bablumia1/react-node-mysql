import { TextField } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITextField } from "../createTaskForm/interfaces/ITextField";

const AuthEmailField: FC<ITextField> = (props): ReactElement => {
  const {
    disabled = false,
    onChange = (e) => console.log(e),
    defaultValue,
  } = props;
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      disabled={disabled}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default AuthEmailField;
