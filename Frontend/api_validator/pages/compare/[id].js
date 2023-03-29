import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TabControl from "@/components/TabControl";
import Playground from "@/components/Playground";

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
          <Typography variant="h4">API Compare</Typography>
          <Typography variant="body1">
            Category : TV | Service : ssafy.com | Path : /user | Method : GET{" "}
          </Typography>
          <Box display="flex" flexDirection="row" mt={5}>
            <Box mr={4}>
              <Typography variant="h5">API {id} : PASS</Typography>
              <Playground />
              <Button variant="outlined">Set Criterion</Button>
              <TabControl />
              <Typography variant="h6">Artifacts</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image2</Typography>
            </Box>
            <Box ml={4}>
              <Typography variant="h5">API {id} : Fail</Typography>
              <Playground />
              <Button variant="outlined">Set Criterion</Button>
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
