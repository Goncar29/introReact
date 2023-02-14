import React from "react";
import { AppUI } from "./AppUI";
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
    // El estado de nuestra búsqueda
    const [searchValue, setSearchValue] = React.useState('');

    // Cantidad de TODOs completados
    const completedTodos = todos.filter(todo => !!todo.completed).length;
    // Cantidad total de TODOs
    const totalTodos = todos.length;

    // Creamos una nueva variable en donde guardaremos las coincidencias con la búsqueda
    let searchedTodos = [];

    // Lógica para filtrar, si el valor del input es 0 renderiza todos sino renderiza lo demas 
    if(!searchValue.length >= 1){
        searchedTodos = todos;
    } else{
        //Si escribimos en el buscador lo
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase()
            const searchText = searchValue.toLowerCase()
            return todoText.includes(searchText)
        })
    }

    //Cada vez que reciba un texto va a buscar en toda la lista de todo cual todo cumple con la condicion
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        // creamos una nueva lista de todos (las mismas)
        const newTodos = [...todos];
        //y marcamos a ese todo que cumple con la condicion el valor true
        newTodos[todoIndex].completed = true;
        // despues mandamos a renderizar el nuevo estado
        setTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        // creamos una nueva lista de todos (las mismas)
        const newTodos = [...todos];
        //con el metodo splice quitamos el todo
        newTodos.splice(todoIndex, 1)
        // despues mandamos a renderizar el nuevo estado
        setTodos(newTodos);
    };

    return (
        <AppUI 
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchedTodos={searchedTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
        />
    );
}

export default App;
