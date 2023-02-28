import React from "react";
// Importamos nuestro contexto
import { TodoContext } from "../TodoContext";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/index.js';
import { Modal } from '../Modal'
import { TodoSection } from "../TodoSection";

function AppUI() {
    // Desesctructuramos los valores de nuestro contexto
    const { 
        error, 
        loading, 
        searchedTodos, 
        completeTodo, 
        deleteTodo,
        openModal, 
        setOpenModal, 
} = React.useContext(TodoContext)
    return (
    <React.Fragment>
        <TodoSection></TodoSection>
        <TodoCounter />
        {/* <h2>Has completado 2 de 3 TODOs</h2> */}
        <TodoSearch />
        {/* <input placeholder="Cebolla"></input> */}
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

        {!!openModal && (
            <Modal>
        {/* preguntamos con "?" si existe el array de todos */}
            <p>{searchedTodos[0]?.text}</p>
        </Modal>
        )}

        <CreateTodoButton setOpenModal={openModal}/>
        {/* <button>+</button> */}
    </React.Fragment>
    );
}

export { AppUI };