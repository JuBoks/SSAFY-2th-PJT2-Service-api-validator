import React, { useState, useEffect } from "react";
import Router from "next/router";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import BarChart from "@/components/BarChart.js";
import DenseTable from "@/components/DenseTable.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import auth from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";
import { GetUsers } from "@/util/api";

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
      <Box sx={{ display: "flex" }}>
        <Nav isAdmin={true} />
        <Box component="main" sx={{ height: "100vh" }}>
          <Toolbar />
          <Grid container sx={{ backgroundColor: "#F9F9F9" }}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h4"
                m={(0, 5)}
                sx={{ color: "blue" }}
              >
                Recent Chart
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <BarChart title="Favorite API" />
            </Grid>
            <Grid item xs={6}>
              <BarChart title="All" />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h4"
                m={(0, 5)}
                sx={{ color: "blue" }}
              >
                Favorite API Test Result
              </Typography>
            </Grid>
            <Grid item xs={12} m={(0, 5)}>
              <DenseTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
