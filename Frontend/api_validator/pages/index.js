import React, { useState } from "react";
import router from "next/router";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import Copyright from "../components/Copyright.js";
import styles from "../styles/login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../util/auth";
import IndexLogo from "../components/IndexLogo";
import { GetUsers } from "@/util/api.js";

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoggingIn(true);
      const data = new FormData(event.currentTarget);
      const res = await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
      const idToken = await auth.currentUser.getIdToken(true);
      const userData = await GetUsers(idToken);

      const userState = userData.data.state;
      if (userState === 0) {
        alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
      } else {
        router.push("/home");
      }
      setIsLoggingIn(false);
    } catch (err) {
      setIsError(true);
      setErrorMsg("아이디 또는 비밀번호를 잘못 입력했습니다.");
      //console.log(err);
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <IndexLogo />
        </Grid>
        <Grid item xs={5}>
          <Box className={styles.right}>
            <Typography component="h1" variant="h4" className={styles.text}>
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
                error={isError}
                helperText={errorMsg}
              />

              <Link href="/findPwd" variant="body1" underline="none">
                Forgot password?
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoggingIn ? <CircularProgress color="inherit" /> : "Login"}
              </Button>

              <Grid container>
                <Typography component="h1" variant="body1">
                  Not a Member?
                </Typography>

                <Link href="/signUp" variant="body1" mx={2} underline="none">
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
