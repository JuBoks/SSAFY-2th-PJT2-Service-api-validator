import React, { useState } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ProfileData from "@/components/ProfileData";
import { width } from "@mui/system";

export default function Main() {
  const [type, setType] = useState(0);
  const handleTypeChange = (props) => setType(props.target.value);
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav isAdmin={true} />
        <Box component="main" sx={{ height: "100vh" }}>
          <Toolbar />
          <Grid container sx={{ backgroundColor: "#F9F9F9" }}>
            <Grid item>
              <ProfileData />
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="100vh"
            >
              <Typography
                component="h1"
                variant="h4"
                style={{ color: "#5A5A5F" }}
              >
                Profile
              </Typography>

              <Box component="form" width={"50%"}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="username"
                  autoFocus
                  autoComplete="given-name"
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="current_password"
                  label="Current Password"
                  type="password"
                  id="current_password"
                  autoComplete="current-password"
                  helperText="6자 이상 입력해주세요."
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="new_password"
                  label="New Password"
                  type="password"
                  id="new_password"
                  autoComplete="password"
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="password"
                />

                <FormControl fullWidth sx={{ mt: "1rem" }}>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-id"
                    name="type"
                    value={type}
                    label="Type"
                    onChange={handleTypeChange}
                  >
                    <MenuItem value={0}>Client Developer</MenuItem>
                    <MenuItem value={1}>Server Developer</MenuItem>
                    <MenuItem value={2}>QA</MenuItem>
                    <MenuItem value={3}>etc</MenuItem>
                  </Select>
                </FormControl>

                <Box display="flex" flexDirection="row">
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
