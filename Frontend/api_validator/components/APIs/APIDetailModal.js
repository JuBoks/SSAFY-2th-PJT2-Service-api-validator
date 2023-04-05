import { Box, Button, Divider, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/APIs.module.css";
import Router from "next/router";
import { MetadataChart } from "../ChartJS/MetadataChart";

export default function APIDetailModal(props) {
  const { openDetail, setOpenDetail, datas } = props;

  const now = new Date().toISOString();
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();
  const threeMonthAgo = new Date(
    new Date().setMonth(new Date().getMonth() - 3)
  ).toISOString();

  return (
    <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
      <Box className={styles["detail-modal"]}>
        <Box m={4}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">API 상세정보</Typography>
            <Button onClick={() => Router.push("/testcases/" + datas.metaId)}>
              {"> More Detail"}
            </Button>
          </Box>
          <Divider />
          <Box display="flex" mb={2}>
            <Box width="40%">
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Name :
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {datas.metadataName}
                </Typography>
              </Box>
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Result :
                </Typography>
                <Typography
                  variant="subtitle1"
                  ml={1}
                  sx={{ fontWeight: "bold" }}
                  color={datas.testResult === "Pass" ? "green" : "red"}
                >
                  {datas.testResult}
                </Typography>
              </Box>
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Date :
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {datas.testDate}
                </Typography>
              </Box>
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Category :
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {datas.category}
                </Typography>
              </Box>
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  url :
                </Typography>
              </Box>
              <Typography variant="subtitle1" ml={1}>
                {datas.domain + datas.path}
              </Typography>
              <Box mt={1} mb={1} display="flex">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Method :
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {datas.method}
                </Typography>
              </Box>
            </Box>
            <Paper
              className={styles["stacked-chart"]}
              width="60%"
              variant="outlined"
            >
              <MetadataChart
                metaId={datas.metaId}
                startTime={threeMonthAgo}
                endTime={now}
              />
            </Paper>
          </Box>

          <Divider />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Header
          </Typography>
          <Paper
            className={styles.paper}
            sx={{ height: 200, padding: 1 }}
            variant="outlined"
          >
            {JSON.stringify(datas.header, null, "\t")}
          </Paper>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Body
          </Typography>
          <Paper
            className={styles.paper}
            variant="outlined"
            sx={{ height: 200, padding: 1 }}
          >
            {JSON.stringify(datas.body, null, "\t")}
          </Paper>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Params
          </Typography>
          <Paper
            className={styles.paper}
            variant="outlined"
            sx={{ height: 200, padding: 1 }}
          >
            {JSON.stringify(datas.params, null, "\t")}
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
}
