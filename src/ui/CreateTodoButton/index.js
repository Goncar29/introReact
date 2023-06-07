import React from 'react';
import './CreateTodoButton.css'

function CreateTodoButton(props){
    
    // const onClickButton = () => {
    //     //cambiamos el estado de false a true al hacer click al boton
    //     props.setOpenModal(prevState => !prevState);
    // }
    return(
        <button 
            className='CreateTodoButton'
            onClick={props.onClick}
            // onClick={onClickButton}
        >
            +
        </button>
    );
}

export { CreateTodoButton };