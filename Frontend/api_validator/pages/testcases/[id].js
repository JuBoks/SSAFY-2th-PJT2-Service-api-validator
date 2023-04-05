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
import {
  GetApisAllTestcaseId,
  GetLogs,
  PostMetadatasExpectId,
  GetLogsId,
} from "@/util/api";
import Loading from "@/components/common/Loading";
import { diffString } from "json-diff";
import { Divider, Paper } from "@mui/material";
import { methodList } from "@/constants/methodList";
import { MetadataChart } from "@/components/ChartJS/MetadataChart";
import styles from "@/styles/APIs.module.css";

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [index, setIndex] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleErrorChange = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
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
            const res = await GetLogs(
              idToken,
              new Date(0).toISOString(),
              new Date(Date.now() + 86400000).toISOString(),
              id
            );
            // console.log(res);
            setTestData(res.data.data);
            let idx = 0;
            for (const it of res.data.data) {
              if (it.result_id == router.query.result_id) {
                setIndex(idx);
              }
              idx += 1;
            }
            const metadata = await GetApisAllTestcaseId(idToken, id);
            setMetaData(metadata);
          } catch (error) {
            // console.log(error.message);
          }
          setLoading(false);
        };

        getLogs();
      }
      // login out
      else {
        router.push("/");
      }
    });
  }, [router.isReady, router.query.result_id]);

  if (loading) {
    return <Loading />;
  }

  if (!metaData) {
    return <Loading />;
  }

  const getDate = (val) => {
    for (let index = 0; index < testData.length; index++) {
      if (testData[index].created_at === val) {
        setIndex(index);
      }
    }
  };

  const getText = (json, sch) => {
    const str_obj = JSON.stringify(sch);
    const schema = JSON.parse(str_obj);

    if (json && typeof json[Symbol.iterator] === "function") {
      for (const iterator of json) {
        const loc = iterator.location;
        const map = loc.split("->");
        const key1 = map[map.length - 1].trim();
        const key2 = map.length > 1 ? map[map.length - 2].trim() : null;
        const marker =
          iterator.errorCode == 0 ? "+" : iterator.errorCode == 1 ? "-" : "*";

        if (key2 in schema && schema[key2][key1]) {
          schema[key2][key1] = schema[key2][key1] + marker;
        } else if (key1 in schema) {
          schema[key1] = schema[key1] + marker;
        }
      }
    }
    const lines = JSON.stringify(schema, null, "  ");
    const temp = lines.split("\n").map((data) => {
      if (["+", "-", "*"].indexOf(data.charAt(data.length - 3)) > -1) {
        const new_data =
          data.charAt(data.length - 3) +
          data.substring(0, data.length - 3) +
          data.substring(data.length - 2, data.length);
        return new_data;
      } else if (["+", "-", "*"].indexOf(data.charAt(data.length - 2)) > -1) {
        const new_data =
          data.charAt(data.length - 2) +
          data.substring(0, data.length - 2) +
          data.substring(data.length - 1, data.length);
        return new_data;
      } else {
        return data;
      }
    });
    return temp.join("\n");
  };

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Nav />
        <Box component="main" m={5} sx={{ height: "100vh", width: "80%" }}>
          <Toolbar />
          <Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h4">
                {metaData.data.metadata_name}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/compare/" + id)}
              >
                Compare
              </Button>
            </Box>

            <Divider />

            <Playground
              testData={testData}
              getDate={getDate}
              value={testData ? testData[index] : {}}
            />

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

            <Box mt={3} mb={3}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                variant="outlined"
              >
                <AccordionSummary
                  id="details"
                  expandIcon={
                    <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                  }
                >
                  <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box m={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Box width="32%">
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          Header
                        </Typography>
                        <Paper
                          variant="outlined"
                          className={styles.paper}
                          sx={{
                            height: 150,
                            overflow: "scroll",
                            padding: 1,
                          }}
                        >
                          {JSON.stringify(
                            metaData.data.metadata_header,
                            null,
                            "\t"
                          )}
                        </Paper>
                      </Box>

                      <Box width="32%">
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          Body
                        </Typography>
                        <Paper
                          variant="outlined"
                          className={styles.paper}
                          sx={{
                            height: 150,
                            overflow: "scroll",
                            padding: 1,
                          }}
                        >
                          {JSON.stringify(
                            metaData.data.metadata_body,
                            null,
                            "\t"
                          )}
                        </Paper>
                      </Box>

                      <Box width="32%">
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          Params
                        </Typography>
                        <Paper
                          variant="outlined"
                          className={styles.paper}
                          sx={{
                            height: 150,
                            overflow: "scroll",
                            padding: 1,
                          }}
                        >
                          {JSON.stringify(
                            metaData.data.metadata_params,
                            null,
                            "\t"
                          )}
                        </Paper>
                      </Box>
                    </Box>
                    <Paper
                      variant="outlined"
                      sx={{ marginTop: 5, height: 500, padding: 2 }}
                    >
                      <MetadataChart metaId={metaData.data.metadata_meta_id} />
                    </Paper>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded2 === "panel2"}
                onChange={handleErrorChange("panel2")}
                variant="outlined"
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={
                    <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                  }
                >
                  <Typography>Error Message</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box m={1}>
                    <Paper
                      variant="outlined"
                      sx={{
                        marginTop: 5,
                        height: 500,
                        padding: 2,
                        overflow: "scroll",
                      }}
                    >
                      <Typography variant="h5" sx={{ whiteSpace: "pre-wrap" }}>
                        {testData && testData[index]
                          ? JSON.stringify(testData[index].message, null, "  ")
                          : ""}
                      </Typography>
                    </Paper>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box display="flex">
              <Box mr={4} sx={{ width: "50%" }}>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Typography variant="h5">
                      {metaData.data.metadata_name} :{" "}
                    </Typography>
                    <Typography
                      ml={1}
                      variant="h5"
                      color={
                        testData &&
                        testData[index] &&
                        !testData[index].content.result
                          ? "red"
                          : "green"
                      }
                    >
                      {testData && testData[index]
                        ? !testData[index].content.result
                          ? "FAIL"
                          : "PASS"
                        : ""}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      let data = testData[index].content.response;
                      const data_encoded = window.btoa(
                        encodeURI(JSON.stringify(data))
                      );
                      window.location.href = `https://sapiv.site/hero/new?j=${data_encoded}`;
                    }}
                  >
                    Visualize
                  </Button>
                </Box>
                <TabControl
                  json={
                    testData && testData[index]
                      ? JSON.stringify(
                          testData[index].content.response,
                          null,
                          "  "
                        )
                      : ""
                  }
                  schema={
                    testData && testData[index]
                      ? getText(
                          testData[index].message,
                          testData[index].content.schema
                        )
                      : ""
                  }
                />
                <Typography variant="h6">Artifacts</Typography>
                <ImageList
                  json={
                    testData && testData[index]
                      ? testData[index].content["response"]
                      : {}
                  }
                ></ImageList>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography variant="h5">Criterion</Typography>
                <TabControl
                  json={
                    testData && testData[index]
                      ? JSON.stringify(
                          testData[index].content["critic-response"],
                          null,
                          "  "
                        )
                      : ""
                  }
                  schema={
                    testData && testData[index]
                      ? JSON.stringify(
                          testData[index].content["critic-schema"],
                          null,
                          "  "
                        )
                      : ""
                  }
                />
                <Typography variant="h6">Artifacts</Typography>
                <ImageList
                  json={
                    testData && testData[index]
                      ? testData[index].content["critic-response"]
                      : {}
                  }
                ></ImageList>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
