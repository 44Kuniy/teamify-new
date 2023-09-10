import { Grid } from '@mui/material'

import { ColumnWidget } from './ColumnWidget'

export interface TeamColumn<T> {
  data: T[]
  name: string
}

interface KanbanBoardProps<T> {
  data: { [key: string]: TeamColumn<T> }
  onAddNewMember: (droppableId: string) => () => void
}
export function KanbanBoard<T>({ data, onAddNewMember }: KanbanBoardProps<T>) {
  return (
    <Grid container direction={'row'}>
      {Object.keys(data).map((droppableId) => {
        const values = data[droppableId]
        return (
          <Grid item xs={6} key={droppableId} spacing={0} sx={{ px: 1 }}>
            <ColumnWidget
              droppableId={droppableId}
              values={values.data}
              columnName={values.name}
              onAddNewMember={onAddNewMember(droppableId)}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
