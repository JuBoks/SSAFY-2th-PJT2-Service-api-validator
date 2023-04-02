import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
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
import { ImageList } from "@/util/ImageList";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/util/auth";
import {GetApisAllTestcaseId, GetLogs, PostMetadatasExpectId} from "@/util/api"
import Loading from "@/components/common/Loading";
import { diffString } from "json-diff"

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [expanded, setExpanded] = useState("panel1");
  const [index, setIndex] = useState(0);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
            const metadata = await GetApisAllTestcaseId(idToken, id);
            setMetaData(metadata);
            console.log(res.data.data);
          } catch (error) {
            console.log(error.message);
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
  
  if (loading) {
    return(<Loading/>)
  }

  const getDate = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if(testData[index].created_at === val){
        setIndex(index);
      }
    }
  }
  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Nav />
        <Box component="main" m={5} sx={{ height: "100vh" }}>
          <Toolbar />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">API Test Result</Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/compare/" + id)}
            >
              Compare
            </Button>
          </Box>
          <Typography variant="h5">API {id}</Typography>
          <Typography variant="body1">
            Category : {metaData ? metaData.data.category_name : ""} | Service : {metaData ? metaData.data.domain_domain : ""} | Path : {metaData ? metaData.data.api_resources : ""} | Method : {metaData ? metaData.data.api_method == 0? "GET": metaData.data.api_method == 1? "POST" : metaData.data.api_method == 2? "PUT" : "DELETE" : ""}
          </Typography>
          <Playground 
            testData = {testData}
            getDate= {getDate}
            value = {testData? testData[0]: {}}
          />
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
                    <OutlinedCard content={metaData ? metaData.data.metadata_header : ""}/>
                    <Typography variant="h6">Body</Typography>
                    <OutlinedCard content={metaData ? metaData.data.metadata_body : ""} />
                    <Typography variant="h6">Params</Typography>
                    <OutlinedCard content={metaData ? metaData.data.metadata_params : ""}/>
                  </Box>
                  <BarChart />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box mr={4}>
              <Typography variant="h5">API {id} : {testData && testData[index] ? !testData[index].content.result? "PASS" : "FAIL" : ""}</Typography>
              <TabControl 
                json = {testData && testData[index] ? diffString(testData[index].content.response, testData[index].content.response, {full: true}) : ''}
                schema = {testData && testData[index] ? diffString(testData[index].content.schema, testData[index].content.schema, {full: true}) : ''}
              />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList json = {testData && testData[index] ? testData[index].content.response : {}}></ImageList>
            </Box>
            <Box ml={4}>
              <Typography variant="h5">Criterion</Typography>
              <TabControl 
                json = {testData && testData[index] ? diffString(testData[index].content['critic-response'], testData[index].content.response, {full: true}) : ''}
                schema = {testData && testData[index] ? diffString(testData[index].content['critic-schema'], testData[index].content.schema, {full: true}) : ''}
              />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList json = {testData && testData[index] ? testData[index].content['critic-response'] : {}}></ImageList>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
