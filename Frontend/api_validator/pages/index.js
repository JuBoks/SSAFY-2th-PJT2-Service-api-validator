import React, { useState } from "react";
import Head from "next/head";
import router from "next/router";
import { Grid, Box, Typography, TextField, Link, Button } from "@mui/material";
import Copyright from "../components/Copyright.js";
import styles from "../styles/login.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../util/auth";
import IndexLogo from "../components/IndexLogo";
import axios from "axios";

import { reauthenticateWithCredential } from "firebase/auth";

export default function Home() {
  const url = "http://70.12.246.220:3000";
  const [userCredential, setUserCredential] = useState("");

  const GetUsers = async (userUid) => {
    const res = await axios.get(url + "/api/users", {
      headers: {
        uid: userUid,
      },
    });
    return res;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
      .then((userCredential) => {
        setUserCredential(userCredential);
        const user = userCredential.user;
        const userUid = userCredential.user.uid;
        console.log(user);
        const userData = GetUsers(userUid);
        console.log(userData);
        alert("Login Success");
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login Fail\n" + errorMessage);
        console.log(error);
      });
  };

  // ----------------------------------
  const user = auth.currentUser;

  // TODO(you): prompt the user to re-provide their sign-in credentials

  return (
    <>
      <Head>
        <title>Samsung API Validator</title>
        <meta name="description" content="samsung API validator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container>
        <Grid item xs={7}>
          <IndexLogo />
        </Grid>
        <Grid item xs={5}>
          <Box className={styles["right-box"]}>
            <Typography
              component="h1"
              variant="h4"
              style={{ color: "#5A5A5F" }}
            >
              Login
            </Typography>

            <Box component="form" width={"50%"} onSubmit={handleSubmit}>
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
              />

              <Link href="#" variant="body1">
                Forgot password?
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid container>
                <Typography component="h1" variant="body1">
                  Not a Member?
                </Typography>

                <Link href="/signUp" variant="body1" mx={2}>
                  {"Create account now"}
                </Link>
              </Grid>

              <Copyright my={2} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
