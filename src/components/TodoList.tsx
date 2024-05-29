import React, { useRef, useState } from "react"
import { BiPencil, BiTrash, BiCheck } from "react-icons/bi"
import { TodoType } from "../Types"
import { Draggable } from "react-beautiful-dnd"

interface Props {
  todo: TodoType
  handleComplete: (id: number) => void
  handleDelete: (id: number) => void
  handleEdit: (id: number, editValue: string) => void
  index: number
}

const TodoList: React.FC<Props> = ({
  todo,
  handleComplete,
  handleDelete,
  handleEdit,
  index
}) => {
  const [edit, setEdit] = useState(false)
  const refEditInput = useRef<HTMLInputElement>(null)

  return (
    <Draggable index={index} draggableId={todo.id.toString()}>
      {(provided) => (
        <li
          className={`my-2 flex items-center justify-between bg-[url('/paper-bg.avif')] bg-center px-8 py-4 transition hover:scale-105`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span
            className={`text-xl font-bold capitalize text-black ${todo.isDone && "line-through decoration-2"}`}
          >
            {edit ? (
              <form
                className="rounded-md text-sm"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleEdit(todo.id, refEditInput.current!.value)
                  setEdit(false)
                }}
              >
                <input
                  type="text"
                  defaultValue={todo.task}
                  ref={refEditInput}
                  className="px-2 py-1 text-base focus:outline-none"
                />
                <button className="bg-blue-600 px-2 py-1 text-base">ok</button>
              </form>
            ) : (
              todo.task
            )}
          </span>
          <div className="inline-flex gap-2 *:text-3xl *:font-bold hover:*:text-violet-600">
            {!todo.isDone && (
              <button onClick={() => setEdit((prev) => !prev)}>
                <BiPencil />
              </button>
            )}
            <button onClick={() => handleDelete(todo.id)}>
              <BiTrash />
            </button>
            <button onClick={() => handleComplete(todo.id)}>
              <BiCheck />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default TodoList
