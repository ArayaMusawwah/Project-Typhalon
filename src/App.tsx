import { DragDropContext } from "react-beautiful-dnd"
import Card from "./components/Card"
import InputTodo from "./components/InputTodo"
import useTodos from "./hooks/useTodos"
const App: React.FC = () => {
  const { todos, setTodos, onDragEnd } = useTodos()

  return (
    <div className="container mx-auto px-[7%] py-6">
      <h1 className="text-center text-4xl font-bold tracking-wide text-white [text-shadow:_2px_2px_0_#111]">
        TASKIFY
      </h1>

      <InputTodo todos={todos} setTodos={setTodos} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mx-auto mt-6 flex w-full gap-4 overflow-hidden bg-blue-200 p-6">
          <Card
            className="bg-red-400"
            title={"Ongoing"}
            isCompleted={false}
            todos={todos}
            setTodos={setTodos}
            dropId="ongoingTodos"
          />

          <Card
            className="bg-green-400"
            title={"Completed"}
            isCompleted={true}
            todos={todos}
            setTodos={setTodos}
            dropId="completedTodos"
          />
        </div>
      </DragDropContext>
    </div>
  )
}

export default App
