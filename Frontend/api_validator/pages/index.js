import Head from "next/head";
import Image from "next/image";
import { Grid, Box, Typography, TextField, Link, Button } from "@mui/material";
import logo from "@/public/images/logo.png";
import Copyright from "@/components/Copyright.js";
import styles from "@/styles/login.module.css";
import axios from "axios";

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    await axios
      .post(url + "/users/login", reqData)
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
    <>
      <Head>
        <title>Samsung API Validator</title>
        <meta name="description" content="samsung API validator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
