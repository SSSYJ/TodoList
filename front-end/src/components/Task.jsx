import React, { useState, useRef } from 'react';
import './Task.css';

function Task(props){
    const [isChecked, setChecked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [updated, setUpdated] = useState(props.task);
    const node = useRef();

    const editHandler = (event) => {
        setUpdated(event.target.value);
    }

    const clickHandler = (event) => {
        if (node.current && !node.current.contains(event.target)){
            setEdit(false);
        }
    }

    if (edit){document.body.addEventListener('click', clickHandler);}

    return (
        <li className={isChecked ? "checked" : null}>
            <input 
                className= "checkbox"
                type="checkbox" 
                onChange={() => {
                    setChecked(true);
                    setTimeout(()=>{
                        props.onDelete(props.id)
                        }, 200) 
                }}  
            />
            {edit ?  
                <span ref={node} >
                    <input onChange={editHandler} value={updated}/> 
                    <button onClick={() => {
                        props.onEdit(props.id, {content: updated});
                        setEdit(false);
                        }}>
                        Edit
                    </button>
                </span>
                :
                <span onClick={() => setEdit(true)}>
                    {updated}
                </span>
            }
        </li>
        
    );
}

export default Task;