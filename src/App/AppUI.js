import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/index.js';
import { TodoSection } from "../TodoSection";

function AppUI() {
    return (
    <React.Fragment>
        <TodoSection></TodoSection>
        <TodoCounter />
        {/* <h2>Has completado 2 de 3 TODOs</h2> */}
        <TodoSearch />
        {/* <input placeholder="Cebolla"></input> */}
        <TodoContext.Consumer>
            {({ 
            /* Podemos acceder a nuestro contexto con el consumer */
                error, 
                loading, 
                searchedTodos, 
                completedTodos, 
                deleteTodo,
            }) =>(
                <TodoList>
                    {error && <p>Desesperate, hubo un error...</p>}
                    {loading && <p>Estamos cargando, no desesperes...</p>}
                    {(!loading && !searchedTodos.length) && <p>!Crea tu primer TODO!</p>}
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
            )}
        </TodoContext.Consumer>

        <CreateTodoButton />
        {/* <button>+</button> */}
    </React.Fragment>
    );
}

export { AppUI };