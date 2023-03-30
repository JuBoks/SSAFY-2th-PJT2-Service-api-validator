import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { DeleteCategoriesId } from "@/util/api";
import auth from "@/util/auth";

function createData(id, name, note) {
  return { id, name, note };
}

export default function CategoryTable(props) {
  const { data } = props;
  let rows = [];

  if (data) {
    rows = data.map((item) =>
      createData(item.category_id, item.name, item.note)
    );
  }

  const handelDeleteClick = async (id, e) => {
    const idToken = localStorage.getItem("idToken");
    await DeleteCategoriesId(idToken, id);
    location.reload();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Note</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.note}</TableCell>
              <TableCell>
                <Box>
                  <Button>
                    <EditIcon color="disabled" />
                  </Button>
                  <Button onClick={(e) => handelDeleteClick(row.id, e)}>
                    <DeleteIcon color="disabled" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
