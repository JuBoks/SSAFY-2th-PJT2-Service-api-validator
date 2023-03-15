import * as React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
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
                variant="h3"
                component="h3"
                m={(0, 5)}
                sx={{ color: "blue" }}
              >
                User Management
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
