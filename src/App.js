import React from "react";
// import './App.css';

const todos = [
    { text: 'Cortar cebolla', completed: false },
    { text: 'Tomar el curso de intro a React', completed: false },
    { text: 'Llorar con la llorona', completed: false },
];

function App() {
    return (
        <React.Fragment>
            {/* <TodoCounter /> */}
            <h2>Has completado 2 de 3 TODOs</h2>
            {/* <TOdoSearch /> */}
            <input placeholder="Cebolla"></input>
            {/* <TodoList>
                {todos.map(todo => (
                    <TodoItem />
                ))}
            </TodoList> */}

            {/* <CreateTodoButton /> */}
            <button>+</button>
        </React.Fragment>
    );
}

export default App;
