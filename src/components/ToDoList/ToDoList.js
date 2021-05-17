import React from 'react';
import ToDoListItem from '../ToDoListItem';
import './ToDoList.css';

const ToDoList = ( { items, onDeleted, onToggleImportant, onToggleDone }) => { 

  const elements = items.map((item) => {

    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <ToDoListItem 
          { ...itemProps } 
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}/>
      </li>
    )
  })

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  )
}

export default ToDoList;