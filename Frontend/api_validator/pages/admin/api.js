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
              API Management
            </Typography>
            <APITable />
          </Box>
        </Box>
      </Box>
    </>
  );
}
