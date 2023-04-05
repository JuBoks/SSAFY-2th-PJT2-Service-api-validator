import * as React from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ArticleIcon from "@mui/icons-material/Article";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import auth from "@/util/auth";
import { signOut } from "firebase/auth";

function Nav({ isAdmin, isAdminPage }) {
  const drawerWidth = 240;
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      text: "Favorite",
      icon: <StarOutlineIcon />,
      path: "/favorite",
    },
    {
      text: "APIs",
      icon: <ArticleIcon />,
      path: "/testcases",
    },
    {
      text: "Profile",
      icon: <PermIdentityIcon />,
      path: "/profile",
    },
    isAdmin
      ? {
          text: "Admin",
          icon: <AdminPanelSettingsIcon />,
          path: "/admin/users",
        }
      : null,
    isAdminPage
      ? {
          text: "User",
          icon: null,
          path: "/admin/users",
        }
      : null,
    isAdminPage
      ? {
          text: "API",
          icon: null,
          path: "/admin/api",
        }
      : null,
  ].filter(Boolean);

  const handleListItemClick = (path) => {
    Router.push(path);
  };

  const handleLogoutClick = async () => {
    try {
      const res = await signOut(auth);
      alert("로그아웃 되었습니다.");
      Router.push("/");
    } catch (error) {
      //console.log(error);
      alert(error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.slice(0, 3).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {menuItems.slice(3).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key="Logout" disablePadding>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 0,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 10,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Nav;
