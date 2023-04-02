import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TabControl from "@/components/TabControl";
import Playground from "@/components/Playground";
import {GetApisAllTestcaseId, GetLogs, PostMetadatasExpectId} from "@/util/api"
import auth from "@/util/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "@/components/common/Loading";
import { diffString } from "json-diff"
import { ImageList } from "@/util/ImageList";
import Swal from 'sweetalert2';

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;
  const [testData, setTestData] = useState(null);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [diff, setDiff] = useState('');
  const [schemaDiff, setSchemaDiff] = useState('');
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);

  const getDate1 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if(testData[index].created_at === val){
        setIndex1(index);
        jsondiff(testData[index], testData[index2]);
      }
    }
  }
  const getDate2 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if(testData[index].created_at === val){
        setIndex2(index);
        jsondiff(testData[index1], testData[index]);
      }
    }
  }

  const jsondiff = (json1, json2) => {
    if(index1 > -1 && index2 > -1){
      setDiff(diffString(json1.content.response, json2.content.response, {full: true}));
      setSchemaDiff(diffString(json1.content.schema, json2.content.schema, {full: true}));
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
            const metadata = await GetApisAllTestcaseId(idToken, id);
            setMetaData(metadata);
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
  
  if (loading) {
    return(<Loading/>)
  }
  
  function setCriterion(index){
    onAuthStateChanged(auth, async (user) => {
      if(user){
        if(!testData) return;
        const idToken = await auth.currentUser.getIdToken(true);
        const id = testData[index].result_id;
        const response = testData[index].content.response;
        try{
          const metadata = await PostMetadatasExpectId(idToken, id, response);
          Swal.fire({
            title: '성공',
            text: "기준 데이터를 새로 저장하였습니다.",
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch(e){
          Swal.fire({
            title: '실패',
            text: "기준 데이터를 업데이트하지 못했습니다.",
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
      else {
        router.push("/");
      }

    })
  }

  return (
    <Box>
      <Header />
      <Box display="flex" width="80%">
        <Nav />
        <Box component="main" m={5} width="80%">
          <Toolbar />
          <Typography variant="h4">API Compare</Typography>
          <Typography variant="body1">
            Category : {metaData ? metaData.data.category_name : ""} | Service : {metaData ? metaData.data.domain_domain : ""} | Path : {metaData ? metaData.data.api_resources : ""} | Method : {metaData ? metaData.data.api_method == 0? "GET": metaData.data.api_method == 1? "POST" : metaData.data.api_method == 2? "PUT" : "DELETE" : ""}
          </Typography>
          <Box display="flex" flexDirection="row" width="100%" mt={5}>
            <Box mr={4} width="50%">
              <Typography variant="h5">API {id} : {testData && testData[index1] ? !testData[index1].content.result? "PASS" : "FAIL" : ""}</Typography>
              <Playground 
                testData = {testData}
                getDate= {getDate1}
                value = {testData? testData[0]: {}}
              />
              <Button variant="outlined" onClick={() => setCriterion(index1)}>Set Criterion</Button>
              <TabControl
                json = {diff}
                schema = {schemaDiff}
              />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList json = {testData && testData[index1] ? testData[index1].content.response : {}}></ImageList>
            </Box>
            <Box ml={4} width="50%">
              <Typography variant="h5">API {id} : {testData && testData[index2] ? !testData[index2].content.result? "PASS" : "FAIL" : ""}</Typography>
              <Playground 
                testData = {testData}
                getDate= {getDate2}
                value = {testData? testData[0]: {}}
               />
              <Button variant="outlined"onClick={() => setCriterion(index2)}>Set Criterion</Button>
              <TabControl 
                json = {testData && testData[index2] ? diffString(testData[index2].content.response, testData[index2].content.response, {full: true}) : ''}
                schema = {testData && testData[index2] ? diffString(testData[index2].content.schema, testData[index2].content.schema, {full: true}) : ''}
              />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList json = {testData && testData[index2] ? testData[index2].content.response : {}}></ImageList>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
