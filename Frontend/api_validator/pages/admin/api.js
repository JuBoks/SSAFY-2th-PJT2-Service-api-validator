import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Button } from "@mui/material";
import APITable from "@/components/admin/APITable";
import styles from "@/styles/Admin.module.css";
import { GetFavorites, GetUsers } from "@/util/api";
import Loading from "@/components/common/Loading";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/util/auth";
import Router from "next/router";

export default function adminAPI() {
  const [apis, setApis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);

        const getApis = async () => {
          setLoading(true);
          try {
            const response = await GetFavorites(idToken);
            setApis(response.data);
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };

        getApis();
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
        <Nav isAdmin={true} isAdminPage={true} />
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
