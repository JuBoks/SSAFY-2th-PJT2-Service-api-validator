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
  GetDomains,
  GetDomainsId,
  GetMetadatasId,
  PostMetadatas,
} from "@/util/api";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import APIinfoTable from "@/components/admin/APIinfoTable";
import Router, { useRouter } from "next/router";

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
        <Box sx={{ p: 3 }}>
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
  const [domains, setDomains] = useState([]);
  const [domain, setDomain] = useState("");
  const [apis, setApis] = useState([]);
  const [resources, setResources] = useState("");
  const [method, setMethod] = useState();
  const [apiId, setApiId] = useState();
  const [interval, setInterval] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [header, setHeader] = useState({});
  const [body, setBody] = useState({});
  const [param, setParam] = useState({});

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

  const handleTestClick = (e) => {
    console.log(apiName);
    console.log(category);
    console.log(domain);
    console.log(resources);
    console.log(method);
    console.log(interval);
    console.log(header);
    console.log(body);
    console.log(param);
  };

  const handleSaveClick = async (e) => {
    console.log(apiId);
    console.log(header);
    console.log(body);
    console.log(param);
    console.log(apiName);
    console.log(interval);
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
    console.log(response);
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
          setCategories(response.data.data);

          if (isEdit) {
            const response = await GetMetadatasId(idToken, selectedApiId);
            console.log(response);
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
        setLoading(false);
      };
      getCategories();
    });
  }, []);

  if (loading) {
    return (
      <>
        <div>대기 중</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box display="flex" sx={{ backgroundColor: "#F9F9F9" }}>
        <Nav isAdmin={true} isAdminPage={true} />
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
            <Box mt={3} display="flex">
              <TextField
                label="Name"
                variant="standard"
                onChange={handleNameChange}
              />
              <Autocomplete
                sx={{ width: 300 }}
                options={categories}
                getOptionLabel={(option) => option.name}
                disableClearable
                onChange={(event, newValue) => handleCategoryChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="standard" />
                )}
              />
              <Autocomplete
                sx={{ width: 300 }}
                options={domains}
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
                getOptionLabel={(option) => option.resources}
                disableClearable
                onChange={(event, newValue) => handlePathChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Path" variant="standard" />
                )}
              />
            </Box>
            <Box mt={3} display="flex">
              <Autocomplete
                sx={{ width: 100 }}
                options={apis.filter(
                  (option) => option.resources === resources
                )}
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
            <Box>
              <Button onClick={handleTestClick}>Test</Button>
            </Box>
            <Divider />
            <Typography variant="h5">Response</Typography>
            <Paper>Hello</Paper>
            {isEdit ? (
              <Button>Change</Button>
            ) : (
              <Button onClick={handleSaveClick}>Save</Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
