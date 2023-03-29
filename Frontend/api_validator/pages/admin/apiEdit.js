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
} from "@mui/material";
import FreeSoloCreateOptionDialog from "@/components/MUI/FreeSoloCreateOptionDialog";
import ComboBox from "@/components/ComboBox";
import { methodList } from "@/constants/methodList";
import { cycleList } from "@/constants/cycleList";
import auth from "@/util/auth";
import TabAPIinfo from "@/components/TabAPIinfo";
import CategoryBox from "@/components/admin/CategoryBox";
import { GetCategories } from "@/util/api";
import { onAuthStateChanged } from "firebase/auth";

export default function APIedit() {
  const [apiName, setApiName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setApiName(e.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await GetCategories(idToken);
        setCategoryList(response.data.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  if (loading) {
    return (
      <>
        <div>대기 중</div>
      </>
    );
  }

  if (!categoryList) {
    return null;
  }

  return (
    <>
      <Header />
      <Box display="flex">
        <Nav isAdmin={true} isAdminPage={true} />
        <Box width="80%">
          <Toolbar />
          <Box className={styles.main}>
            <Typography className={styles.text} variant="h3">
              API 추가/편집
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
                id="name"
                label="Name"
                variant="outlined"
                value={apiName}
                onChange={handleNameChange}
              />
              <CategoryBox data={categoryList} />
              <FreeSoloCreateOptionDialog label="Service" />
              <TextField id="path" label="Path" variant="outlined" />
              <ComboBox label="Method" options={methodList} />
              <ComboBox label="Cycle" options={cycleList} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
