import Image from "next/image";
import { Box } from "@mui/material";
import logo from "@/public/images/logo.png";
import styles from "@/styles/login.module.css";

export default function IndexLogo() {
  return (
    <Box className={styles["left-box"]}>
      <Image src={logo} style={{ width: "60%", height: "20%" }} alt="logo" />
    </Box>
  );
}
