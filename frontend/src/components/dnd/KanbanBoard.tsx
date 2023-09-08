import { useState } from 'react'

import { Grid } from '@mui/material'
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
  ResponderProvided,
} from 'react-beautiful-dnd'

import { TestDnd } from '@/components/dnd/TestDnd'

interface User {
  id: string
  name: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const grid = 8
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle,
})

function move<T>(
  source: T[],
  destination: T[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result: { [key: string]: T[] } = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

interface KanbanBoardProps<T> {
  defaultValues: { [key: string]: T[] }
}
export function KanbanBoard<T>({ defaultValues }: KanbanBoardProps<T>) {
  const [valueMaps, setValuesMap] = useState<{ [key: string]: T[] }>(defaultValues)

  // FIXME: LOGIC IS WRONG
  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result
    const valuesMapCopy = Object.assign({}, valueMaps)

    // dropped outside the list
    if (!destination) {
      return
    }

    const sourceValues = valuesMapCopy[source.droppableId]
    const destValues = valuesMapCopy[destination.droppableId]

    if (!sourceValues) throw new Error('no sourceValues onDragEnd')
    if (!destValues) throw new Error('no destValues onDragEnd')

    if (source.droppableId === destination.droppableId) {
      const items = reorder(valuesMapCopy[source.droppableId], source.index, destination.index)

      valuesMapCopy[source.droppableId] = items
      setValuesMap(valuesMapCopy)
    } else {
      const result = move(
        valuesMapCopy[source.droppableId],
        valuesMapCopy[destination.droppableId],
        source,
        destination
      )

      setValuesMap({
        ...valuesMapCopy,
        ...result,
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container direction={'row'} sx={{ width: '100%' }}>
        {Object.keys(valueMaps).map((key) => {
          const values = valueMaps[key]
          return (
            <Grid item xs={3} key={key}>
              <Droppable droppableId={key}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {values.map((v, index) => {
                      const user = v as User
                      return (
                        <Draggable key={user.id} draggableId={user.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <TestDnd user={user} />
                            </div>
                          )}
                        </Draggable>
                      )
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          )
        })}
      </Grid>
    </DragDropContext>
  )
}
