import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Nav from "@/components/Nav";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BarChart from "@/components/BarChart";
import TabControl from "@/components/TabControl";
import Playground from "@/components/Playground";
import OutlinedCard from "@/components/OutlinedCard";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav />
        <Box component="main" m={5} sx={{ height: "100vh" }}>
          <Toolbar />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">API Result</Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/apis/compare/" + id)}
            >
              Compare
            </Button>
          </Box>
          <Typography variant="h5">API {id}</Typography>
          <Typography variant="body1">
            Category : TV | Service : ssafy.com | Path : /user | Method : GET{" "}
          </Typography>
          <Playground />
          <Box mt={5} mb={5}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={
                  <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                }
              >
                <Typography>Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="row" m={3}>
                  <Box>
                    <Typography variant="h6">Header</Typography>
                    <OutlinedCard />
                    <Typography variant="h6">Body</Typography>
                    <OutlinedCard />
                    <Typography variant="h6">Params</Typography>
                    <OutlinedCard />
                  </Box>
                  <BarChart />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box mr={4}>
              <Typography variant="h5">API {id} : PASS</Typography>
              <TabControl />
              <Typography variant="h6">Artifacts</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image2</Typography>
            </Box>
            <Box ml={4}>
              <Typography variant="h5">Criterion</Typography>
              <TabControl />
              <Typography variant="h6">Artifacts</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image2</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
