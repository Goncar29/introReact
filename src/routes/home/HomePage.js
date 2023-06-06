import React from "react";
import { useTodos } from "../useTodos";
// Importamos nuestro contexto
import { TodoHeader } from "../../ui/TodoHeader";
import { TodoCounter } from '../../ui/TodoCounter';
import { TodoSearch } from '../../ui/TodoSearch';
import { TodoList } from '../../ui/TodoList';
import { TodoItem } from '../../ui/TodoItem';
import { TodoForm } from '../../ui/TodoForm';
import { CreateTodoButton } from '../../ui/CreateTodoButton/index.js';
import { Modal } from '../../ui/Modal'
import { TodoSection } from "../../ui/TodoSection";
import { TodosError } from "../../ui/TodosError";
import { TodosLoading } from "../../ui/TodosLoading";
import { EmptyTodos } from "../../ui/EmptyTodos";
import { ChangeAlert } from "../../ui/ChangeAlert";


function HomePage(){
     // Desesctructuramos los valores de nuestro contexto
    const { states, stateUpdaters } = useTodos()

const {
    error, 
    loading, 
    searchedTodos, 
    openModal,  
    totalTodos, 
    completedTodos,
    searchValue, 
} = states

const {
    setOpenModal,
    addTodo,
    completeTodo, 
    deleteTodo,
    setSearchValue,
    sincronizeTodos,
} = stateUpdaters

return (
    <React.Fragment>
            <TodoSection
                    loading={loading}
                    addTodo={addTodo}
                    setOpenModal={setOpenModal}
                />
        <TodoHeader loading={loading}>
            <TodoCounter 
                totalTodos={totalTodos}
                completedTodos={completedTodos}
            />
            {/* <h2>Has completado 2 de 3 TODOs</h2> */}
            <TodoSearch 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {/* <input placeholder="Cebolla"></input> */}
        </TodoHeader>
            
        <TodoList 
            error={error}
            loading={loading}
            searchedTodos={searchedTodos}
            totalTodos={totalTodos}
            searchText={searchValue}
            onError={() => <TodosError />}
            onLoading={() => <TodosLoading />}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResults={
                (searchText) => <p>No hay resultados para "{searchText}"</p>}
            
        // Render Props
            render={todo => (
                <TodoItem 
                    key={todo.text} 
                    text={todo.text} 
                    completed={todo.completed}
                    onEdit={() => console.log('Edit completed')}
                    onComplete={() => completeTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                />
            )}
        >  

        {/* Render Function */}
            {todo => (
                <TodoItem 
                    key={todo.text} 
                    text={todo.text} 
                    completed={todo.completed}
                    onEdit={() => console.log('Edit completed')}
                    onComplete={() => completeTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                />
            )}
            
        </TodoList>

        {!!openModal && (
            <Modal>
                <TodoForm
                    addTodo={addTodo}
                    setOpenModal={setOpenModal}
                />
                {/* preguntamos con "?" si existe el array de todos */}
                {/* <p>{searchedTodos[0]?.text}</p> */}
            </Modal>
        )}

        <CreateTodoButton setOpenModal={setOpenModal}/>
        {/* <button>+</button> */}

        <ChangeAlert 
            sincronize={sincronizeTodos}
        />
    </React.Fragment>
    );
};

export { HomePage };
