import React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";

export default function Main() {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav isAdmin={true} />
        <Box component="main" sx={{ height: "100vh" }}>
          <Toolbar />
          <Grid container sx={{ backgroundColor: "#F9F9F9" }}>
            <Grid item>
              <Box
                item
                width={300}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mt={10}
              >
                <AccountCircle style={{ color: "#6F6F6A", fontSize: 100 }} />
                <Box m={(0, 5)}>
                  <Box display="flex" alignItems="center" height={40}>
                    <EmailIcon style={{ color: "#6F6F6A" }} />
                    <Typography variant="body1" m={(0, 2)}>
                      jek9412@naver.com
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" height={40}>
                    <ApartmentIcon style={{ color: "#6F6F6A" }} />
                    <Typography variant="body1" m={(0, 2)}>
                      Client Developer
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" height={40}>
                    <PersonIcon style={{ color: "#6F6F6A" }} />
                    <Typography variant="body1" m={(0, 2)}>
                      Admin
                    </Typography>
                  </Box>
                </Box>
                <Button size="large" variant="outlined">
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <AccountCircle style={{ color: "#6F6F6A", fontSize: 100 }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
