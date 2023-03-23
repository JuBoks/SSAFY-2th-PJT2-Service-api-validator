import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { GetUsers, PatchUsers } from "@/util/api";
import auth from "@/util/auth";
import styles from "@/styles/profile.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Router from "next/router";

export default function Main() {
  const [isAuthorize, setIsAuthorize] = useState(true);
  const [uid, setUid] = useState("");
  const [idToken, setIdToken] = useState("");
  const [type, setType] = useState(0);
  const [state, setState] = useState(0);
  const [newPw, setNewPw] = useState("");
  const [newPwMsg, setNewPwMsg] = useState("");
  const [confirmPwMsg, setConfirmPwMsg] = useState("");
  const [isPwError, setIsPwError] = useState(false);
  const [isMatchError, setIsMatchError] = useState(false);

  const handleNewPwChange = (props) => {
    const newPw = props.target.value;
    setNewPw(newPw);
    if (newPw.length < 6) {
      setIsPwError(true);
      setNewPwMsg("6자 이상 입력해주세요.");
    } else {
      setIsPwError(false);
      setNewPwMsg("");
    }
  };
  const handleConfirmPwChange = (props) => {
    const confirmPw = props.target.value;
    if (newPw !== confirmPw) {
      setIsMatchError(true);
      setConfirmPwMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setIsMatchError(false);
      setConfirmPwMsg("");
    }
  };
  const handleTypeChange = (props) => setType(props.target.value);
  const handleBackClick = () => {
    Router.push("/profile");
  };
  const handleUpdateClick = async () => {
    if (isPwError || isMatchError) {
      alert("다시 입력해주세요.");
      return;
    }
    try {
      const user = auth.currentUser;
      await updatePassword(user, newPw);
      await PatchUsers(idToken, uid, state, type);
      Router.push("/profile");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        setUid(user.uid);
        setType(res.data.type);
        setState(res.data.state);
        setIdToken(idToken);

        if (res.data.state !== 0) {
          setIsAuthorize(true);
        } else {
          alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
        }
      } else {
        alert("로그인이 필요합니다.");
        Router.push("/");
      }
    });
  }, []);

  return isAuthorize ? (
    <Box>
      <Header />
      <Box display="flex">
        <Nav isAdmin={true} />
        <Box className={styles.edit}>
          <Toolbar />
          <Box className={styles.main}>
            <Box display="flex">
              <Button className={styles.text} onClick={handleBackClick}>
                <ArrowBackIcon />
              </Button>
              <Typography variant="h4" className={styles.text}>
                Profile 변경
              </Typography>
            </Box>

            <Typography variant="subtitle1" className={styles.text}>
              Type 또는 비밀번호를 변경하세요.
            </Typography>

            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <FormControl fullWidth>
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

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="new_password"
                  label="New Password"
                  type="password"
                  id="new_password"
                  autoComplete="password"
                  error={isPwError}
                  onChange={handleNewPwChange}
                  helperText={newPwMsg}
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
                  error={isMatchError}
                  onChange={handleConfirmPwChange}
                  helperText={confirmPwMsg}
                />

                <Box display="flex" flexDirection="row-reverse" mt={3}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleUpdateClick}
                  >
                    프로필 변경
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
}
