import * as React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box } from "@mui/material";

export default function Main() {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav />
      </Box>
    </>
  );
}
