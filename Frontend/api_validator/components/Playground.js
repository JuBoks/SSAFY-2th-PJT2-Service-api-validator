import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Playground(props) {
  if (!props.testData) return;
  const defaultProps = {
    options: props.testData ? props.testData : [],
    getOptionLabel: (option) => option.created_at,
  };
  // console.log(props.dates);
  const flatProps = {
    // options: props.dates.map((option) => option.date),
  };
  const [value, setValue] = React.useState("");
  // console.log(value);

  return (
    <Autocomplete
      {...defaultProps}
      defaultValue={props.value}
      value={props.value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (!newValue) return;
        props.getDate(newValue.created_at);
      }}
      id="disable-close-on-select"
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Date" variant="standard" />
      )}
    />
  );
}
