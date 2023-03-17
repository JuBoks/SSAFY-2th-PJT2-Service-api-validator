import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button, TextField, Autocomplete } from "@mui/material";
import DenseTable from "@/components/DenseTable.js";

export default function Main() {
  const optionList = [
    { label: "Name", id: 1 },
    { label: "Email", id: 2 },
  ];

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
            <Grid item xs={4}>
              <Typography variant="body1" component="body1" m={(0, 5)}>
                Total : 100
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={optionList}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField label="option" {...params} />
                )}
              />
              <TextField id="searchBar" variant="outlined" />
              <Button variant="contained">Search</Button>
            </Grid>
            <Grid item xs={12}>
              <DenseTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
