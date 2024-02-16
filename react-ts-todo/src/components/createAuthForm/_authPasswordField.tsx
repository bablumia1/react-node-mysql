import { TextField } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITextField } from "../createTaskForm/interfaces/ITextField";

const AuthPasswordField: FC<ITextField> = (props): ReactElement => {
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
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      disabled={disabled}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default AuthPasswordField;
