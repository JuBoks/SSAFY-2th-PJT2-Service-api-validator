import React, { useState, useEffect } from "react";
import router from "next/router";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import DenseTable from "@/components/DenseTable.js";
import ProfileInfoUI from "@/components/ProfileInfoUI";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button, Tab, TextField, Autocomplete } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { onAuthStateChanged } from "firebase/auth";
import { GetUsers } from "@/util/api";
import auth from "@/util/auth";
import styles from "@/styles/profile.module.css";

export default function Profile() {
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [idToken, setIdToken] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [state, setState] = useState(0);
  const [pw, setPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [value, setValue] = useState("1");

  const optionList = [
    { label: "Name", id: 1 },
    { label: "Category", id: 2 },
    { label: "Service", id: 3 },
    { label: "Path", id: 4 },
  ];

  useEffect(() => {
    // 사용자 권한 체크 이벤트
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(token);

        setIdToken(token);
        setUid(user.uid);
        setName(user.displayName);
        setEmail(user.email);
        setType(res.data.type);
        setState(res.data.state);

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

  return isAuthorize ? (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} />
        <Box>
          <Toolbar />
          <ProfileInfoUI
            name={name}
            email={email}
            type={type}
            state={state}
            idToken={idToken}
            uid={uid}
          />
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
