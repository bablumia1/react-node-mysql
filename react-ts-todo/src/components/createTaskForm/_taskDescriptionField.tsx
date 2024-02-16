import { TextField } from "@mui/material";
import { FC, ReactElement } from "react";
import { ITextField } from "./interfaces/ITextField";

const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
  const { onChange = (e) => console.log(e), disabled = false } = props;

  return (
    <TextField
      id="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      name="description"
      fullWidth
      multiline
      rows={4}
      disabled={disabled}
      onChange={onChange}
      sx={{ label: { color: "gray" } }}
    />
  );
};

export default TaskDescriptionField;
