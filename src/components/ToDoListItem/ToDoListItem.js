import React from 'react';

import './ToDoListItem.css';

const ToDoListItem = ({ important, done,
  label, onToggleImportant, onToggleDone, onDeleted }) =>  {

    let classNames = 'todo-list-item';
    if (done) classNames += ' done';
    if (important) classNames += ' important';
  
    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}>
          {label}
        </span>
        <div className="todo-list-item-buttons">
        <button type="button"
                className="btn btn-outline-success btn-sm custom-button"
                onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
        </div>
      </span>
    )
  }


export default ToDoListItem;