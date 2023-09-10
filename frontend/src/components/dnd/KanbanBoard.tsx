import { Grid } from '@mui/material'

import { ColumnWidget } from './ColumnWidget'

export interface TeamColumn<T> {
  data: T[]
  name: string
}

interface KanbanBoardProps<T> {
  data: { [key: string]: TeamColumn<T> }
}
export function KanbanBoard<T>({ data }: KanbanBoardProps<T>) {
  return (
    <Grid container direction={'row'}>
      {Object.keys(data).map((key) => {
        const values = data[key]
        return (
          <Grid item xs={3} key={key} spacing={2} sx={{ mx: 2 }}>
            <ColumnWidget droppableId={key} values={values.data} columnName={values.name} />
          </Grid>
        )
      })}
    </Grid>
  )
}
