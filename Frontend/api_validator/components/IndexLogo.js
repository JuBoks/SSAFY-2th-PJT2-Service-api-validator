import Image from "next/image";
import { Box, Typography } from "@mui/material";
import logo from "@/public/images/logo.png";
import styles from "@/styles/login.module.css";

export default function IndexLogo() {
  return (
    <Box className={styles.left}>
      <Image src={logo} className={styles.img} alt="logo" />
      <Typography variant="h2" color="white">
        SAPIV
      </Typography>
    </Box>
  );
}
