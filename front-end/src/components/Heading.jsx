import React, { useState, useRef, useEffect } from 'react';
import './Heading.css';

function Heading(props){
    const [title, setTitle] = useState(props.title);
    const [isEdit, setIsEdit] = useState(false);
    const node = useRef();

    useEffect(()=>{
        setTitle(props.title);
    }, [props.title])

    const titleHandler = event =>{
        setTitle(event.target.value);
    }

    const clickHandler = (event) => {
        if (node.current && !node.current.contains(event.target)){
            setIsEdit(false);
        }
    }
    if (isEdit){document.body.addEventListener('click', clickHandler);}

    return (
        
            <span className="heading">
                {isEdit ? 
                    <span ref={node} className="heading">
                        <input onChange={titleHandler} value={title} />
                        <button onClick={() => {
                            props.editList(props.id,{title: title});
                            setIsEdit(false);
                            }}> Edit </button>
                    </span> 
                    :
                    <h1 className="heading" onClick={() => setIsEdit(true)}>
                        {props.title}
                    </h1>
                }
                
            </span>
            

    );
}

export default Heading;