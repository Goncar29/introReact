import React from "react";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/index.js';
import { TodoSection } from "../TodoSection";

function AppUI({
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    completeTodo,
    deleteTodo,}
) {
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
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
                />
            ))}
        </TodoList>

        <CreateTodoButton />
        {/* <button>+</button> */}
    </React.Fragment>
    );
}

export { AppUI };