import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd'

import { User } from '@/pages/TestPage'

import { PersonalCard } from '../user-card/UserCard'

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
}
export function ColumnWidget<T>({ values, droppableId }: ColumnWidgetProps<T>) {
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
                    <PersonalCard user={user} />
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
