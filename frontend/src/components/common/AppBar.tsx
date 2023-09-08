import * as React from 'react'

import { Home } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface AppbarPrps {
  height: number
}
export default function BasicAppbar({ height }: AppbarPrps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: `${height}px`,
        zIndex: 1500,
        boxShadow: 0,
      }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          チーム分け
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
