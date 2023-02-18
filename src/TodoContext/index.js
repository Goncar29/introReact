import React from 'react';
import { useLocalStorage } from './useLocalStorage';

// Al crear el contexto también podemos pasarle un valor inicial entre los paréntesis
const TodoContext = React.createContext();

function TodoProvider(props){
    // Nos traemos todo el estado y las funciones de nuestra aplicación que queremos globales
    // Desestructuramos los datos que retornamos de nuestro custom hook, y le pasamos los argumentos que necesitamos (nombre y estado inicial)
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);

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
    
  // Retornamos nuestro proveedor con nuestro contexto en la etiqueta value, que recibirá a toda nuestra aplicación, por eso necesitamos la prop children
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

// Exportamos nuestro proveedor y nuestro contexto, en el context también esta el consumer, para acceder a nuestro contexto
export { TodoContext, TodoProvider };