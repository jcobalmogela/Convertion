import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const logoUrl = "/logo512.png"; // Adjust the path to your logo image

export default function Nav() {
  return (
    <AppBar position="static" sx={{ background: "#222", position: "absolute" , top:0 , width:"100%"}}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", }}>
          <img src={logoUrl} alt="Logo" style={{ height: 120 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}