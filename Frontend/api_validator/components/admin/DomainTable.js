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
  DeleteDomainsId,
  GetCategories,
  GetDomains,
  PatchCategoriesId,
  PatchDomainsId,
  PostCategories,
  PostDomains,
} from "@/util/api";

function createData(categoryId, domainId, name, domain) {
  return { categoryId, domainId, name, domain };
}

export default function DomainTable(props) {
  const { data, setData, selectedCategory } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [domainId, setDomainId] = useState();
  const [domainName, setDomainName] = useState("");
  const [domain, setDomain] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  let rows = [];

  if (data) {
    rows = data.map((item) =>
      createData(item.category_id, item.domain_id, item.name, item.domain)
    );
  }

  const handleDomainNameChange = (e) => setDomainName(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);

  const handleAddDomainClick = () => {
    setDomainName("");
    setDomain("");

    setIsEdit(false);
    setOpenDialog(true);
  };
  const handleDialogClose = () => setOpenDialog(false);

  const handleAddClick = async () => {
    const idToken = localStorage.getItem("idToken");
    const categoryId = selectedCategory.category_id;
    await PostDomains(idToken, categoryId, domainName, domain);
    const response = await GetDomains(idToken, categoryId);
    setData(response.data.data);
    setOpenDialog(false);
  };

  const handleEditClick = (selectedDomainId, selectedName, selectedDomain) => {
    setDomainId(selectedDomainId);
    setDomainName(selectedName);
    setDomain(selectedDomain);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleChangeClick = async (e) => {
    const idToken = localStorage.getItem("idToken");
    await PatchDomainsId(
      idToken,
      domainId,
      selectedCategory.category_id,
      domainName,
      domain
    );
    const response = await GetDomains(idToken, selectedCategory.category_id);
    setData(response.data.data);
    setOpenDialog(false);
  };

  const handelDeleteClick = async (domainId, categoryId) => {
    const idToken = localStorage.getItem("idToken");
    await DeleteDomainsId(idToken, domainId);
    const response = await GetDomains(idToken, categoryId);
    setData(response.data.data);
  };

  return (
    <TableContainer component={Paper}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={handleAddDomainClick}>
          Add Domain
        </Button>
      </Stack>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.domainId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.domain}</TableCell>
              <TableCell>
                <Box>
                  <Button>
                    <EditIcon
                      onClick={(e) =>
                        handleEditClick(row.domainId, row.name, row.domain)
                      }
                      color="disabled"
                    />
                  </Button>
                  <Button
                    onClick={(e) =>
                      handelDeleteClick(row.domainId, row.categoryId)
                    }
                  >
                    <DeleteIcon color="disabled" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEdit ? "Domain 변경" : "Domain 생성"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={domainName}
            onChange={handleDomainNameChange}
          />
          <TextField
            margin="dense"
            label="Domain"
            fullWidth
            variant="standard"
            value={domain}
            onChange={handleDomainChange}
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
