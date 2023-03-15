import * as React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import BarChart from "@/components/BarChart.js";
import DenseTable from "@/components/DenseTable.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";

export default function Main() {
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
