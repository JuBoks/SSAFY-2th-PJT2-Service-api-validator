import React, { useEffect, useState } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import {
  Box,
  Typography,
  Toolbar,
} from "@mui/material";
import styles from "@/styles/APIs.module.css";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/util/auth";
import { GetFavorites, GetUsers } from "@/util/api";
import Loading from "@/components/common/Loading";
import FavoriteTable from "@/components/favorite/FavoriteTable";

export default function Favorite() {
  const [favorites, setFavorites] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const UserData = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getFavorites = async () => {
          setLoading(true);
          const response = await GetFavorites(idToken);
          setFavorites(response.data);
          setLoading(false);
        };

        getFavorites();
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
              Favorite API
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              Favorite API Test 결과를 확인해보세요.
            </Typography>
            <FavoriteTable data={favorites}/>
          </Box>
        </Box>
      </Box>
    </>
  );
}
