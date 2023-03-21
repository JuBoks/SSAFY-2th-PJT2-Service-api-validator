import React from "react";
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
        <Nav isAdmin={true} />
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
                APIs
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" component="body1" ml={5} mr={1}>
                Total : 100
              </Typography>
              <Typography
                variant="body1"
                component="body1"
                color="green"
                ml={1}
                mr={1}
              >
                Pass : 50
              </Typography>
              <Typography
                variant="body1"
                component="body1"
                color="red"
                ml={1}
                mr={1}
              >
                Fail : 50
              </Typography>
            </Grid>
            <Grid item xs={7} display="flex" justifyContent="end" p={5}>
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
            <Grid item xs={12} m={5}>
              <DenseTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
