import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "@/styles/Admin.module.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 90 },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "service",
    headerName: "Service",
    width: 150,
  },
  {
    field: "path",
    headerName: "Path",
    width: 110,
  },
  {
    field: "method",
    headerName: "Method",
    width: 160,
  },
  {
    field: "cycle",
    headerName: "Cycle",
    width: 100,
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    width: 150,
  },
  {
    field: "actions",
    headerName: "",
    width: 150,
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Box>
          <Button
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            <EditIcon color="disabled" />
          </Button>
          <Button
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            <DeleteIcon color="disabled" />
          </Button>
        </Box>
      );
    },
  },
];

function createdRow(
  id,
  name,
  category,
  service,
  path,
  method,
  cycle,
  createdDate
) {
  return { id, name, category, service, path, method, cycle, createdDate };
}

const rows = [
  createdRow(1, "abc1", "TV", "ssafy.com", "/user", "GET", 1, "2023.02.22"),
  createdRow(2, "abc2", "TV", "ssafy.com", "/user", "UPDATE", 2, "2023.02.22"),
  createdRow(3, "abc3", "TV", "ssafy.com", "/user", "POST", 3, "2023.02.22"),
  createdRow(4, "abc4", "TV", "ssafy.com", "/user", "DELETE", 4, "2023.02.22"),
];

function CustomToolbar() {
  return (
    <Box display="flex" flexDirection="row-reverse">
      <Button variant="contained">+ New</Button>
    </Box>
  );
}

export default function APITable() {
  return (
    <Box className={styles.dataGrid}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}
