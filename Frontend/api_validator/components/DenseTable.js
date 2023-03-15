import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(result, name, category, service, path, method) {
  return { result, name, category, service, path, method };
}

const rows = [
  createData("Pass", "v3_21_STG", "TV", "ssafy.com", "/user", "Get"),
  createData("Pass", "v3_22_STG", "TV", "ssafy.com", "/user", "Post"),
  createData("Pass", "v3_23_STG", "TV", "ssafy.com", "/user", "Update"),
  createData("Fail", "v3_24_STG", "Bixby", "bixby.com", "/voice", "Get"),
  createData("Fail", "v3_25_STG", "Bixby", "bixby.com", "/voice", "Post"),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Service</TableCell>
            <TableCell align="center">Path</TableCell>
            <TableCell align="center">Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.result}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.service}</TableCell>
              <TableCell align="center">{row.path}</TableCell>
              <TableCell align="center">{row.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
