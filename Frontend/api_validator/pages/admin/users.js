import * as React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button, TextField, Autocomplete } from "@mui/material";

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
            <Grid item xs={4}>
              <Typography variant="body1" component="body1" m={(0, 5)}>
                Total : 100
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={({ label: "Name", id: 1 }, { label: "email", id: 2 })}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              />
              <TextField id="searchBar" variant="outlined" />
              <Button variant="contained">Search</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
