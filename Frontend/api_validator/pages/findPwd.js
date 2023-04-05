import React, { useState } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { Link, Button, InputLabel } from "@mui/material";
import Copyright from "@/components/Copyright.js";
import styles from "@/styles/login.module.css";
import IndexLogo from "@/components/IndexLogo.js";
import auth from "@/util/auth";
import { sendPasswordResetEmail } from "firebase/auth";

const findPwd = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (props) => {
    setEmail(props.target.value);
  };

  const handleResetPwd = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        //console.log(email);
        alert("비밀번호 재설정 이메일을 보냈습니다.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);
        if (errorCode === "auth/invalid-email") {
          alert("유효하지 않은 이메일입니다.");
        } else if (errorCode === "auth/user-not-found") {
          alert("해당 이메일의 아이디가 없습니다.");
        } else {
          alert("비밀번호 재설정 이메일을 보낼 수 없습니다.");
        }
      });
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <IndexLogo />
      </Grid>
      <Grid item xs={5}>
        <Box className={styles.right}>
          <Typography component="h1" variant="h4" className={styles.text}>
            Forgot your password?
          </Typography>

          <Typography
            component="body1"
            variant="body1"
            className={styles.text}
            mb={10}
          >
            Please Enter the email you use to sign in.
          </Typography>

          <Box width={"50%"}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              autoComplete="email"
              onChange={handleEmailChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleResetPwd}
            >
              Request Password Reset
            </Button>

            <Link href="/" variant="body1" underline="none">
              {"Back to Sign in"}
            </Link>

            <Copyright my={2} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default findPwd;
