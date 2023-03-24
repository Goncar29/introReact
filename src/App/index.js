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

function App(){
     // Desesctructuramos los valores de nuestro contexto
    const { 
        error, 
        loading, 
        searchedTodos, 
        completeTodo, 
        deleteTodo,
        openModal, 
        setOpenModal, 
        totalTodos, 
        completedTodos,
        searchValue, 
        setSearchValue,
        addTodo,
} = useTodos()
return (
    <React.Fragment>
        <TodoSection>
            <CreateTodoButton setOpenModal={setOpenModal}/>
            <TodoForm
                    addTodo={addTodo}
                    setOpenModal={setOpenModal}
                />
        </TodoSection>
        <TodoHeader>
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
            render={todo => (
                <TodoItem 
                    key={todo.text} 
                    text={todo.text} 
                    completed={todo.completed}
                    onComplete={() => completeTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                />
            )}
        />

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
    </React.Fragment>
    );
};

export default App;
