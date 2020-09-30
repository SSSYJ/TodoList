import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Heading from './Heading';
import InputArea from './InputArea';
import TaskList from './TaskList';
import './SingleList.css';


function SingleList(props){
    
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // GET LIST and TASKS
    useEffect(() =>{
        let unmount = false;
        axios
        .get(`/api/lists/${props.listId}`)
        .then(res => {
            if (!unmount){
            setList(res.data);
            setItems(res.data.tasks);}
        })
        .catch(err => !unmount && setError("ERROR: " + err.message))

        return () => unmount = true
        
    },[list, props.listId]);


    // ADD TASK 
    function addItem (newItem) {
        setIsLoading(true);
        axios
        .post(`/api/tasks/${props.listId}`, newItem)
        .then(res =>{
            setItems(prevItems => {
                return [...prevItems, {_id: res.data._id, ...newItem}];
            });
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }

    // EDIT TASK
    function editItem (id, editedItem) {
        setIsLoading(true);
        axios
        .patch(`/api/tasks/${props.listId}/${id}`, editedItem)
        .then(res =>{
            setItems(prevItems => {
                let updated = prevItems.find(item => item._id === id);
                updated.content = res.data.content;
                return prevItems;
            });
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }

    // DELETE TASK
    function deleteItem(id) {
        setIsLoading(true);
        axios
        .delete(`/api/tasks/${props.listId}/${id}`)
        .then(() => {
            setItems(prevItems =>{
                return prevItems.filter((item) => {
                    return item._id !== id;
                  });
            });
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }

    // CLEAR ERROR
    const clearErr = () => setError(null);


    return (
        <div className="container">
            <div>
                <Heading title={list.title} id={list._id} editList={props.editList} />
                <Link to="/">
                    <button className="delete-btn" onClick={() => {props.deleteList(list._id)}}>X</button>
                </Link>
            </div>
            <InputArea onAdd={addItem} />
            {error && <p onClick={clearErr}>{error} </p>}
            <TaskList tasks={items} onDelete={deleteItem} onEdit={editItem} loading={isLoading}/>
        </div>
    )
}

export default SingleList;