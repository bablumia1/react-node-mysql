import { TextField } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITextField } from "../createTaskForm/interfaces/ITextField";

const AuthNameField: FC<ITextField> = (props): ReactElement => {
  const { disabled = false, onChange = (e) => console.log(e) } = props;
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="name"
      label="Enter name"
      name="name"
      type="text"
      autoComplete="name"
      autoFocus
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default AuthNameField;
