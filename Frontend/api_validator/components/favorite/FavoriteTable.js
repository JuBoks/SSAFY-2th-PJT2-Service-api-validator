import React, { useCallback, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { methodList } from "@/constants/methodList";
import { Box, Button, Divider, Modal, Paper, Typography } from "@mui/material";
import styles from "@/styles/APIs.module.css";
import { DeleteAlertsId, GetLogs, PostAlerts } from "@/util/api";
import { MetadataChart } from "../ChartJS/MetadataChart";
import Router from "next/router";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { GetAlerts } from "@/util/api";
import APIDetailModal from "../APIs/APIDetailModal";

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

export default function FavoriteTable(props) {
  const { data, alerts, setAlerts } = props;

  const now = new Date().toISOString();
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();
  const threeMonthAgo = new Date(
    new Date().setMonth(new Date().getMonth() - 3)
  ).toISOString();

  const getRowClassName = (params) => {
    return styles.rowHover; // CSS 클래스 이름
  };

  const [datas, setDatas] = useState({});
  const [metadataName, setMetadataName] = useState();
  const [testResult, setTestResult] = useState("None");
  const [category, setCategory] = useState();
  const [domain, setDomain] = useState();
  const [path, setPath] = useState();
  const [method, setMethod] = useState();
  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [params, setParams] = useState();
  const [metaId, setMetaId] = useState();
  const [testDate, setTestDate] = useState();

  const [openDetail, setOpenDetail] = useState(false);

  const handleEmail = useCallback((id) => async () => {
    const idToken = localStorage.getItem("idToken");
    if (alerts[id]) {
      await DeleteAlertsId(idToken, id);
      const alertData = (await GetAlerts(idToken)).data;
      const alertList = {};
      alertData.forEach((item) => {
        alertList[item.metadata_meta_id] = item;
      });
      setAlerts(alertList);
    } else {
      await PostAlerts(idToken, [id]);
      const alertData = (await GetAlerts(idToken)).data;
      const alertList = {};
      alertData.forEach((item) => {
        alertList[item.metadata_meta_id] = item;
      });
      setAlerts(alertList);
    }
  });

  const columns = [
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            alerts[params.id] ? (
              <MarkEmailReadIcon color="info" />
            ) : (
              <EmailIcon color="info" />
            )
          }
          label="Email"
          onClick={handleEmail(params.id)}
        />,
      ],
    },
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

  const handleRowClick = async (val) => {
    const idToken = localStorage.getItem("idToken");
    const response = await GetLogs(idToken, yesterday, now, val.row.id);

    const testResults = response.data.data;
    let testResult = "";
    let testDate = "";
    if (testResults.length !== 0) {
      if (testResults[testResults.length - 1].content.result) {
        testResult = "Pass";
        testDate = testResults[testResults.length - 1].created_at;
      } else {
        testResult = "Fail";
        testDate = testResults[testResults.length - 1].created_at;
      }
    }

    const metadataName = val.row.metadataName;
    const category = val.row.categoryName;
    const domain = val.row.domain;
    const path = val.row.path;
    const method = val.row.method;
    const header = val.row.header;
    const body = val.row.body;
    const params = val.row.params;
    const metaId = val.row.id;

    const tmpDatas = {
      metadataName,
      category,
      domain,
      path,
      method,
      header,
      body,
      params,
      metaId,
      testResult,
      testDate,
    };

    setDatas(tmpDatas);
    setOpenDetail(true);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          onRowClick={(val) => handleRowClick(val)}
          initialState={{
            pagination: { paginationModel: { pageSize: 25, page: 0 } },
          }}
          getRowClassName={getRowClassName}
        />
      </div>

      <APIDetailModal
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        datas={datas}
      />
    </div>
  );
}
