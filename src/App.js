import React from "react";
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import { TodoSection } from "./TodoSection";
import './App.css';

const defaultTodos = [
    { text: 'Cortar cebolla', completed: true },
    { text: 'Tomar el curso de intro a React', completed: false },
    { text: 'Llorar con la llorona', completed: false },
    { text: 'LALALALAA', completed: true },
];

function App() {
    // Estado inicial de nuestros TODOs
    const [todos, setTodos] = React.useState(defaultTodos);
    const [searchValue, setSearchValue] = React.useState('');

    // Cantidad de TODOs completados
    const completedTodos = todos.filter(todo => !!todo.completed).length;
    // Cantidad total de TODOs
    const totalTodos = todos.length;

    let searchedTodos = [];

    if(!searchValue.length >= 1){
        searchedTodos = todos;
    } else{
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase()
            const searchText = searchValue.toLowerCase()
            return todoText.includes(searchText)
        })
    }

    return (
        <React.Fragment>
            <TodoSection></TodoSection>
            <TodoCounter 
                total={totalTodos}
                completed={completedTodos}
            />
            {/* <h2>Has completado 2 de 3 TODOs</h2> */}
            <TodoSearch 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {/* <input placeholder="Cebolla"></input> */}
            <TodoList>
                {searchedTodos.map(todo => (
                    <TodoItem 
                    key={todo.text} 
                    text={todo.text} 
                    completed={todo.completed}
                    />
                ))}
            </TodoList>

            <CreateTodoButton />
            {/* <button>+</button> */}
        </React.Fragment>
    );
}

export default App;
