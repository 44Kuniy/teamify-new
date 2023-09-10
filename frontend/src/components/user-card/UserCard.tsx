import { useCallback, useEffect } from 'react'

import { Card, CardContent } from '@mui/material'

interface User {
  id: string
  name: string
}

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    console.log('Left click')
  }, [])

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    console.log('Right click')
  }, [])

  useEffect(() => {
    const mySelf = document.getElementById(`user-card-${user.id}`)
    if (!mySelf) throw new Error('invalid user id')
    mySelf.addEventListener('click', handleClick)
    mySelf.addEventListener('contextmenu', handleContextMenu)
    return () => {
      mySelf.removeEventListener('click', handleClick)
      mySelf.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [user.id])

  return (
    <Card id={`user-card-${user.id}`} sx={{ borderRadius: '12px', border: '1px solid cadetblue' }}>
      <CardContent key={user.id}>{user.name}</CardContent>
    </Card>
  )
}
