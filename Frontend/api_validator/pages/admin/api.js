import React, { useState, useEffect } from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import APITable from "@/components/APITable";
import styles from "@/styles/Admin.module.css";

export default function adminAPI() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={true} isAdminPage={true} />
        <Box>
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              API 관리
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              수많은 API를 쉽게 관리해보세요.
            </Typography>
            <APITable />
          </Box>
        </Box>
      </Box>
    </>
  );
}
