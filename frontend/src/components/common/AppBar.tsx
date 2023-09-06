import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import zIndex from "@mui/material/styles/zIndex";
import { Home } from "@mui/icons-material";

const APP_BAR_HEIGHT = 64;

export default function BasicAppbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: APP_BAR_HEIGHT,
        mb: APP_BAR_HEIGHT,
        zIndex: 1500,
        boxShadow: 0,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          チーム分け
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
