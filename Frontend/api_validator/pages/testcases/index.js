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
import { GetApisAllTestcase, GetFavorites, GetUsers } from "@/util/api";
import Loading from "@/components/common/Loading";

export default function APIs() {
  const [metadatas, setMetadatas] = useState();
  const [favorites, setFavorites] = useState();

  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getMetadatas = async () => {
          setLoading(true);
          const response = await GetApisAllTestcase(idToken);
          const favoritesData = await GetFavorites(idToken);
          const favoriteList = {};
          favoritesData.data.forEach((item) => {
            favoriteList[item.metadata_meta_id] = item;
          });
          setFavorites(favoriteList);
          setMetadatas(response.data);
          setLoading(false);
        };

        getMetadatas();

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
        Router.push("/");
      }
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} />
        <Box width="85%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              APIs
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              API Test 결과를 확인해보세요.
            </Typography>
            <APIResultTable
              data={metadatas}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
