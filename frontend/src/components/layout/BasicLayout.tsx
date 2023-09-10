import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import BasicAppbar from '../common/AppBar'
import { BasicSidebar } from '../common/SideBar'

const APP_BAR_HEIGHT = 64
const DRAWER_WIDTH = 210

export const BaseLayout = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
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
  )
}
