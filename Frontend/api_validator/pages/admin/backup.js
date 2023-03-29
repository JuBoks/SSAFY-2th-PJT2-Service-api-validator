import React, { useState } from "react";
import styles from "@/styles/Admin.module.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import {
  Box,
  Divider,
  Toolbar,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import FreeSoloCreateOptionDialog from "@/components/MUI/FreeSoloCreateOptionDialog";
import ComboBox from "@/components/ComboBox";
import { methodList } from "@/constants/methodList";
import { cycleList } from "@/constants/cycleList";
import TabAPIinfo from "@/components/TabAPIinfo";

const sampleData = `{
  "title": "abc",
  "star": 5,
  "Category": "Action"
}`;

export default function APIedit() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={true} isAdminPage={true} />
        <Box width="80%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              API 추가/편집
            </Typography>
            <Typography
              className={styles.text}
              mt={2}
              mb={2}
              variant="subtitle1"
            >
              API를 추가하거나 편집이 가능합니다.
            </Typography>
            <Box mt={3} display="flex">
              <TextField id="name" label="Name" variant="outlined" />
              <FreeSoloCreateOptionDialog label="Category" />
              <FreeSoloCreateOptionDialog label="Service" />
              <TextField id="path" label="Path" variant="outlined" />
              <ComboBox label="Method" options={methodList} />
              <ComboBox label="Cycle" options={cycleList} />
            </Box>
            <TabAPIinfo />
            <Box display="flex" flexDirection="row-reverse" m={3}>
              <Button variant="contained">API Test</Button>
            </Box>
            <Divider />
            <Typography className={styles.text} mt={2} mb={2} variant="h5">
              Response
            </Typography>
            <Paper variant="outlined">
              <Typography className={styles.paper}>Hello</Typography>
            </Paper>
            <Box display="flex" flexDirection="row-reverse" m={3}>
              <Button variant="contained">Save</Button>
              <Button variant="contained">Set Standard</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
