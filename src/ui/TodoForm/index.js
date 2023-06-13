import React from "react";
import "./TodoForm.css"
import { useNavigate } from "react-router-dom";

function TodoForm( props ) {
    const navigate = useNavigate();
    // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || '');
    // Desestructuramos las funciones que necesitamos para añadir un TODO y cerrar nuestro modal
    
  // Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    };
    // Función para cerrar el modal
    const onCancel = () => {
        navigate('/');
    };
    // Función para agregar nuestro nuevo TODO
    const onSubmit = (event) => {
        // prevent default para evitar recargar la página
        event.preventDefault();
        // Utilizamos nuestra función para añadir nuestro TODO
        props.submitEvent(newTodoValue)
        // También estaría bien resetear nuestro formulario
        setNewTodoValue('')
        // Cerramos nustro modal
        navigate('/');
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label>{props.label}</label>
            <textarea 
                value={newTodoValue}
                onChange={onChange}
                placeholder="Nueva tarea..."
            />
            <div className="TodoForm-buttonContainer">
                <button 
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button 
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    {props.submitText}
                </button>
            </div>
        </form>
    );
}

export { TodoForm };