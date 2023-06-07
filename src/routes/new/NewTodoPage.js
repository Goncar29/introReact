import React from 'react'
import { TodoForm } from '../../ui/TodoForm'

function NewTodoPage() {
    return (
        <TodoForm
            label="Escribe tu nuevo TODO"
            submitText="Añadir"
            submitEvent={()=> console.log('llamar a addTodo')}
        />
    )
}

export { NewTodoPage }