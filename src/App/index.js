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
    // Traemos nuestros TODOs almacenados
    const localStorageTodos = localStorage.getItem('TODOS_V1');
    let parsedTodos;

    if (!localStorageTodos){
        // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
        localStorage.setItem('TODOS_V1', JSON.stringify([]));
        parsedTodos = [];
    }else {
        // Si existen TODOs en el localStorage los regresamos como nuestros todos
        parsedTodos = JSON.parse(localStorageTodos);
    }


    // Guardamos nuestros TODOs del localStorage en nuestro estado
    const [todos, setTodos] = React.useState(parsedTodos);
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
    
  // Creamos la función en la que actualizaremos nuestro localStorage
    const saveTodos = (newTodos) => {
        // Convertimos a string nuestros TODOs
        const stringifiedTodos = JSON.stringify(newTodos);
        // Los guardamos en el localStorage
        localStorage.setItem('TODOS_V1', stringifiedTodos);
        // Actualizamos nuestro estado
        setTodos(newTodos)
    }

    //Cada vez que reciba un texto va a buscar en toda la lista de todo cual todo cumple con la condicion
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        // creamos una nueva lista de todos (las mismas)
        const newTodos = [...todos];
        //y marcamos a ese todo que cumple con la condicion el valor true
        newTodos[todoIndex].completed = true;
        // despues mandamos a renderizar el nuevo estado
        saveTodos(newTodos); 
        // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        // creamos una nueva lista de todos (las mismas)
        const newTodos = [...todos];
        //con el metodo splice quitamos el todo
        newTodos.splice(todoIndex, 1)
        // despues mandamos a renderizar el nuevo estado
        saveTodos(newTodos);
        // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
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
