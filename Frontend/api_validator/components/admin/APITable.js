import React, { useState } from "react";
import { Box, Button, Typography, Modal, Divider, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import styles from "@/styles/Admin.module.css";
import Router from "next/router";
import { methodList } from "@/constants/methodList";
import { DeleteMetadatasId, GetCategories } from "@/util/api";
import CategoryTable from "./CategoryTable";
import auth from "@/util/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function createdRow(index, id, name, category, domain, path, method, interval) {
  return { index, id, name, category, domain, path, method, interval };
}

function handleNewClick() {
  Router.push("/admin/apiEdit");
}

export default function APITable(props) {
  const { data } = props;

  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [metadataName, setMetadataName] = useState(null);
  const [metadataCategory, setMetadataCategory] = useState(null);
  const [metadataDomain, setMetadataDomain] = useState(null);
  const [metadataResource, setMetadataResource] = useState(null);
  const [metadataMethod, setMetadataMethod] = useState(null);
  const [metadataHeader, setMetadataHeader] = useState(null);
  const [metadataBody, setMetadataBody] = useState(null);
  const [metadataParam, setMetadataParam] = useState(null);
  const [metadataInterval, setMetadataInterval] = useState(null);

  const [categories, setCategories] = useState(null);

  const handleApiDelete = async (e, cellValues) => {
    try {
      const metaId = cellValues.row.id;
      console.log(metaId);
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await DeleteMetadatasId(idToken, metaId);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCategories = async (idToken) => {
    const response = await GetCategories(idToken);
    return response.data.data;
  };

  const handleOpenDetail = (e, cellValues) => {
    const metadata = data[cellValues.row.index];
    const header = JSON.stringify(metadata.metadata_header, null, "\t");
    const body = JSON.stringify(metadata.metadata_body, null, "\t");
    const params = JSON.stringify(metadata.metadata_params, null, "\t");
    setMetadataName(metadata.metadata_name);
    setMetadataCategory(metadata.category_name);
    setMetadataDomain(metadata.domain_domain);
    setMetadataResource(metadata.api_resources);
    setMetadataMethod(methodList[metadata.api_method]);
    setMetadataHeader(header);
    setMetadataBody(body);
    setMetadataParam(params);
    setMetadataInterval(metadata.metadata_cycle_time);
    setOpenDetail(true);
  };
  const handleCloseDetail = () => setOpenDetail(false);

  const handleOpenEdit = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await handleGetCategories(idToken);
    setCategories(response);
    setOpenEdit(true);
  };

  const handleEditClick = (e, cellValues) => {
    navigate("/admin/apiEdit", cellValues);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  let rows = [];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "domain",
      headerName: "Domain",
      width: 250,
    },
    {
      field: "path",
      headerName: "Path",
      width: 250,
    },
    {
      field: "method",
      headerName: "Method",
      width: 100,
    },
    {
      field: "interval",
      headerName: "Cycle",
      width: 100,
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Box>
            <Button
              onClick={(e) => {
                handleOpenDetail(e, cellValues);
              }}
            >
              <ViewListIcon color="disabled" />
            </Button>
            <Button
              onClick={(event) => {
                handleEditClick(e, cellValues);
              }}
            >
              <EditIcon color="disabled" />
            </Button>
            <Button
              onClick={(e) => {
                handleApiDelete(e, cellValues);
              }}
            >
              <DeleteIcon color="disabled" />
            </Button>
          </Box>
        );
      },
    },
  ];

  if (data) {
    rows = data.map((item, index) =>
      createdRow(
        index,
        item.metadata_meta_id,
        item.metadata_name,
        item.category_name,
        item.domain_domain,
        item.api_resources,
        methodList[item.api_method],
        item.metadata_cycle_time
      )
    );
  }

  function CustomToolbar() {
    return (
      <Box>
        <Button onClick={handleOpenEdit}>Category Edit</Button>
        <Button>Service Edit</Button>
        <Button>Path Edit</Button>
        <Button onClick={handleNewClick}>+ New</Button>
      </Box>
    );
  }

  return (
    <Box className={styles.dataGrid}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />

      <Modal open={openDetail} onClose={handleCloseDetail}>
        <Box sx={style}>
          <Typography variant="h6">{metadataName}</Typography>
          <Typography variant="subtitle1" mt={2}>
            Category : {metadataCategory}
          </Typography>
          <Box display="flex" mt={2}>
            <Typography variant="subtitle1" mr={2}>
              {metadataMethod}
            </Typography>
            <Typography variant="subtitle1">
              {metadataDomain}
              {metadataResource}
            </Typography>
          </Box>
          <Typography variant="subtitle1" mt={2}>
            Interval : {metadataInterval}
          </Typography>
          <Divider />
          <Typography variant="h5" mt={2}>
            Header
          </Typography>
          <Paper className={styles.paper}>{metadataHeader}</Paper>
          <Typography variant="h5" mt={2}>
            Body
          </Typography>
          <Paper className={styles.paper}>{metadataBody}</Paper>
          <Typography variant="h5" mt={2}>
            Param
          </Typography>
          <Paper className={styles.paper}>{metadataParam}</Paper>
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={style}>
          <Box>
            <Typography variant="h6">Category 변경</Typography>
            <Divider />
            <CategoryTable data={categories} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
