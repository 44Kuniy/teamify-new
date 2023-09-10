import { AddCircleOutline } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

interface AddNewMemberCardProps {
  onClick: () => void
}
export const AddNewMemberCard = ({ onClick }: AddNewMemberCardProps) => {
  const color = '#75c8cd'
  return (
    <Stack
      onClick={onClick}
      direction={'row'}
      sx={{
        borderRadius: '12px',
        border: '1px solid cadetblue',
        height: '48px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color,
      }}
      spacing={1}
    >
      <Typography variant="body1">メンバーを追加</Typography>
      <AddCircleOutline aria-label="delete" sx={{ color }} />
    </Stack>
  )
}
