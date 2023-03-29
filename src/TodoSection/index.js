import React from "react";
import './TodoSection.css'

function TodoSection({addTodo, loading, children }) {

    React.Children
        .toArray(children)
        .map(child => React.cloneElement(child, { loading }))


      // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue] = React.useState('');
    // Desestructuramos las funciones que necesitamos para añadir un TODO y cerrar nuestro modal
    
  // Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    };
    // Función para agregar nuestro nuevo TODO
    const onSubmit = (event) => {
        // prevent default para evitar recargar la página
        event.preventDefault();
        // Utilizamos nuestra función para añadir nuestro TODO
        addTodo(newTodoValue)
        // También estaría bien resetear nuestro formulario
        setNewTodoValue('')
    }
    return(
            <form onSubmit={onSubmit} className='form' >
                <label>Escribe tu nuevo TODO</label>
                <textarea className="form-tarea"
                    value={newTodoValue}
                    onChange={onChange}
                    placeholder="Nueva tarea..."
                    disabled={loading}
                />
                <button 
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Añadir
                </button>
                <img alt="imagen" src="https://i.pinimg.com/564x/7d/5d/e6/7d5de604779b913734a056db644899f6.jpg" />
            </form>
    );
}

export { TodoSection };