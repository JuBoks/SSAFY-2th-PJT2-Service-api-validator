import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { methodList } from "@/constants/methodList";
import { Box, Divider, Modal, Typography } from "@mui/material";
import styles from "@/styles/APIs.module.css";

const createRow = (
  index,
  id,
  metadataName,
  categoryName,
  domain,
  path,
  method,
  header,
  body,
  params
) => {
  return {
    index,
    id,
    metadataName,
    categoryName,
    domain,
    path,
    method,
    header,
    body,
    params,
  };
};

export default function APIResultTable(props) {
  const { data } = props;

  const [metadataName, setMetadataName] = useState();

  const [nbRows, setNbRows] = useState(3);
  const [openDetail, setOpenDetail] = useState(false);

  const columns = [
    { field: "index", headerName: "No.", width: 80 },
    { field: "metadataName", headerName: "Name", width: 250 },
    { field: "categoryName", headerName: "Category", width: 250 },
    { field: "domain", headerName: "Domain", width: 250 },
    { field: "path", headerName: "Path", width: 250 },
    { field: "method", headerName: "Method", width: 100 },
  ];

  let rows = [];
  if (data) {
    rows = data.map((item, index) =>
      createRow(
        index + 1,
        item.metadata_meta_id,
        item.metadata_name,
        item.category_name,
        item.domain_domain,
        item.api_resources,
        methodList[item.api_method],
        item.metadata_header,
        item.metadata_body,
        item.metadata_params
      )
    );
  }

  const handleRowClick = (val) => {
    setMetadataName(val.row.metadataName);
    setOpenDetail(true);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          onRowClick={(val) => handleRowClick(val)}
        />
      </div>

      <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
        <Box className={styles["detail-modal"]}>
          <Box>
            <Typography variant="h5">API 상세정보</Typography>
            <Divider />
            <Typography variant="subtitle1">Name : </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
