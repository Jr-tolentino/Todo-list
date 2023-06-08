import { useState } from 'react';

import "./App.css";

import ToDo from './components/ToDo';
import TodoForm from './components/TodoForm';
import Search from './components/search';
import Filter from './components/Filter';


function App() {
  const [toDos, setToDos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ])

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Cre")

  const addTodo = (text, category) => {
    const newTodos = [
      ...toDos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      }
    ]
    setToDos(newTodos);
  }

  const removeTodo = (id) => {
    const newTodos = [...toDos]
    const filteredTodos = newTodos.filter(todo =>
      todo.id !== id ? todo : null
    )
    setToDos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...toDos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setToDos(newTodos);
  }

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {toDos
          .filter((todo) =>
            filter === 'All'
              ? true
              : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Cre"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <ToDo key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
