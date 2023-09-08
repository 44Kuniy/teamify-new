import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4492/api/graphql',
  cache: new InMemoryCache(),
})

const container = document.getElementById('root') as Element

const root = createRoot(container)
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
)
