import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Router from "next/router";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import styles from "@/styles/profile.module.css";
import Modal from "@mui/material/Modal";
import { DeleteUsersUid } from "@/util/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6F6F6A",
  boxShadow: 24,
  p: 4,
};

const ProfileInfoUI = (props) => {
  const [open, setOpen] = useState(false);

  const { name, email, type, state, idToken, uid } = props;
  const typeList = ["Client Developer", "Server Developer", "QA", "etc"];
  const stateList = ["Guest", "Maintainer", "Admin", "Owner"];

  const ProfileData = [
    {
      icon: <PersonIcon className={styles.startIcon} />,
      content: name,
      key: "username",
    },
    {
      icon: <EmailIcon className={styles.startIcon} />,
      content: email,
      key: "email",
    },
    {
      icon: <ApartmentIcon className={styles.startIcon} />,
      content: typeList[type],
      key: "type",
    },
    {
      icon: <SupervisedUserCircleIcon className={styles.startIcon} />,
      content: stateList[state],
      key: "state",
    },
  ];

  const BoxList = ProfileData.map((item) => (
    <Box className={styles.item} key={item.key}>
      {item.icon}
      <Typography variant="body1">{item.content}</Typography>
    </Box>
  ));

  const handleEditClick = () => {
    Router.push("/profile/edit");
  };

  const handleDeleteClick = async () => {
    try {
      await DeleteUsersUid(idToken, uid);
      Router.push("/");
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={styles.profileInfo}>
      <AccountCircle className={styles.icon} />
      <Box className={styles.group}>{BoxList}</Box>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={handleEditClick}
      >
        프로필 수정
      </Button>
      <Button
        className={styles.button}
        color="error"
        variant="outlined"
        onClick={handleOpen}
      >
        계정 삭제
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="subtitle1">계정을 삭제하시겠습니까?</Typography>
          <Box display="flex" flexDirection="row-reverse">
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteClick}
            >
              계정 삭제
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileInfoUI;
