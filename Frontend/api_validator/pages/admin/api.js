import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Button } from "@mui/material";
import APITable from "@/components/admin/APITable";
import styles from "@/styles/Admin.module.css";
import { GetApisAllTestcase, GetUsers } from "@/util/api";
import Loading from "@/components/common/Loading";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/util/auth";

export default function adminAPI() {
  const [apis, setApis] = useState(null);

  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getApis = async () => {
          setLoading(true);
          try {
            const response = await GetApisAllTestcase(idToken);
            setApis(response.data);
          } catch (error) {
            //console.log(error);
          }
          setLoading(false);
        };

        getApis();

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
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} isAdminPage={true} />
        <Box width="80%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              API 관리
            </Typography>
            <APITable data={apis} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
