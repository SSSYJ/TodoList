import React from 'react';
import Task from './Task';
import './TaskList.css';

function TaskList(props){
    return (
        <ul>
            {props.loading && <p>Loading ...</p>}
            {props.tasks.map((task) => {
                return(
                <Task 
                    key={task._id}
                    id={task._id}
                    task={task.content} 
                    onDelete={props.onDelete}
                    onEdit={props.onEdit}
                />);
            })}
        </ul>
    );
}

export default TaskList;