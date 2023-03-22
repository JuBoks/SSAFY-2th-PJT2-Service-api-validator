import React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import BarChart from "@/components/BarChart.js";
import DenseTable from "@/components/DenseTable.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { useState } from "react";
import router from "next/router";
import auth from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export default function Main() {
  const [isAuthorize, setIsAuthorize] = useState(true);
  const url = "http://70.12.246.220:3000/api";
  const GetUsers = async (idToken) => {
    const res = await axios
      .get(url + "/users", {
        headers: {
          idtoken: idToken,
        },
      })
      .then((res) => console.log(res));

    return res;
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => {
          console.log(idToken);
          console.log(GetUsers(idToken));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("User is Signed Out");
    }
  });

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
