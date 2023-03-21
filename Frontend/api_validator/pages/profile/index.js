import React, { useState } from "react";
import router from "next/router";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import DenseTable from "@/components/DenseTable.js";
import ProfileData from "@/components/ProfileData";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button, Tab, TextField, Autocomplete } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function Profile() {
  const optionList = [
    { label: "Name", id: 1 },
    { label: "Category", id: 2 },
    { label: "Service", id: 3 },
    { label: "Path", id: 4 },
  ];

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditClick = () => {
    router.push("/profile/edit");
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav isAdmin={true} />
        <Box component="main" sx={{ height: "100vh", width: "100%" }}>
          <Toolbar />
          <Grid container sx={{ backgroundColor: "#F9F9F9" }}>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <ProfileData />
              <Button size="large" variant="outlined" onClick={handleEditClick}>
                Edit Profile
              </Button>
            </Grid>
            <Grid item>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="profileData">
                      <Tab label="Favorite" value="1" />
                      <Tab label="Notification" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Grid container sx={{ width: "100vh" }}>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          component="body1"
                          m={(0, 5)}
                        >
                          Total : 100
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        display="flex"
                        justifyContent="end"
                        p={5}
                      >
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
                  </TabPanel>
                  <TabPanel value="2">
                    <Grid container sx={{ width: "100vh" }}>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          component="body1"
                          m={(0, 5)}
                        >
                          Total : 100
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        display="flex"
                        justifyContent="end"
                        p={5}
                      >
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
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
