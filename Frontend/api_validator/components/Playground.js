import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Playground() {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.date,
  };
  const flatProps = {
    options: top100Films.map((option) => option.date),
  };
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      {...defaultProps}
      id="disable-close-on-select"
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Date" variant="standard" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { date: "2023.02.20 13:00:00" },
  { date: "2023.01.02 11:30:00" },
];
