import React from "react";
import styles from "@/styles/Admin.module.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { Box, Divider, Toolbar, Typography, TextField } from "@mui/material";
import FreeSoloCreateOptionDialog from "@/components/FreeSoloCreateOptionDialog";
import ComboBox from "@/components/ComboBox";
import { methodList } from "@/constants/methodList";
import { cycleList } from "@/constants/cycleList";
import TabAPIinfo from "@/components/TabAPIinfo";

export default function APIedit() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Nav />
        <Box>
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              API 편집
            </Typography>
            <Typography
              className={styles.text}
              mt={2}
              mb={2}
              variant="subtitle1"
            >
              API를 추가하거나 편집이 가능합니다.
            </Typography>
            <Divider />
            <Box mt={3} display="flex">
              <TextField id="name" label="Name" variant="outlined" />
              <FreeSoloCreateOptionDialog label="Category" />
              <FreeSoloCreateOptionDialog label="Service" />
              <TextField id="path" label="Path" variant="outlined" />
              <ComboBox label="Method" options={methodList} />
              <ComboBox label="Cycle" options={cycleList} />
            </Box>
            <TabAPIinfo />
          </Box>
        </Box>
      </Box>
    </>
  );
}
