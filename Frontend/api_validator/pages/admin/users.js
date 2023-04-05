import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import styles from "@/styles/Admin.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { GetUsers } from "@/util/api";
import auth from "@/util/auth";
import UserTable from "@/components/UserTable";
import { GetUsersAuthorize } from "@/util/api";

export default function AdminUsers() {
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [idToken, setIdToken] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [state, setState] = useState(0);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // 사용자 권한 체크 이벤트
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        const resUsers = await GetUsersAuthorize(idToken);

        setIdToken(idToken);
        setUid(user.uid);
        setName(user.displayName);
        setEmail(user.email);
        setType(res.data.type);
        setState(res.data.state);
        setUserData(resUsers.data);

        if (res.data.state === 0) {
          setIsAuthorize(false);
          alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
          Router.push("/");
        } else if (res.data.state === 1) {
          setIsAuthorize(true);
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
  return isAdmin ? (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} isAdminPage={true} />
        <Box display="flex" flexDirection="column">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              유저 관리
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              유저들의 역할과 권한을 수정할 수 있습니다.
            </Typography>
            <UserTable userData={userData} />
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
