import React from "react";
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
// import './App.css';

const todos = [
    { text: 'Cortar cebolla', completed: false },
    { text: 'Tomar el curso de intro a React', completed: false },
    { text: 'Llorar con la llorona', completed: false },
];

function App() {
    return (
        <React.Fragment>
            <TodoCounter />
            {/* <h2>Has completado 2 de 3 TODOs</h2> */}
            <TodoSearch />
            {/* <input placeholder="Cebolla"></input> */}
            <TodoList>
                {todos.map(todo => (
                    <TodoItem key={todo.text} text={todo.text} />
                ))}
            </TodoList>

            <CreateTodoButton />
            {/* <button>+</button> */}
        </React.Fragment>
    );
}

export default App;
