import React, { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TabControl from "@/components/TabControl";
import Playground from "@/components/Playground";
import {GetLogs} from "@/util/api"
import auth from "@/util/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "@/components/common/Loading";

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;
  const [testData, setTestData] = useState(null);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');

  const getDate1 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if(testData[index].created_at === val){
        setIndex1(index);
      }
    }
  }
  const getDate2 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if(testData[index].created_at === val){
        setIndex2(index);
      }
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    onAuthStateChanged(auth, async (user) => {
      // login in
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const getLogs = async () => {
          setLoading(true);
          try {
            const res = await GetLogs(idToken, new Date(0).toISOString(), new Date().toISOString(), id);
            setTestData(res.data.data);
          } catch (error) {
          }
          setLoading(false);
        };
        
        getLogs();
      } 
      // login out
      else {
        router.push("/");
      }
    })
  }, [router.isReady])

  // try{
  //   auth.currentUser.getIdToken(true).then((token) => {
  //     GetLogs(token, new Date(0).toISOString(), new Date().toISOString(), id).then((result) => {
  //       dates.push(...result.data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  //   })
  // } catch{(e) => {
  //   console.log(e);
  // }}

  // const [expanded, setExpanded] = useState("panel1");

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  if (loading) {
    return(<Loading/>)
  }

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
              <Playground 
                testData = {testData}
                getDate= {getDate1}
              />
              <Button variant="outlined">Set Criterion</Button>
              <TabControl
                json = {testData? testData[index1] : {}}
              />
              <Typography variant="h6">Artifacts</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image</Typography>
              <img src="https://picsum.photos/500/300" />
              <Typography variant="body1">- Random Image2</Typography>
            </Box>
            <Box ml={4}>
              <Typography variant="h5">API {id} : Fail</Typography>
              <Playground 
                testData = {testData}
                getDate= {getDate2}
               />
              <Button variant="outlined">Set Criterion</Button>
              <TabControl 
                json = {testData? testData[index2] : {}}
              />
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
