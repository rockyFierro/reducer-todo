import React, { useReducer, useState } from "react";
//import useReducer, does magic dispatch thing

//reducer takes state, an action that describes an event and uses that to return a mutated copy of original state.
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((task, index) =>
        index === action.index ? { ...task, completed: !task.completed } : task
      ),
      
      };
      case "DELETE_TODO":
        return {
          todos: state.todos.filter((task) => !task.completed)
        };

    default:
      return state;
  }
}

function App() {
  //useReducer takes in a reducer, this one is a root and controls everything, it also takes in an initialState.
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
  const [text, setText] = useState();

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "ADD_TODO", text });
          setText("");
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button>Submit</button>
        <br />
        <button
        onClick={(e) => {
          e.preventDefault()
          dispatch({type: "DELETE_TODO"})
        }}
        
        >Clear Completed</button>
      </form>
      {todos.map((task, index) => (
        <div
          key={task.text}
          onClick={() => dispatch({ type: "TOGGLE_TODO", index })}
          style={{
            textDecoration: task.completed ? "line-through" : ""
          }}
        >
          {task.text}
        </div>
      ))}
    </div>
  );
}

export default App;