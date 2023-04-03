import React, { useState, useEffect } from "react";
import Router from "next/router";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid, Paper } from "@mui/material";
import auth from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  GetAlerts,
  GetApisAllTestcase,
  GetFavorites,
  GetLogsGraphAction,
  GetUsers,
} from "@/util/api";
import { StackedBarChart } from "@/components/ChartJS/StackedBarChart";
import { PieChart } from "@/components/ChartJS/PieChart";
import styles from "@/styles/Home.module.css";
import { ResultDayData } from "@/constants/apiTestResultSampleDay";
import { MetadataChart } from "@/components/ChartJS/MetadataChart";
import Loading from "@/components/common/Loading";
import { AllMetadataChart } from "@/components/ChartJS/AllMetadataChart";
import { AllMetadataPieChart } from "@/components/ChartJS/AllMetadataPieChart";
import FavoriteTable from "@/components/favorite/FavoriteTable";
import APIResultTable from "@/components/APIs/APIResultTable";

export default function Main() {
  const now = new Date().toISOString();
  const threeMonthAgo = new Date(
    new Date().setMonth(new Date().getMonth() - 3)
  ).toISOString();

  const [metadatas, setMetadatas] = useState();
  const [favoriteList, setFavoriteList] = useState();
  const [favorites, setFavorites] = useState();
  const [alerts, setAlerts] = useState();

  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getData = async () => {
          setLoading(true);
          const allData = await GetApisAllTestcase(idToken);
          const favoritesData = await GetFavorites(idToken);
          const favoriteList = {};
          favoritesData.data.forEach((item) => {
            favoriteList[item.metadata_meta_id] = item;
          });
          setFavoriteList(favoriteList);

          const response = await GetFavorites(idToken);
          const alertData = (await GetAlerts(idToken)).data;
          const alertList = {};
          alertData.forEach((item) => {
            alertList[item.metadata_meta_id] = item;
          });

          setMetadatas(allData.data);
          setAlerts(alertList);
          setFavorites(response.data);
          setLoading(false);
        };

        getData();

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

  if (loading) return <Loading />;

  return isAuthorize ? (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} />
        <Box width="80%">
          <Toolbar />
          <Box m={1} width="100%" display="flex">
            <Paper className={styles["stacked-chart-paper"]} elevation={1}>
              <AllMetadataChart
                title="All API Chart"
                startTime={threeMonthAgo}
                endTime={now}
              />
            </Paper>
            <Paper className={styles["pie-chart-paper"]} elevation={1}>
              <Box className={styles["pie-chart"]}>
                <AllMetadataPieChart />
              </Box>
            </Paper>
          </Box>

          <Box m={1} width="100%" display="flex">
            <Paper className={styles["stacked-chart-paper"]} elevation={1}>
              <MetadataChart
                title="All API Chart"
                metaId={1}
                startTime={threeMonthAgo}
                endTime={now}
              />
            </Paper>
            <Paper className={styles["pie-chart-paper"]} elevation={1}>
              <Box className={styles["pie-chart"]}>
                <PieChart data={ResultDayData} title="2023.02.30" />
              </Box>
            </Paper>
          </Box>

          <Box m={1} mt={5} width="100%">
            <Typography variant="h5" mb={1}>
              Favorite API
            </Typography>
            <FavoriteTable
              data={favorites}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          </Box>

          <Box m={1} mt={15} width="100%">
            <Typography variant="h5" mb={1}>
              All API
            </Typography>
            <APIResultTable
              data={metadatas}
              favorites={favoriteList}
              setFavorites={setFavoriteList}
            />
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
