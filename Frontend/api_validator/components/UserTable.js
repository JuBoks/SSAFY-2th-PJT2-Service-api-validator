import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(email, name, uid, type, state) {
  return { email, name, uid, type, state };
}

const rows = [
  createData(
    "seonghwan1031@gmail.com",
    "김성환",
    "FqFtsEXccFPc9y6tNoW0ex6kpfP2",
    "Client Developer",
    "Owner"
  ),
  createData(
    "jek9412@naver.com",
    "정의권",
    "opxjc1CM75bQZ43Sb2mi25KFkcq2",
    "Client Developer",
    "Owner"
  ),
];

export default function UserTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>E-mail</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">UID</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.uid}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
