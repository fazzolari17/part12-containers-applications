import React from 'react';

const Todo = ({ todo, onClickDelete, onClickComplete }) => {

  const todoDoneMessage = 'This todo is done';
  const todoNotDoneMessage = 'This todo is not done';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
      }}
    >
      <span>{todo.text}</span>
      <span>{todo.done ? todoDoneMessage : todoNotDoneMessage}</span>
      <span>
        <button onClick={onClickDelete}> Delete </button>
        {todo.done ? <></> : <button onClick={onClickComplete}> Set as done </button>}
      </span>
    </div>
  );
};

export default Todo;