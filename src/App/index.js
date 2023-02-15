import React from "react";
import { AppUI } from "./AppUI";
import './App.css';

// const defaultTodos = [
//     { text: 'Cortar cebolla', completed: true },
//     { text: 'Tomar el curso de intro a React', completed: false },
//     { text: 'Llorar con la llorona', completed: false },
//     { text: 'LALALALAA', completed: true },
// ];

// Recibimos como parámetros el nombre y el estado inicial de nuestro item.
function useLocalStorage(itemName, initialValue) {
    // Creamos el estado inicial para nuestros errores y carga
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);

    React.useEffect(() => {
        setTimeout(() => {
            try{
                // Guardamos nuestro item en una constante
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                // Utilizamos la lógica que teníamos, pero ahora con las variables y parámentros nuevos
                if (!localStorageItem){
                    // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                }else {
                    // Si existen TODOs en el localStorage los regresamos como nuestros todos
                    parsedItem = JSON.parse(localStorageItem);
                }

                setItem(parsedItem)
                setLoading(false);
            } catch(error){
                // En caso de un error lo guardamos en el estado
                setError(error);
            } finally {
                // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
                setLoading(false);
            }
        }, 1000)
    });
    



    // Creamos la función en la que actualizaremos nuestro localStorage
    const saveItem = (newItem) => {
        try{
            // Convertimos a string nuestros TODOs
            const stringifiedItem = JSON.stringify(newItem);
            // Los guardamos en el localStorage
            localStorage.setItem(itemName, stringifiedItem);
            // Actualizamos nuestro estado
            setItem(newItem)
        } catch(error){
            setError(error)
        }
    }
    // Regresamos los datos que necesitamos
    return {
        item,
        saveItem,
        loading,
        error,
    };
}


function App() {
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

    return (
        <AppUI 
            loading={loading}
            error={error}
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
