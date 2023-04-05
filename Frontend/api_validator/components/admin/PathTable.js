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
  DeleteApisId,
  DeleteCategoriesId,
  DeleteDomainsId,
  GetApis,
  GetCategories,
  GetDomains,
  PatchApisId,
  PatchCategoriesId,
  PatchDomainsId,
  PostApis,
  PostCategories,
  PostDomains,
} from "@/util/api";
import { methodList } from "@/constants/methodList";

function createData(apiId, domainId, method, path) {
  return { apiId, domainId, method, path };
}

export default function PathTable(props) {
  const { data, setData, selectedDomain } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [path, setPath] = useState();
  const [method, setMethod] = useState("");
  const [apiId, setApiId] = useState();
  const [isEdit, setIsEdit] = useState(false);

  let rows = [];

  if (data) {
    rows = data.map((item) =>
      createData(item.api_id, item.domain_id, item.method, item.resources)
    );
  }

  const handlePathChange = (e) => setPath(e.target.value);
  const handleMethodChange = (e) => setMethod(e.target.value);

  const handleAddPathClick = () => {
    setPath("");

    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleAddClick = async () => {
    const idToken = localStorage.getItem("idToken");
    const domainId = selectedDomain.domain_id;

    for (let i = 0; i < 4; i++) {
      await PostApis(idToken, domainId, i, path);
    }

    const response = await GetApis(idToken, domainId);
    setData(response.data.data);
    setOpenDialog(false);
  };

  const handleEditClick = (selectedApiId, selectedPath, selectedMethod) => {
    setApiId(selectedApiId);
    setPath(selectedPath);
    setMethod(selectedMethod);

    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleChangeClick = async (e) => {
    const idToken = localStorage.getItem("idToken");
    const domainId = selectedDomain.domain_id;
    await PatchApisId(idToken, apiId, domainId, method, path);

    const response = await GetApis(idToken, domainId);
    setData(response.data.data);
    setOpenDialog(false);
  };

  const handelDeleteClick = async (apiId) => {
    const idToken = localStorage.getItem("idToken");
    await DeleteApisId(idToken, apiId);
    const response = await GetApis(idToken, apiId);
    setData(response.data.data);
  };

  return (
    <TableContainer component={Paper} sx={{ height: 500 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={handleAddPathClick}>
          Add Path
        </Button>
      </Stack>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Path</TableCell>
            <TableCell>Method</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.apiId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.path}
              </TableCell>
              <TableCell>{methodList[row.method]}</TableCell>
              <TableCell>
                <Box>
                  <Button>
                    <EditIcon
                      onClick={(e) =>
                        handleEditClick(row.apiId, row.path, row.method)
                      }
                      color="disabled"
                    />
                  </Button>
                  <Button onClick={(e) => handelDeleteClick(row.apiId)}>
                    <DeleteIcon color="disabled" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEdit ? "Path 변경" : "Path 생성"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Path"
            fullWidth
            variant="standard"
            value={path}
            onChange={handlePathChange}
          />
          {isEdit ? (
            <TextField
              margin="dense"
              label="method"
              fullWidth
              variant="standard"
              value={methodList[method]}
              onChange={handleMethodChange}
            />
          ) : null}
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
