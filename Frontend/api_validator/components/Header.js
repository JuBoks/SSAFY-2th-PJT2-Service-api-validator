import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "@/public/images/logo_black.png";
import Router from "next/router";

export default function Header() {
  return (
    <AppBar style={{ backgroundColor: "white", zIndex: 20 }}>
      <Toolbar>
        {/* <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Image src={logo} style={{ width: 170, height: 40 }} alt="logo" />
        </Typography>
        <IconButton
          size="large"
          onClick={(e) => {
            Router.push("/profile");
          }}
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
