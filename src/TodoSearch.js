import React from "react";
import './TodoSearch.css'

function TodoSearch(){
    const [searchValue, setSearchValue] = React.useState('Juan');

    const onSearchValueChanged = (event) => {
        console.log(event.target.value)
        setSearchValue(event.target.value)
    }
    return [
        <input 
            className="TodoSearch" 
            placeholder="Cebolla" 
            value={searchValue}
            onChange={onSearchValueChanged}
        />,
        <p>{searchValue}</p>
    ];
};

export { TodoSearch };