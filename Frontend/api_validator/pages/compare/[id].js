import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TabControl from "@/components/TabControl";
import Playground from "@/components/Playground";
import {
  GetApisAllTestcaseId,
  GetLogs,
  GetUsers,
  PostMetadatasExpectId,
} from "@/util/api";
import auth from "@/util/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "@/components/common/Loading";
import { diffString } from "json-diff";
import { ImageList } from "@/util/ImageList";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import { methodList } from "@/constants/methodList";

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;

  const [testData, setTestData] = useState(null);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [diff, setDiff] = useState("");
  const [schemaDiff, setSchemaDiff] = useState("");

  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);

  const getDate1 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if (testData[index].created_at === val) {
        setIndex1(index);
        jsondiff(testData[index], testData[index2]);
      }
    }
  };
  const getDate2 = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if (testData[index].created_at === val) {
        setIndex2(index);
        jsondiff(testData[index1], testData[index]);
      }
    }
  };

  const jsondiff = (json1, json2) => {
    if (index1 > -1 && index2 > -1) {
      setDiff(
        diffString(json1.content.response, json2.content.response, {
          full: true,
        })
      );
      setSchemaDiff(
        diffString(json1.content.schema, json2.content.schema, { full: true })
      );
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onAuthStateChanged(auth, async (user) => {
      // login in
      if (user) {
        const idToken = await auth.currentUser.getIdToken(true);
        const res = await GetUsers(idToken);
        localStorage.setItem("idToken", idToken);

        const getLogs = async () => {
          setLoading(true);
          try {
            const res = await GetLogs(
              idToken,
              new Date(0).toISOString(),
              new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
              id
            );
            setTestData(res.data.data);
            const metadata = await GetApisAllTestcaseId(idToken, id);
            setMetaData(metadata);
          } catch (error) {}
          setLoading(false);
        };

        getLogs();

        if (res.data.state === 0) {
          setIsAuthorize(false);
          alert("아직 준회원입니다. 관리자의 승인이 필요합니다.");
          Router.push("/");
        } else if (res.data.state === 1) {
          setIsAuthorize(true);
        } else if (res.data.state === 2) {
          setIsAuthorize(true);
          setIsAdmin(true);
        } else if (res.data.state === 3) {
          setIsAuthorize(true);
          setIsAdmin(true);
        }
      }
      // login out
      else {
        router.push("/");
      }
    });
  }, [router.isReady]);

  function setCriterion(index) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!testData) return;
        const idToken = await auth.currentUser.getIdToken(true);
        const id = testData[index].result_id;
        const response = testData[index].content.response;
        try {
          const metadata = await PostMetadatasExpectId(idToken, id, response);
          Swal.fire({
            title: "성공",
            text: "기준 데이터를 새로 저장하였습니다.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (e) {
          Swal.fire({
            title: "실패",
            text: "기준 데이터를 업데이트하지 못했습니다.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        router.push("/");
      }
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (!metaData) {
    return <Loading />;
  }

  return (
    <Box>
      <Header />
      <Box display="flex" width="100%">
        <Nav isAdmin={isAdmin} />
        <Box component="main" m={5} width="100%">
          <Toolbar />
          <Typography variant="h4">{metaData.data.metadata_name}</Typography>

          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Category :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metaData.data.category_name}
            </Typography>
          </Box>

          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              url :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {metaData.data.domain_domain}
              {metaData.data.api_resources}
            </Typography>
          </Box>

          <Box mt={1} mb={1} display="flex">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Method :
            </Typography>
            <Typography variant="subtitle1" ml={1}>
              {methodList[metaData.data.api_method]}
            </Typography>
          </Box>

          <Divider />

          <Box display="flex" flexDirection="row" width="100%" mt={5}>
            <Box mr={4} width="50%">
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Typography variant="h5">Result : </Typography>
                  <Typography
                    ml={1}
                    variant="h5"
                    color={
                      testData &&
                      testData[index1] &&
                      !testData[index1].content.result
                        ? "red"
                        : "green"
                    }
                  >
                    {testData && testData[index1]
                      ? !testData[index1].content.result
                        ? "FAIL"
                        : "PASS"
                      : ""}
                  </Typography>
                </Box>

                <Box display="flex">
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                    onClick={() => setCriterion(index1)}
                  >
                    Set Criterion
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      let data = testData[index1].content.response;
                      const data_encoded = window.btoa(
                        encodeURI(JSON.stringify(data))
                      );
                      window.location.href = `https://sapiv.site/hero/new?j=${data_encoded}`;
                    }}
                  >
                    Visualize
                  </Button>
                </Box>
              </Box>

              <Playground
                testData={testData}
                getDate={getDate1}
                value={testData ? testData[index1] : {}}
              />

              <TabControl json={diff} schema={schemaDiff} />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList
                json={
                  testData && testData[index1]
                    ? testData[index1].content.response
                    : {}
                }
              ></ImageList>
            </Box>

            <Box ml={4} width="50%">
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Typography variant="h5">Result : </Typography>
                  <Typography
                    ml={1}
                    variant="h5"
                    color={
                      testData &&
                      testData[index2] &&
                      !testData[index2].content.result
                        ? "red"
                        : "green"
                    }
                  >
                    {testData && testData[index2]
                      ? !testData[index2].content.result
                        ? "FAIL"
                        : "PASS"
                      : ""}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                    onClick={() => setCriterion(index2)}
                  >
                    Set Criterion
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      let data = testData[index2].content.response;
                      const data_encoded = window.btoa(
                        encodeURI(JSON.stringify(data))
                      );
                      window.location.href = `https://sapiv.site/hero/new?j=${data_encoded}`;
                    }}
                  >
                    Visualize
                  </Button>
                </Box>
              </Box>
              <Playground
                testData={testData}
                getDate={getDate2}
                value={testData ? testData[index2] : {}}
              />

              <TabControl
                json={
                  testData && testData[index2]
                    ? JSON.stringify(
                        testData[index2].content.response,
                        null,
                        "        "
                      )
                    : ""
                }
                schema={
                  testData && testData[index2]
                    ? JSON.stringify(
                        testData[index2].content.schema,
                        null,
                        "  "
                      )
                    : ""
                }
              />
              <Typography variant="h6">Artifacts</Typography>
              <ImageList
                json={
                  testData && testData[index2]
                    ? testData[index2].content.response
                    : {}
                }
              ></ImageList>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
