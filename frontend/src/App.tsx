import { Mail, Menu, MoveToInbox } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { TestPage } from "./pages/TestPage";
import { BaseLayout } from "./components/layout/BasicLayout";

const TEST = gql`
  query Test {
    howdy
  }
`;

const GET_CHANNELS = gql`
  query Channels {
    channels {
      id
    }
  }
`;

export const App: FC = () => {
  const content = useRoutes(routes);
  const { loading, error, data } = useQuery(GET_CHANNELS);
  console.log("loading, error, data ❓: {:#?}", loading, error, data);

  return <React.Fragment>{content}</React.Fragment>;
};

const list = () => (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <div>aa</div>,
  },
  {
    path: "/test",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <div></div>,
      },
      {
        path: "2",
        element: <div>taaaa</div>,
      },
    ],
  },
  {
    path: "/test2",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <TestPage />,
      },
      {
        path: "2",
        element: <div>taaaa</div>,
      },
    ],
  },
];

export default function TestAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color={"inherit"}
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          {/* TODO: shrink Drawer or Drawer */}
          <Drawer
            anchor={"left"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            {list()}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
