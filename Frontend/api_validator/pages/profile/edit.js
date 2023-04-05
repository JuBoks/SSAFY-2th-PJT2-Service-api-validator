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
import {
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GetUsers, PatchUsers } from "@/util/api";
import auth from "@/util/auth";
import styles from "@/styles/profile.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Router from "next/router";

export default function Main() {
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [uid, setUid] = useState("");
  const [idToken, setIdToken] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [state, setState] = useState(0);
  const [pw, setPw] = useState("");
  const [newPw, setNewPw] = useState("");

  const [pwMsg, setPwMsg] = useState("");
  const [newPwMsg, setNewPwMsg] = useState("");
  const [confirmPwMsg, setConfirmPwMsg] = useState("");

  const [isPwError, setIsPwError] = useState(false);
  const [isNewPwError, setIsNewPwError] = useState(false);
  const [isMatchError, setIsMatchError] = useState(false);

  // pw 값 변경 이벤트
  const handlePwChange = (props) => {
    const pw = props.target.value;
    setPw(pw);
  };

  // newPw 값 변경 이벤트
  const handleNewPwChange = (props) => {
    const newPw = props.target.value;
    setNewPw(newPw);
    if (newPw.length < 6) {
      setIsNewPwError(true);
      setNewPwMsg("6자 이상 입력해주세요.");
    } else {
      setIsNewPwError(false);
      setNewPwMsg("");
    }
  };

  // confirmPw 값 변경 이벤트
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

  // Type 값 변경 이벤트
  const handleTypeChange = (props) => setType(props.target.value);

  // 뒤로가기 버튼 클릭 이벤트
  const handleBackClick = () => {
    Router.push("/profile");
  };

  // Type 변경 버튼 클릭 이벤트
  const handleTypeChangeClick = async () => {
    try {
      const user = auth.currentUser;
      await PatchUsers(idToken, uid, null, type);
      alert("정상적으로 변경되었습니다.");
      Router.push("/profile");
    } catch (error) {
      // console.log(error.code);
      alert(error.code);
    }
  };

  // 비밀전호 변경 버튼 클릭 이벤트
  const handlePwChangeClick = async () => {
    if (isNewPwError || isMatchError) {
      alert("다시 입력해주세요.");
      return;
    }

    try {
      const user = auth.currentUser;
      await signInWithEmailAndPassword(auth, email, pw);
      await updatePassword(user, newPw);

      alert("비밀번호가 정상적으로 변경되었습니다. 다시 로그인해주세요.");
      Router.push("/");
    } catch (error) {
      // console.log(error);
      if (error.code === "auth/wrong-password") {
        setIsPwError(true);
        setPwMsg("비밀번호가 맞지 않습니다.");
      }
    }
  };

  useEffect(() => {
    // 사용자 권한 체크 이벤트
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);

        setIdToken(idToken);
        setUid(user.uid);
        setEmail(user.email);
        setState(res.data.state);
        setType(res.data.type);

        if (res.data.state === 0) {
          setIsAuthorize(false);
          setIsAdmin(false);
          alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
          Router.push("/");
        } else if (res.data.state === 1) {
          setIsAuthorize(true);
          setIsAdmin(false);
        } else if (res.data.state === 2) {
          setIsAuthorize(true);
          setIsAdmin(true);
        } else if (res.data.state === 3) {
          setIsAuthorize(true);
          setIsAdmin(true);
        }
      } else {
        setIsAuthorize(false);
        alert("로그인이 필요합니다.");
        Router.push("/");
      }
    });
  }, []);

  return isAuthorize ? (
    <Box>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} />
        <Box className={styles.edit}>
          <Toolbar />
          <Box className={styles.main}>
            <Box display="flex">
              <Button onClick={handleBackClick}>
                <ArrowBackIcon className={styles.text} />
              </Button>
              <Typography variant="h4" className={styles.text}>
                Profile 변경
              </Typography>
            </Box>

            <Typography variant="subtitle1" className={styles.text}>
              타입 또는 비밀번호를 변경하세요.
            </Typography>

            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <Typography variant="h6" className={styles.text}>
                  타입 변경
                </Typography>

                <FormControl fullWidth margin="normal">
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

                <Box display="flex" flexDirection="row-reverse" mt={3}>
                  <Button variant="contained" onClick={handleTypeChangeClick}>
                    타입 변경
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <Typography variant="h6" className={styles.text}>
                  비밀번호 변경
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="current_password"
                  label="Current Password"
                  type="password"
                  id="Current_password"
                  autoComplete="password"
                  error={isPwError}
                  onChange={handlePwChange}
                  helperText={pwMsg}
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
                  error={isNewPwError}
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
                    onClick={handlePwChangeClick}
                  >
                    비밀번호 변경
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
