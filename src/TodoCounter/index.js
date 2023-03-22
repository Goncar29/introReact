import React from "react";
import './TodoCounter.css'

// Desestructuramos los props que pasamos al componente
function TodoCounter({ totalTodos, completedTodos }) {
    return (
        <h2 className="TodoCounter">
            Has completado {completedTodos} de {totalTodos} TODOs
        </h2>
    );
};

export  { TodoCounter };