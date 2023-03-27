import React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import { Button, TextField, Autocomplete } from "@mui/material";
import DenseTable from "@/components/DenseTable.js";

export default function APIs() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Nav />
        <Box>
          <Toolbar />
          <Typography variant="h5">APIs</Typography>
        </Box>
      </Box>
    </>
  );
}
