import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { methodList } from "@/constants/methodList";
import { cycleList } from "@/constants/cycleList";
import auth from "@/util/auth";
import {
  GetApis,
  GetApisId,
  GetCategories,
  GetCategoriesId,
  GetDomains,
  GetDomainsId,
  GetMetadatasId,
  GetUsers,
  PatchMetadatasId,
  PostApisTest,
  PostMetadatas,
  PostMetadatasExpectId,
} from "@/util/api";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import APIinfoTable from "@/components/admin/APIinfoTable";
import Router, { useRouter } from "next/router";
import { Route } from "react-router-dom";
import Loading from "@/components/common/Loading";

const json = {
  1: "Snow",
  2: "Lannister",
  3: "Lannister",
  4: "Stark",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function APIedit() {
  const router = useRouter();
  const selectedApiId = router.query.id;
  const isEdit = router.query.isEdit;

  const [apiName, setApiName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryVal, setCategoryVal] = useState();

  const [domains, setDomains] = useState([]);
  const [domain, setDomain] = useState("");
  const [domainVal, setDomainVal] = useState();

  const [apis, setApis] = useState([]);
  const [api, setApi] = useState();

  const [resources, setResources] = useState("");
  const [method, setMethod] = useState();
  const [apiId, setApiId] = useState();
  const [interval, setInterval] = useState(0);

  const [isAuthorize, setIsAuthorize] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tabValue, setTabValue] = useState(0);
  const [header, setHeader] = useState({});
  const [body, setBody] = useState({});
  const [param, setParam] = useState({});
  const [responseJson, setResponseJson] = useState();
  const [metaId, setMetaId] = useState();

  const [openResponse, setOpenResponse] = useState("hidden");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNameChange = (e) => {
    setApiName(e.target.value);
  };

  const handleCategoryChange = async (val) => {
    const idToken = localStorage.getItem("idToken");
    const categoryId = val.category_id;
    setCategory(val.name);
    const response = await GetDomains(idToken, categoryId);
    setDomains(response.data.data);
  };

  const handleDomainChange = async (val) => {
    const idToken = localStorage.getItem("idToken");
    const domainId = val.domain_id;
    setDomain(val.domain);
    const response = await GetApis(idToken, domainId);
    setApis(response.data.data);
  };

  const handlePathChange = (val) => {
    setResources(val.resources);
  };

  const handleMethodChange = (val) => {
    setApiId(val.api_id);
    setMethod(val.method);
  };

  const handleIntervalChange = (val) => {
    setInterval(val);
  };

  const handleTestClick = async (e) => {
    try {
      const idToken = localStorage.getItem("idToken");
      const url = domain + resources;
      const response = await PostApisTest(
        idToken,
        url,
        methodList[method],
        header,
        param,
        body
      );
      setResponseJson(response.data);
      setOpenResponse("visible");
    } catch (error) {
      // console.log(error);
      setOpenResponse("hidden");
      alert(error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const idToken = localStorage.getItem("idToken");
      const response = await PostMetadatas(
        idToken,
        apiId,
        header,
        param,
        body,
        apiName,
        interval
      );
      const metadataId = response.data.data.meta_id;
      const res = await PostMetadatasExpectId(
        idToken,
        metadataId,
        responseJson
      );
      alert("API 추가 등록이 되었습니다.");
      Router.push("/admin/api");
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  const handleChangeClick = async () => {
    try {
      const idToken = localStorage.getItem("idToken");
      const response = await PatchMetadatasId(
        idToken,
        metaId,
        apiId,
        header,
        param,
        body,
        apiName,
        interval
      );
      alert("API 수정이 완료되었습니다.");
      Router.push("/admin/api");
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onAuthStateChanged(auth, (user) => {
      const getCategories = async () => {
        setLoading(true);
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          localStorage.setItem("idToken", idToken);
          const response = await GetCategories(idToken);
          const res = await GetUsers(idToken);
          setCategories(response.data.data);

          if (isEdit) {
            const response = await GetMetadatasId(idToken, selectedApiId);
            const responseData = response.data.data;
            const apiData = (await GetApisId(idToken, responseData.api_id)).data
              .data;
            const domainId = apiData.domain_id;
            const domainData = (await GetDomainsId(idToken, domainId)).data
              .data;
            const categoryId = domainData.category_id;
            const categoryData = (await GetCategoriesId(idToken, categoryId))
              .data.data;
            setApiId(responseData.api_id);
            setCategory(categoryData.name);
            setCategoryVal(categoryData);
            setDomain(domainData.domain);
            setDomainVal(domainData);
            setApi(apiData);
            setResources(apiData.resources);
            setMethod(apiData.method);
            setHeader(responseData.header);
            setBody(responseData.body);
            setParam(responseData.params);
            setMetaId(responseData.meta_id);
            setApiName(responseData.name);
            setInterval(responseData.cycle_time);
            // console.log(responseData);
          }

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
        } catch (error) {
          // console.log(error);
          alert(error);
        }
        setLoading(false);
      };
      getCategories();
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={isAdmin} isAdminPage={true} />
        <Box width="80%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              {isEdit ? "API 편집" : "API 추가"}
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
              <TextField
                label="Name"
                variant="standard"
                value={apiName}
                onChange={handleNameChange}
                sx={{ width: 250, marginRight: 3 }}
              />
              <Autocomplete
                sx={{ width: 300, marginRight: 3 }}
                options={categories}
                value={categoryVal}
                getOptionLabel={(option) => option.name}
                disableClearable
                onChange={(event, newValue) => handleCategoryChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
                )}
              />
              <Autocomplete
                sx={{ width: 300, marginRight: 3 }}
                options={domains}
                value={domainVal}
                getOptionLabel={(option) => option.domain}
                disableClearable
                onChange={(event, newValue) => handleDomainChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Domain" variant="standard" />
                )}
              />
              <Autocomplete
                sx={{ width: 300 }}
                options={apis}
                value={api}
                getOptionLabel={(option) => option.resources}
                disableClearable
                onChange={(event, newValue) => handlePathChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Path" variant="standard" />
                )}
              />
            </Box>
            <Box mt={3} mb={3} display="flex">
              <Autocomplete
                sx={{ width: 100, marginRight: 3 }}
                options={
                  apis
                    ? apis.filter((option) => option.resources === resources)
                    : []
                }
                value={api}
                getOptionLabel={(option) => methodList[option.method]}
                disableClearable
                onChange={(event, newValue) => handleMethodChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Method" variant="standard" />
                )}
              />
              <Autocomplete
                sx={{ width: 100 }}
                options={cycleList}
                disableClearable
                value={interval}
                onChange={(event, newValue) => handleIntervalChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Interval" variant="standard" />
                )}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Header" />
                  <Tab label="Body" />
                  <Tab label="Param" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <APIinfoTable data={header} setData={setHeader} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <APIinfoTable data={body} setData={setBody} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <APIinfoTable data={param} setData={setParam} />
              </TabPanel>
            </Box>
            <Box display="flex" flexDirection="row-reverse" mt={1} mb={1}>
              <Button
                onClick={handleTestClick}
                variant="contained"
                size="large"
              >
                API Test
              </Button>
            </Box>

            <Divider />

            <Box visibility={openResponse}>
              <Typography variant="h5" mt={2} mb={2}>
                Response
              </Typography>
              <Paper
                variant="outlined"
                className={styles.paper}
                sx={{ height: 300, overflow: "scroll" }}
              >
                {JSON.stringify(responseJson, null, "\t")}
              </Paper>
              <Box mt={2} mb={2} display="flex" flexDirection="row-reverse">
                {isEdit ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleChangeClick}
                  >
                    Change
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
