import React from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { Box, Toolbar, Typography } from "@mui/material";

export default function APIedit() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Nav />
        <Box>
          <Toolbar />
          <Typography variant="h3">Hello World</Typography>
        </Box>
      </Box>
    </>
  );
}
