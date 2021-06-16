import React, {useState, useEffect} from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  console.log(todos);

  // console.log(todos);

  const lambdaAws = async () => {
    const url = `https://s5gg3ejdsd.execute-api.eu-west-1.amazonaws.com/dev/todos`;
    const response = await fetch(url);
    const data = await response.json();
    try {
      setTodos(data.Items);
    } catch(err) {
      console.log(err);
      alert('character with given name not found');
    }
  }

  useEffect(() => {
    lambdaAws()
  }, []);

  const addTodo = todo => {
    if (!todo.name || /^\s*$/.test(todo.name)) {
      return;
    }

    const lambdaAwsDelete = async (type, id, name, statement) => {
      const url = `https://s5gg3ejdsd.execute-api.eu-west-1.amazonaws.com/dev/todos`;
      const requestOption = {
        method: type,
        body: {
          id: id,
          name: name,
          statement: statement
        },
      };
      requestOption.body = JSON.stringify(requestOption.body);
      const response = await fetch(url, requestOption);
      const data = await response.json();
      try {
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
      } catch(err) {
        console.log(err);
        alert('character with given name not found');
      }
    }

    lambdaAwsDelete('POST', todo.id, todo.name, todo.statement);
  }

  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    // console.log(id);

    const lambdaAwsDelete = async (type, id) => {
      const url = `https://s5gg3ejdsd.execute-api.eu-west-1.amazonaws.com/dev/todos`;
      const requestOption = {
        method: type,
        body: {
          id: id,
        },
      };
      requestOption.body = JSON.stringify(requestOption.body);
      const response = await fetch(url, requestOption);
      const data = await response.json();
      try {
        setTodos(removeArr)
      } catch(err) {
        console.log(err);
        alert('character with given name not found');
      }
    }

    lambdaAwsDelete('DELETE', id)
  }

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.statement = !todo.statement;
      }


      return todo;
    });
    setTodos(updatedTodos)
  }

  return (
    <div>
      <h1>What's the Plan Today</h1>
      <TodoForm onSubmit={addTodo}/>
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo}/>
    </div>
  );
};

export default TodoList;
