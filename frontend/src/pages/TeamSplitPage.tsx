import { useCallback, useState } from 'react'

import { Grid } from '@mui/material'
import { pick } from 'lodash'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'

import { ColumnWidget } from '@/components/dnd/ColumnWidget'
import { KanbanBoard, TeamColumn } from '@/components/dnd/KanbanBoard'

const BENCH_AREA_DROPPABLE_ID = 'participantArea'

export interface User {
  id: string
  name: string
}
function newUser(props?: Partial<User>): User {
  return {
    id: props?.id ?? (Math.random() * 1000).toString(),
    name: props?.name ?? '',
  }
}

export type DndData = { [key: string]: TeamColumn<User> }

const defaultValuesMap: DndData = {
  droppable1: {
    data: [
      { id: '11', name: 'user 11' },
      { id: '12', name: 'user 12' },
      { id: '13', name: 'user 13' },
      { id: '14', name: 'user 14' },
      { id: '15', name: 'user 15' },
    ],
    name: 'team 1',
  },
  droppable2: {
    data: [
      { id: '21', name: 'user 21' },
      { id: '22', name: 'user 22' },
      { id: '23', name: 'user 23' },
      { id: '24', name: 'user 24' },
      { id: '25', name: 'user 25' },
    ],
    name: 'team 2',
  },
  participantArea: {
    data: [
      { id: '101', name: 'user 101' },
      { id: '102', name: 'user 102' },
      { id: '103', name: 'user 103' },
      { id: '104', name: 'user 104' },
      { id: '105', name: 'user 105' },
    ],
    name: 'bench',
  },
}

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

  return [sourceClone, destClone]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const TeamSplitPage = () => {
  const [valueMaps, setValuesMap] = useState<DndData>(defaultValuesMap)
  const { players, participantAreaPlayers } = useInitPlayers(valueMaps)

  const onAddNewMember = useCallback(
    (droppableId: string) => () => {
      const valuesMapCopy = Object.assign({}, valueMaps)
      valuesMapCopy[droppableId].data.push(newUser())
      setValuesMap(valuesMapCopy)
    },
    [valueMaps]
  )

  function onDragEnd(result: DropResult) {
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
      const items = reorder(valuesMapCopy[source.droppableId].data, source.index, destination.index)

      valuesMapCopy[source.droppableId].data = items
      setValuesMap(valuesMapCopy)
    } else {
      const [movedSource, movedDest] = move(
        valuesMapCopy[source.droppableId].data,
        valuesMapCopy[destination.droppableId].data,
        source,
        destination
      )
      valuesMapCopy[source.droppableId].data = movedSource
      valuesMapCopy[destination.droppableId].data = movedDest

      setValuesMap({
        ...valuesMapCopy,
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container>
        <Grid item xs={8}>
          <KanbanBoard data={players} onAddNewMember={onAddNewMember} />
        </Grid>
        <Grid item xs={3}>
          <ParticipantBenchArea
            data={participantAreaPlayers}
            onAddNewMember={onAddNewMember(BENCH_AREA_DROPPABLE_ID)}
          />
        </Grid>
      </Grid>
    </DragDropContext>
  )
}

interface ParticipantBenchAreaProps<T> {
  data: T[]
  onAddNewMember: () => void
}
export function ParticipantBenchArea<T>({ data, onAddNewMember }: ParticipantBenchAreaProps<T>) {
  return (
    <ColumnWidget
      droppableId={BENCH_AREA_DROPPABLE_ID}
      values={data}
      columnName="ベンチ"
      onAddNewMember={onAddNewMember}
    />
  )
}

function useInitPlayers(data: DndData) {
  const dataCopy = Object.assign({}, data)
  const participantAreaPlayers = pick(dataCopy, BENCH_AREA_DROPPABLE_ID)
  // FIXME: bad logic
  delete dataCopy[BENCH_AREA_DROPPABLE_ID]

  if (!participantAreaPlayers) throw new Error('participantAreaPlayers are not defined.')

  return {
    players: dataCopy,
    participantAreaPlayers: participantAreaPlayers[BENCH_AREA_DROPPABLE_ID].data,
  }
}
