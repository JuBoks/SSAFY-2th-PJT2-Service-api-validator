import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
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
  );
}
