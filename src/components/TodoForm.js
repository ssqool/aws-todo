import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = (props) => {
  const [input, setInput] = useState('');

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: uuidv4(),
      name: input,
      statement: false
    })

    setInput('');
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input type='text'
             placeholder='Add a todo'
             value={input}
             name='name'
             className='todo-input'
             onChange={handleChange}
             ref={inputRef}
      />
      <button className="todo-button">Add todo</button>
    </form>
  );
};

export default TodoForm;
