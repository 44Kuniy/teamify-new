import { Inbox } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const DRAWER_WIDTH = 170;

interface SidebarContent {
  icon: JSX.Element;
  text: string;
  to: string;
}
const sidebarContents: SidebarContent[] = [
  {
    icon: <Inbox />,
    text: "チーム分け",
    to: "/grid",
  },
  {
    icon: <Inbox />,
    text: "test1",
    to: "/",
  },
];

export const BasicSidebar = () => {
  return (
    <Drawer
      anchor={"left"}
      open={true}
      variant="permanent"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarContents.map((content) => (
            <ListItem key={content.to} disablePadding>
              <ListItemButton>
                <ListItemIcon>{content.icon}</ListItemIcon>
                <ListItemText primary={content.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};
