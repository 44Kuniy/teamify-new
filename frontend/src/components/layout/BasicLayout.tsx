import { Outlet } from "react-router-dom";
import { BasicSidebar } from "../common/SideBar";
import BasicAppbar from "../common/AppBar";
import { Box } from "@mui/material";

const APP_BAR_HEIGHT = 64;
const DRAWER_WIDTH = 170;

export const BaseLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <BasicAppbar height={APP_BAR_HEIGHT} />
        <Box>
          <BasicSidebar width={DRAWER_WIDTH} />
          <Box sx={{ mt: `${APP_BAR_HEIGHT}px`, ml: `${DRAWER_WIDTH}px` }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
