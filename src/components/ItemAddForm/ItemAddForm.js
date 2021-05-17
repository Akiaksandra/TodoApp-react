import React, { useState }from 'react';

import './ItemAddForm.css';

const ItemAddForm = (props) => {

  const [label, setLabel] = useState('');

  const onSubmit= (e) => {
    e.preventDefault();
    props.onItemAdded(label);
    setLabel('')
  }

  const onLabelChange = (e) => {
    let text = e.target.value;
    setLabel(text);
  }

  return (
    <form 
      className="item-add-form d-flex"
      onSubmit={onSubmit}
    >
      <input 
        type="text" 
        className="form-control"
        onChange={onLabelChange}
        placeholder="What you want to do?"
        value={label}
      />
      <button 
      className="btn btn-outline-secondary">
        Add Item</button>
    </form>
  )
}

export default ItemAddForm