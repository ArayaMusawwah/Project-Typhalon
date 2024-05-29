import React from "react"
import { TodoType } from "../Types"
import TodoList from "./TodoList"
import { DroppableProvided } from "react-beautiful-dnd"
import { StrictModeDroppable } from "../utils/strictMode"

interface Props {
  className?: string
  title: string
  todos?: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  isCompleted: boolean
  dropId: string
}
const Card: React.FC<Props> = ({
  className,
  title,
  todos,
  setTodos,
  isCompleted,
  dropId
}) => {
  const handleComplete = (id: number) => {
    todos &&
      setTodos(
        todos?.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      )
  }

  const handleDelete = (id: number) => {
    todos && setTodos(todos?.filter((todo) => todo.id !== id))
  }

  const handleEdit = (id: number, editValue: string) => {
    todos &&
      setTodos(
        todos?.map((todo) =>
          todo.id === id ? { ...todo, task: editValue } : todo
        )
      )
  }

  const currentTodo = todos?.filter((todo) => todo.isDone === isCompleted)

  return (
    <ul
      className={`h-max max-h-[60vh] w-1/2 overflow-y-scroll rounded-lg px-6 py-10 transition duration-1000 ${className}`}
    >
      <h1
        className={`mb-4 border-black pb-2 text-center text-2xl font-bold ${!currentTodo && "border-b-4"}`}
      >
        {title}
      </h1>
      <StrictModeDroppable droppableId={dropId} key={dropId} type="todo">
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {currentTodo?.map((todo, index) => (
              <TodoList
                index={index}
                key={todo.id}
                todo={todo}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </ul>
  )
}

export default Card
