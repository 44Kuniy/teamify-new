import { App } from "./App";

import { createRoot } from "react-dom/client";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4492/api/graphql",
  cache: new InMemoryCache(),
});

const container = document.getElementById("root") as Element;

const root = createRoot(container);
root.render(
  // react-beautiful-dnd does not work on StrictMode
  // https://github.com/atlassian/react-beautiful-dnd/issues/2407
  // <StrictMode>
  <BrowserRouter>
    <CssBaseline>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </CssBaseline>
  </BrowserRouter>
  // </StrictMode>
);
