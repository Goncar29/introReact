import React from "react";
import { useTodos } from "./useTodos";
// Importamos nuestro contexto
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton/index.js';
import { Modal } from '../Modal'
import { TodoSection } from "../TodoSection";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { ChangeAlert } from "../ChangeAlert";


function App(){
     // Desesctructuramos los valores de nuestro contexto
    const { states, stateUpdaters } = useTodos()

const {
    error, 
    loading, 
    searchedTodos, 
    completeTodo, 
    openModal,  
    totalTodos, 
    completedTodos,
    searchValue, 
} = states

const {
    setOpenModal,
    addTodo,
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

export default App;
