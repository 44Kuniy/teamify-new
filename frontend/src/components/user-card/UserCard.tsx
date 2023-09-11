import { KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useState } from 'react'

import { Avatar, Box, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import { Edit, MoreVert } from '@mui/icons-material'

interface User {
  id: string
  name: string
}

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  const [isNameEditMode, setIsNameEditMode] = useState(false)

  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    console.log('Left click')
  }, [])

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    console.log('Right click')
  }, [])

  const setUserName = useCallback((userName: string) => {
    // TODO
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
      <CardContent key={user.id}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
            <Avatar src={avatarUrl} sx={{ width: 40, height: 40 }} />
            {isNameEditMode ? (
              <TextField
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    setUserName(target.value)
                    setIsNameEditMode(false)
                  }
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  setUserName(target.value)
                  setIsNameEditMode(false)
                }}
              >
                aaa
              </TextField>
            ) : (
              <Typography variant="body1">{user.name}</Typography>
            )}
          </Stack>
          <Edit sx={{ cursor: 'pointer' }} onClick={() => setIsNameEditMode(true)} />
        </Stack>
      </CardContent>
    </Card>
  )
}

const avatarUrl = 'https://pbs.twimg.com/profile_images/1116331980260438019/Ew_X1-eU_400x400.png'
