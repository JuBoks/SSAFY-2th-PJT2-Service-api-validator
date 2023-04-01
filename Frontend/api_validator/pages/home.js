import React, { useState, useEffect } from "react";
import Router from "next/router";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid, Paper } from "@mui/material";
import auth from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";
import { GetUsers } from "@/util/api";
import { StackedBarChart } from "@/components/ChartJS/StackedBarChart";
import { PieChart } from "@/components/ChartJS/PieChart";
import styles from "@/styles/Home.module.css";
import { sampleData } from "@/constants/apiTestSample.js";
import { ResultDayData } from "@/constants/apiTestResultSampleDay";
import StickyHeadTable from "@/components/MUI/StickyHeadTable";
import { resultRows, resultColumns } from "@/constants/ResultListSample";

export default function Main() {
  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    // 사용자 권한 체크 이벤트
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(token);

        setState(res.data.state);
        console.log(token);

        if (res.data.state === 0) {
          setIsAuthorize(false);
          alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
          Router.push("/");
        } else if (res.data.state === 1) {
          setIsAuthorize(true);
        } else if (res.data.state === 2) {
          setIsAuthorize(true);
          setIsAdmin(true);
        } else if (res.data.state === 3) {
          setIsAuthorize(true);
          setIsAdmin(true);
        }
      } else {
        setIsAuthorize(false);
        Router.push("/");
      }
    });
  }, []);

  return isAuthorize ? (
    <>
      <Header />
      <Box display="flex" sx={{ backgroundColor: "#F9F9F9" }}>
        <Nav isAdmin={isAdmin} />
        <Box m={3}>
          <Toolbar />
          <Box className={styles["chart-box"]}>
            <Typography variant="h6">Favorite API Chart</Typography>
            <Box display="flex" mt={3}>
              <Paper className={styles["stacked-chart-paper"]} elevation={1}>
                <Box className={styles["stacked-chart"]}>
                  <StackedBarChart data={sampleData} />
                </Box>
              </Paper>
              <Paper className={styles["pie-chart-paper"]} elevation={1}>
                <Box className={styles["pie-chart"]}>
                  <PieChart data={ResultDayData} title="2023.02.30" />
                </Box>
              </Paper>
            </Box>
          </Box>

          <Box className={styles["chart-box"]} mt={5}>
            <Typography variant="h6">APIs Chart</Typography>
            <Box display="flex" mt={3}>
              <Paper className={styles["stacked-chart-paper"]} elevation={1}>
                <Box className={styles["stacked-chart"]}>
                  <StackedBarChart data={sampleData} />
                </Box>
              </Paper>
              <Paper className={styles["pie-chart-paper"]} elevation={1}>
                <Box className={styles["pie-chart"]}>
                  <PieChart data={ResultDayData} title="2023.02.30" />
                </Box>
              </Paper>
            </Box>
          </Box>

          <Box className={styles["chart-box"]} mt={5}>
            <Typography variant="h6">Recent Favorite API Result</Typography>
            <Box mt={3} mb={3}>
              <Paper elevation={1} sx={{ padding: 2 }}>
                <Box display="flex">
                  <Typography variant="subtitle1" mr={3}>
                    Date : 2023.02.28 13:00:00
                  </Typography>
                  <Typography variant="subtitle1" mr={3}>
                    Total : 100
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="green">
                    Pass : 80
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="Red">
                    Fail : 10
                  </Typography>
                  <Typography variant="subtitle1" color="blue">
                    N/E : 10
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <StickyHeadTable columns={resultColumns} rows={resultRows} />
          </Box>

          <Box className={styles["chart-box"]} mt={5}>
            <Typography variant="h6">Recent APIs Result</Typography>
            <Box mt={3} mb={3}>
              <Paper elevation={1} sx={{ padding: 2 }}>
                <Box display="flex">
                  <Typography variant="subtitle1" mr={3}>
                    Date : 2023.02.28 13:00:00
                  </Typography>
                  <Typography variant="subtitle1" mr={3}>
                    Total : 100
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="green">
                    Pass : 80
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="Red">
                    Fail : 10
                  </Typography>
                  <Typography variant="subtitle1" color="blue">
                    N/E : 10
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <StickyHeadTable columns={resultColumns} rows={resultRows} />
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
