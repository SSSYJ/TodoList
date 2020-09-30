import React, {useState} from 'react';
import './InputArea.css';

function InputArea(props){
    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }


    return (
        <div className="form">
            <input type="text" onChange={handleChange} value={inputText} />
            <button 
                onClick={() => {
                    props.onAdd({content:inputText});
                    setInputText("");
                }}>
                <span>+</span>
            </button>
        </div>
    )
}

export default InputArea;