import { Box } from '@mui/material'
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd'

import { User } from '@/pages/TeamSplitPage'

import { AddNewMemberCard } from '../user-card/AddNewMemberCard'
import { UserCard } from '../user-card/UserCard'

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  padding: 2,
  margin: `0 0 3px 0`,
  background: isDragging ? 'red' : 'transparent',
  borderRadius: '12px',
  ...draggableStyle,
})

interface ColumnWidgetProps<T> {
  values: T[]
  droppableId: string
  columnName: string
  onAddNewMember: () => void
}
export function ColumnWidget<T>({
  values,
  droppableId,
  columnName,
  onAddNewMember,
}: ColumnWidgetProps<T>) {
  const HEADER_HEIGHT = 42
  const CONTENT_HEIGHT = 36

  return (
    <Box>
      <ColumnHeader columnName={columnName} height={HEADER_HEIGHT} />
      <DroppableArea values={values} droppableId={droppableId} />
      <AddNewMemberCard onClick={onAddNewMember} />
    </Box>
  )
}

interface ColumnHeaderProps {
  columnName: string
  height: number
}

function ColumnHeader({ columnName, height }: ColumnHeaderProps) {
  const columnHeight = `${height}px`
  return (
    <Box
      sx={{ height: columnHeight, width: '100%', textAlign: 'center', lineHeight: columnHeight }}
    >
      {columnName}
    </Box>
  )
}
interface DroppableAreaProps<T> {
  droppableId: string
  values: T[]
}
export function DroppableArea<T>({ droppableId, values }: DroppableAreaProps<T>) {
  return (
    <Droppable droppableId={droppableId}>
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
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <UserCard user={user} />
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
