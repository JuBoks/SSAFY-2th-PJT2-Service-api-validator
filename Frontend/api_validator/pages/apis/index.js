import React from "react";
import Header from "@/components/Header.js";
import Nav from "@/components/Nav.js";
import {
  Box,
  Typography,
  Toolbar,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import styles from "@/styles/APIs.module.css";
import APIResultTable from "@/components/APIResultTable";
import { resultRows, resultColumns } from "@/constants/ResultListSample";
import { testTimeList } from "@/constants/testTimeSample";

export default function APIs() {
  return (
    <>
      <Header />
      <Box display="flex" sx={{ backgroundColor: "#F9F9F9" }}>
        <Nav isAdmin={true} />
        <Box display="flex" flexDirection="column">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              APIs
            </Typography>
            <Typography className={styles.text} mt={2} variant="subtitle1">
              API Test 결과를 확인해보세요.
            </Typography>
            <Box mt={3} mb={3}>
              <Paper elevation={1} sx={{ padding: 2 }}>
                <Box display="flex">
                  <Typography variant="subtitle1" mr={3}>
                    Date :
                  </Typography>
                  <Autocomplete
                    sx={{ width: 200, marginRight: 3 }}
                    options={testTimeList}
                    value={testTimeList[0]}
                    disableClearable
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                  <Typography variant="subtitle1" mr={3}>
                    Total : 100
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="green">
                    Pass : 80
                  </Typography>
                  <Typography variant="subtitle1" mr={3} color="Red">
                    Fail : 10
                  </Typography>
                  <Typography variant="subtitle1" color="blue">
                    N/E : 10
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <APIResultTable columns={resultColumns} rows={resultRows} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
