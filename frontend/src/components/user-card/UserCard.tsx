import { Card, CardContent } from '@mui/material'

interface TestDndProps {
  user: User
}

export const TestDnd = ({ user }: TestDndProps) => {
  return <PersonalCard user={user}></PersonalCard>
}

interface User {
  id: string
  name: string
}

interface PersonalCardProps {
  user: User
}

export const PersonalCard = ({ user }: PersonalCardProps) => {
  return (
    <Card sx={{ borderRadius: '12px', border: '1px solid cadetblue' }}>
      <CardContent key={user.id}>{user.name}</CardContent>
    </Card>
  )
}
