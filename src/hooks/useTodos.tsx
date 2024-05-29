import { useCallback, useEffect, useState } from "react"
import { TodoType } from "../Types"
import { DropResult } from "react-beautiful-dnd"

const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")!)
      : []
  )

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result
      if (!destination) return

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return

      if (
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        const newTodos = Array.from(todos)
        const [reorderedItem] = newTodos.splice(source.index, 1)
        newTodos.splice(destination.index, 0, reorderedItem)

        setTodos(newTodos)
      }

      if (
        (source.droppableId === "ongoingTodos" &&
          destination.droppableId === "completedTodos") ||
        (source.droppableId === "completedTodos" &&
          destination.droppableId === "ongoingTodos")
      ) {
        const itemId = parseInt(draggableId)
        setTodos(
          todos?.map((todo) =>
            todo.id === itemId ? { ...todo, isDone: !todo.isDone } : todo
          )
        )
      }
    },
    [todos]
  )
  return { todos, setTodos, onDragEnd }
}

export default useTodos
