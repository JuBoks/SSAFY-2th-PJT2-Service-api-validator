import * as React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import BarChart from "@/components/BarChart.js";
import DenseTable from "@/components/DenseTable.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import auth from "../util/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useState, useRef, useLayoutEffect, constructor } from "react";
import router from "next/router";

export default function Main() {
  const url = "http://70.12.246.220:3000";

  const GetUsers = async (userUid) => {
    const res = await axios.get(url + "/users", {
      headers: {
        uid: userUid,
      },
    });

    console.log(res.data);
    if (res.data.state === 0) {
      router.push("/");
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      GetUsers(uid);
    } else {
      console.log("User is Signed Out");
    }
  });

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav />
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
  );
}
