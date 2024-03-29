import React from "react";
import './TodoList.css'

function TodoList(props){
    // con la siguiente var usamos si queremos usar render props o function desde App/index
    const renderFunc = props.children || props.render;

    return (
        <section className="TodoList-container">
            {props.error && props.onError()}
            {props.loading && props.onLoading()}
            
            {(!props.loading && !props.totalTodos) && props.onEmptyTodos()}
            
            {(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)}

            {(!props.loading && !props.error) && props.searchedTodos.map(renderFunc)}
            
            <ul>
                {props.children}
            </ul>
        </section>
    );
}

export { TodoList };