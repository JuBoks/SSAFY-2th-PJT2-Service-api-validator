import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../Header";
import Nav from "../Nav";

export default function Loading() {
  return (
    <>
      <Header />
      <Box>
        <Nav />
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress />
          <Typography variant="subtitle1">loading...</Typography>
        </Box>
      </Box>
    </>
  );
}
