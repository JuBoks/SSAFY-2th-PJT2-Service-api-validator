import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import {
  DeleteCategoriesId,
  GetCategories,
  PatchCategoriesId,
  PostCategories,
} from "@/util/api";

function createData(id, name, note) {
  return { id, name, note };
}

export default function CategoryTable(props) {
  const { data, setData } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNote, setCategoryNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  let rows = [];

  if (data) {
    rows = data.map((item) =>
      createData(item.category_id, item.name, item.note)
    );
  }

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleCategoryNoteChange = (e) => setCategoryNote(e.target.value);

  const handleAddCategoryClick = () => {
    setCategoryName("");
    setCategoryNote("");

    setIsEdit(false);
    setOpenDialog(true);
  };
  const handleDialogClose = () => setOpenDialog(false);

  const handleAddClick = async () => {
    const idToken = localStorage.getItem("idToken");
    await PostCategories(idToken, categoryName, categoryNote);
    const response = await GetCategories(idToken);
    const categories = response.data.data;
    setData(categories);
    setOpenDialog(false);
  };

  const handleEditClick = (e, row) => {
    setCategoryId(row.id);
    setCategoryName(row.name);
    setCategoryNote(row.note);

    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleChangeClick = async (e) => {
    const idToken = localStorage.getItem("idToken");
    const res = await PatchCategoriesId(
      idToken,
      categoryId,
      categoryName,
      categoryNote
    );
    //console.log(res);
    const response = await GetCategories(idToken);
    const categories = response.data.data;
    setData(categories);
    setOpenDialog(false);
  };

  const handelDeleteClick = async (id, e) => {
    const idToken = localStorage.getItem("idToken");
    await DeleteCategoriesId(idToken, id);
    const response = await GetCategories(idToken);
    const categories = response.data.data;
    setData(categories);
  };

  return (
    <TableContainer component={Paper}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={handleAddCategoryClick}>
          Add Category
        </Button>
      </Stack>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
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
                {row.name}
              </TableCell>
              <TableCell>{row.note}</TableCell>
              <TableCell>
                <Box>
                  <Button>
                    <EditIcon
                      onClick={(e) => handleEditClick(e, row)}
                      color="disabled"
                    />
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

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEdit ? "Category 변경" : "Category 생성"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
          <TextField
            margin="dense"
            label="Note"
            fullWidth
            variant="standard"
            value={categoryNote}
            onChange={handleCategoryNoteChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {isEdit ? (
            <Button onClick={handleChangeClick}>Change</Button>
          ) : (
            <Button onClick={handleAddClick}>Add</Button>
          )}
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
