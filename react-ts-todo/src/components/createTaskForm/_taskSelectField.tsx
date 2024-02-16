import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, ReactElement } from "react";
import { ISelectField } from "./interfaces/ISelectField";

const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
  const {
    value = "",
    label = "Select Box",
    disabled = false,
    name = "selectbox",
    onChange = (e) => console.log(e),
    items = [{ value: "", label: "" }],
  } = props;

  return (
    <FormControl fullWidth size="small" sx={{ label: { color: "gray" } }}>
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id`}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        {items.map((item, index) => (
          <MenuItem key={item.value + index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskSelectField;
