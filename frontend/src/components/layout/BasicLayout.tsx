import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import { BasicSidebar } from "../common/SideBar";
import BasicAppbar from "../common/AppBar";
import { Box } from "@mui/material";

export const BaseLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <BasicAppbar />
      <BasicSidebar />
      <Outlet />
    </Box>
  );
};
