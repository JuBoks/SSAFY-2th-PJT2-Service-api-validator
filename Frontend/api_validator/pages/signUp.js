import React, { useState } from "react";
import Image from "next/image";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { Link, Button, InputLabel } from "@mui/material";
import { Select, MenuItem, FormControl } from "@mui/material";
import logo from "@/public/images/logo.png";
import Copyright from "@/components/Copyright.js";
import styles from "@/styles/login.module.css";
import axios from "axios";

const SignUp = () => {
  const url = "http://70.12.246.220:3000";
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);

  const handleEmailChange = (props) => setEmail(props.target.value);
  const handleTypeChange = (props) => setType(props.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqData = {
      name: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      type: parseInt(data.get("type")),
    };

    await axios
      .post(url + "/users", reqData)
      .then((res) => {
        console.log(res);
        alert("Sign up Success");
      })
      .catch((error) => {
        console.log(error);
        alert("Sign up Fail\n" + error.response.data.message);
      });
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Box className={styles["left-box"]}>
          <Image
            src={logo}
            style={{ width: "60%", height: "20%" }}
            alt="logo"
          />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box className={styles["right-box"]}>
          <Typography component="h1" variant="h4" style={{ color: "#5A5A5F" }}>
            Create Account
          </Typography>

          <Box component="form" width={"50%"} onSubmit={handleSubmit}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText="6자 이상 입력해주세요."
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="password confirm"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>

            <Grid container>
              <Typography component="h1" variant="body1">
                Already have an account?
              </Typography>

              <Link href="/" variant="body1" mx={2}>
                {"Login now"}
              </Link>
            </Grid>

            <Copyright my={2} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
