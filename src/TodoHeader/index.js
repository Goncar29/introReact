import React from "react";
import './TodoHeader.css'

function TodoHeader({ children }){
    return (
        <header>
            {children}
        </header>
    );
}

export { TodoHeader }