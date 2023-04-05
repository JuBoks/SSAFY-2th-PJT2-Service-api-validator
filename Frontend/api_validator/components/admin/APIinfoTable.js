import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jsonToRow } from "@/util/jsonToRow";
import rowToJson from "@/util/rowToJson";

const createRow = (id, key, value) => {
  return { id, key, value };
};

export default function APIinfoTable(props) {
  const { data, setData } = props;

  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const columns = [
    { field: "key", headerName: "Key", width: 200, sortable: false },
    {
      field: "value",
      headerName: "Value",
      width: 200,
      sortable: false,
    },
  ];

  let dataRow = [];
  let rows = [];
  if (data !== null) {
    dataRow = jsonToRow(data);
    rows = dataRow.map((item, index) => createRow(index, item.key, item.value));
  }

  const handleKeyChange = (e) => setKey(e.target.value);
  const handleValueChange = (e) => setValue(e.target.value);

  const removeRow = () => {
    if (rows.length === 0) return;

    const lastIndex = rows.length - 1;
    dataRow.pop();
    const json = rowToJson(dataRow);
    setData(json);
  };

  const addRow = () => {
    dataRow.push({ key, value });
    //console.log(dataRow);
    const json = rowToJson(dataRow);
    setData(json);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={removeRow}>
          Remove a row
        </Button>
        <Button size="small" onClick={handleClickOpen}>
          Add a row
        </Button>
      </Stack>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add row</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key"
            fullWidth
            variant="standard"
            onChange={handleKeyChange}
          />
          <TextField
            margin="dense"
            label="Value"
            fullWidth
            variant="standard"
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addRow}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
