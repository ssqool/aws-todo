import React from 'react';
import {RiCloseCircleLine} from "react-icons/all";

const Todo = ({ todos, completeTodo, removeTodo }) => {

  // console.log(todos);

  return (
    <div className="todo-items">
      {todos.map((todo, index) => (
        <div className={todo.statement ? 'todo-row complete' : 'todo-row'}
             key={index}
        >
          {index + 1}
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
              {todo.name}
            </div>
            <div className='icons'>
              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className='delete-icon'
                />
          </div>

        </div>
      ))}
    </div>
  )
}

export default Todo;
