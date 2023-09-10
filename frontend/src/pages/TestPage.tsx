import { Box } from '@mui/material'

import { KanbanBoard } from '@/components/dnd/KanbanBoard'
export interface User {
  id: string
  name: string
}

const defaultValuesMap: { [key: string]: User[] } = {
  droppable1: [
    { id: '11', name: 'user 11' },
    { id: '12', name: 'user 12' },
    { id: '13', name: 'user 13' },
    { id: '14', name: 'user 14' },
    { id: '15', name: 'user 15' },
  ],
  droppable2: [
    { id: '21', name: 'user 21' },
    { id: '22', name: 'user 22' },
    { id: '23', name: 'user 23' },
    { id: '24', name: 'user 24' },
    { id: '25', name: 'user 25' },
  ],
}

export const TestPage = () => {
  return (
    <Box>
      <KanbanBoard defaultValues={defaultValuesMap} />
    </Box>
  )
}
