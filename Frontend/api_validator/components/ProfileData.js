import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import styles from "@/styles/profile.module.css";

const ProfileData = ({ name, email, type, state }) => {
  const typeList = ["Client Developer", "Server Developer", "QA", "etc"];
  const stateList = ["Guest", "Maintainer", "Admin", "Owner"];

  const ProfileData = [
    {
      icon: <PersonIcon className={styles.item_icon} />,
      content: name,
      key: "username",
    },
    {
      icon: <EmailIcon className={styles.item_icon} />,
      content: email,
      key: "email",
    },
    {
      icon: <ApartmentIcon className={styles.item_icon} />,
      content: typeList[type],
      key: "type",
    },
    {
      icon: <SupervisedUserCircleIcon className={styles.item_icon} />,
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

  return (
    <Box item className={styles.frame}>
      <AccountCircle className={styles.icon} />
      <Box className={styles.group}>{BoxList}</Box>
    </Box>
  );
};

export default ProfileData;
