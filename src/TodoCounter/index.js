import React from "react";
import { TodoContext } from "../TodoContext";
import './TodoCounter.css'

// Desestructuramos los props que pasamos al componente
function TodoCounter() {
    const { totalTodos, completedTodos} = React.useContext(TodoContext)
    return (
        <h2 className="TodoCounter">
            Has completado {completedTodos} de {totalTodos} TODOs
        </h2>
    );
};

export  { TodoCounter };