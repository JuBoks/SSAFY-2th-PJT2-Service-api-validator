import React, { useEffect, useState } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import {
  Box,
  Typography,
  Toolbar,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import styles from "@/styles/APIs.module.css";
import APIResultTable from "@/components/APIs/APIResultTable";
import { resultRows, resultColumns } from "@/constants/ResultListSample";
import { onAuthStateChanged } from "firebase/auth";
import Router from "next/router";
import auth from "@/util/auth";
import { GetApisAllTestcase, GetUsers } from "@/util/api";
import Loading from "@/components/common/Loading";

export default function APIs() {
  const [metadatas, setMetadatas] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const UserData = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getMetadatas = async () => {
          setLoading(true);
          const response = await GetApisAllTestcase(idToken);
          console.log(response.data);
          setMetadatas(response.data);
          setLoading(false);
        };

        getMetadatas();
      } else {
        Router.push("/");
      }
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Box display="flex" sx={{ backgroundColor: "#F9F9F9" }}>
        <Nav isAdmin={true} />
        <Box width="85%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              APIs
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              API Test 결과를 확인해보세요.
            </Typography>
            <APIResultTable data={metadatas} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
