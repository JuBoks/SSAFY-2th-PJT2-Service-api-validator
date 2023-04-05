import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box } from "@mui/material";

export default function Playground(props) {
  if (!props.testData) return;
  const defaultProps = {
    options: props.testData ? props.testData : [],
    getOptionLabel: (option) => option.created_at,
  };
  const testData = props.testData.reduce((acc, cur, idx) => {
    acc.push({
      date: cur.created_at,
      result: cur.content.result,
    });
    return acc;
  }, []);
  //console.log(testData);
  const [value, setValue] = React.useState("");
  //console.log(testData.slice(-1));
  return (
    <Autocomplete
      {...defaultProps}
      sx={{ width: 300 }}
      options={testData}
      autoHighlight
      id="disable-close-on-select"
      // defaultValue={props.value}
      // value={props.value}
      onChange={(event, newValue) => {
        //console.log(newValue);
        setValue(newValue);
        if (!newValue) return;
        props.getDate(newValue.date);
      }}
      getOptionLabel={(option) => option.date}
      renderOption={(props, option) => (
        <Box
          component="li"
          backgroundColor={
            !option.result
              ? "rgba(255, 99, 132, 0.2)"
              : "rgba(54, 235, 99, 0.2)"
          }
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.date}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Date" variant="standard" />
      )}
    />
  );
}
