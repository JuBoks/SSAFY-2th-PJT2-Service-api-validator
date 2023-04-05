import React, { useState } from "react";
import router from "next/router";
import {
  Grid,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Link, Button, InputLabel } from "@mui/material";
import { Select, MenuItem, FormControl } from "@mui/material";
import Copyright from "@/components/Copyright.js";
import { PostUsers } from "@/util/api";
import styles from "@/styles/login.module.css";
import IndexLogo from "@/components/IndexLogo.js";
import auth from "../util/auth";
import { GetUsersDuplicateEmail } from "@/util/api";

const SignUp = () => {
  const [type, setType] = useState(0);
  const [pwd, setPwd] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const [isDuplicateEmail, setIsDuplicatedEmail] = useState(false);
  const [isPwdError, setIsPwdError] = useState(false);
  const [isConfirmPwdError, setIsConfirmPwdError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleTypeChange = (props) => setType(props.target.value);

  const handleEmailChange = async (props) => {
    try {
      if (!props.target.value) return;
      const res = await GetUsersDuplicateEmail(props.target.value);
      if (res.data === "Not Available") {
        setIsDuplicatedEmail(true);
        setEmailMsg("사용 불가한 이메일입니다.");
      } else {
        setIsDuplicatedEmail(false);
        setEmailMsg("");
      }
    } catch (err) {
      //console.log(err);
      alert(err);
    }
  };

  const handlePwdChange = (props) => {
    if (!props.target.value) return;
    const cur_pwd = props.target.value;
    setPwd(cur_pwd);

    if (cur_pwd.length < 6) {
      setIsPwdError(true);
      setPwdMsg("6자 이상 입력해주세요.");
    } else {
      setIsPwdError(false);
      setPwdMsg("");
    }
  };

  const handleConfirmPwdChange = (props) => {
    if (!props.target.value) return;
    const confirmPwd = props.target.value;

    if (confirmPwd !== pwd) {
      setIsConfirmPwdError(true);
      setConfirmPwdMsg("비밀번호가 동일하지 않습니다.");
    } else {
      setIsConfirmPwdError(false);
      setConfirmPwdMsg("");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsRegistering(true);

      if (isDuplicateEmail || isPwdError || isConfirmPwdError) {
        alert("다시 입력해주세요.");
        return;
      }

      const data = new FormData(event.target);
      const reqData = {
        name: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        type: parseInt(data.get("type")),
      };

      const res = await PostUsers(reqData);
      alert("회원가입 완료");
      router.push("/");
      setIsRegistering(false);
    } catch (err) {
      //console.log(err);
      alert(err);
      setIsRegistering(false);
    }
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <IndexLogo />
      </Grid>
      <Grid item xs={5}>
        <Box className={styles.right}>
          <Typography component="h1" variant="h4" className={styles.text}>
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
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              error={isDuplicateEmail}
              helperText={emailMsg}
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
              error={isPwdError}
              helperText={pwdMsg}
              onChange={handlePwdChange}
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
              error={isConfirmPwdError}
              helperText={confirmPwdMsg}
              onChange={handleConfirmPwdChange}
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
              {isRegistering ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            <Grid container>
              <Typography component="h1" variant="body1">
                Already have an account?
              </Typography>

              <Link href="/" variant="body1" mx={2} underline="none">
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
