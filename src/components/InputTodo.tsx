import React, { useRef } from "react"
import { TodoType } from "../Types"

interface Props {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
}

const InputTodo: React.FC<Props> = ({ todos, setTodos }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputRef.current?.value || !inputRef.current?.value.trim()) return
    setTodos([
      ...todos,
      { id: Date.now(), task: inputRef.current?.value, isDone: false }
    ])
    inputRef.current.value = ""
  }

  return (
    <form
      className="mx-auto mt-8 flex w-1/2 items-center overflow-hidden"
      onSubmit={handleAdd}
    >
      <input
        type="text"
        placeholder="what you want to do?"
        className="w-full rounded-l-full px-6 py-4 text-lg placeholder:italic placeholder:text-slate-400 focus:outline-none"
        ref={inputRef}
      />
      <button className="rounded-r-full bg-blue-600 px-6 py-4 text-lg font-bold">
        Add
      </button>
    </form>
  )
}

export default InputTodo
