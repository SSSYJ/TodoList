import React from "react";
import { Link } from "react-router-dom";
import "./ListBox.css";

function ListBox(props) {
  return (
    <span className="list-box">
      <Link to={`/lists/${props.list._id}`}>
        <h1>{props.list.title}</h1>
      </Link>
      <ul>
        {props.list.tasks.map((task, id) => {
          if (id < 2) {
            return (
              <li key={task._id} className="task">
                {task.content}
              </li>
            );
          }
          if (id === 2) {
            return <li className="ellipsis">......</li>;
          }
        })}
      </ul>
    </span>
  );
}

export default ListBox;
