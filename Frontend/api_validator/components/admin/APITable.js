import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "@/styles/Admin.module.css";
import { methodList } from "@/constants/methodList";
import {
  DeleteMetadatasId,
  GetApis,
  GetCategories,
  GetDomains,
} from "@/util/api";
import CategoryTable from "./CategoryTable";
import auth from "@/util/auth";
import DomainTable from "./DomainTable";
import PathTable from "./PathTable";

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
  overflow: "scroll",
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
  const [openCategory, setOpenCategory] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [openPath, setOpenPath] = useState(false);

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
  const [domains, setDomains] = useState(null);
  const [paths, setPaths] = useState();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState();

  const getRowClassName = (params) => {
    return styles.rowHover; // CSS 클래스 이름
  };

  const handleApiDelete = async (e, cellValues) => {
    try {
      const metaId = cellValues.row.id;
      //console.log(metaId);
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await DeleteMetadatasId(idToken, metaId);
      location.reload();
    } catch (error) {
      //console.log(error);
    }
  };

  const handleGetCategories = async (idToken) => {
    const response = await GetCategories(idToken);
    return response.data.data;
  };

  const handleOpenDetail = (cellValues) => {
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

  const handleCategoryModalOpen = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await handleGetCategories(idToken);
    setCategories(response);
    setOpenCategory(true);
  };

  const handleEditClick = (e, cellValues) => {
    Router.push({
      pathname: "/admin/apiEdit",
      query: { isEdit: true, id: cellValues.id },
    });
  };

  const handleCategoryModalClose = () => {
    setOpenCategory(false);
  };

  const handleDomainModalOpen = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await handleGetCategories(idToken);
    setCategories(response);
    setDomains(null);
    setOpenDomain(true);
  };
  const handleDomainModalClose = () => setOpenDomain(false);

  const handlePathModalOpen = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await handleGetCategories(idToken);
    setCategories(response);
    setPaths(null);
    setOpenPath(true);
  };

  const handlePathModalClose = () => setOpenPath(false);

  const handleCategoryChange = async (newValue) => {
    const idToken = localStorage.getItem("idToken");
    const response = await GetDomains(idToken, newValue.category_id);
    setSelectedCategory(newValue);
    setDomains(response.data.data);
  };

  const handleDomainChange = async (newValue) => {
    const idToken = localStorage.getItem("idToken");
    const domainId = newValue.domain_id;
    const response = await GetApis(idToken, domainId);
    setSelectedDomain(newValue);
    setPaths(response.data.data);
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
        <Button onClick={handleCategoryModalOpen}>Category Edit</Button>
        <Button onClick={handleDomainModalOpen}>Domain Edit</Button>
        <Button onClick={handlePathModalOpen}>Path Edit</Button>
        <Button onClick={handleNewClick}>+ New API</Button>
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
        onRowClick={(val) => handleOpenDetail(val)}
        autoHeight
        getRowClassName={getRowClassName}
      />

      <Modal open={openDetail} onClose={handleCloseDetail}>
        <Box sx={style}>
          <Typography variant="h5">API 상세정보</Typography>
          <Divider />
          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Name :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metadataName}
            </Typography>
          </Box>
          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Category :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metadataCategory}
            </Typography>
          </Box>
          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              url :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metadataDomain}
              {metadataResource}
            </Typography>
          </Box>
          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Method :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metadataMethod}
            </Typography>
          </Box>
          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Interval :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metadataInterval}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Header
          </Typography>
          <Paper
            className={styles.paper}
            sx={{ height: 200 }}
            variant="outlined"
          >
            {metadataHeader}
          </Paper>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Body
          </Typography>
          <Paper
            className={styles.paper}
            variant="outlined"
            sx={{ height: 200 }}
          >
            {metadataBody}
          </Paper>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Params
          </Typography>
          <Paper
            className={styles.paper}
            variant="outlined"
            sx={{ height: 200 }}
          >
            {metadataParam}
          </Paper>
        </Box>
      </Modal>

      <Modal open={openCategory} onClose={handleCategoryModalClose}>
        <Box sx={style}>
          <Box>
            <Typography variant="h6">Category 변경</Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <CategoryTable data={categories} setData={setCategories} />
          </Box>
        </Box>
      </Modal>

      <Modal open={openDomain} onClose={handleDomainModalClose}>
        <Box sx={style}>
          <Box>
            <Typography variant="h6">Domain 변경</Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box display="flex">
              <Typography vairant="subtitle1">Category : </Typography>
              <Autocomplete
                sx={{ width: 300 }}
                options={categories}
                getOptionLabel={(option) => option.name}
                disableClearable
                onChange={(event, newValue) => handleCategoryChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
                )}
              />
            </Box>
            <DomainTable
              data={domains}
              setData={setDomains}
              selectedCategory={selectedCategory}
            />
          </Box>
        </Box>
      </Modal>

      <Modal open={openPath} onClose={handlePathModalClose}>
        <Box sx={style}>
          <Box>
            <Typography variant="h6">Path 변경</Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box display="flex">
              <Typography vairant="subtitle1">Category : </Typography>
              <Autocomplete
                sx={{ width: 300 }}
                options={categories}
                getOptionLabel={(option) => option.name}
                disableClearable
                onChange={(event, newValue) => handleCategoryChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
                )}
              />
            </Box>
            <Box display="flex">
              <Typography vairant="subtitle1">Domain : </Typography>
              <Autocomplete
                sx={{ width: 300 }}
                options={domains}
                getOptionLabel={(option) => option.domain}
                disableClearable
                onChange={(event, newValue) => handleDomainChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Domain" variant="standard" />
                )}
              />
            </Box>
            <PathTable
              data={paths}
              setData={setPaths}
              selectedDomain={selectedDomain}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
