import { Box } from '@mui/material'

import { KanbanBoard } from '@/components/dnd/KanbanBoard'
interface User {
  id: string
  name: string
}

const defaultValuesMap: { [key: string]: User[] } = {
  droppable1: [
    { id: '11', name: 'user 11' },
    { id: '12', name: 'user 12' },
    { id: '13', name: 'user 13' },
  ],
  droppable2: [
    { id: '21', name: 'user 21' },
    { id: '22', name: 'user 22' },
    { id: '23', name: 'user 23' },
  ],
  droppable3: [
    { id: '31', name: 'user 31' },
    { id: '32', name: 'user 32' },
    { id: '33', name: 'user 33' },
  ],
}

export const TestPage = () => {
  return (
    <Box>
      <KanbanBoard defaultValues={defaultValuesMap} />
    </Box>
  )
}
