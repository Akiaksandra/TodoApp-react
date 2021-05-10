import React, { Component } from 'react';

import './ItemAddForm.css';

class ItemAddForm extends Component {

  state = {
    label: ""
  }

  onSubmit= (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: "" })
  }

  onLabelChange = (e) => {
    let text = e.target.value;
    this.setState(({label: text}))
  }

  render() {
    return (
      <form 
        className="item-add-form d-flex"
        onSubmit={this.onSubmit}
      >
        <input 
          type="text" 
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What you want to do?"
          value={this.state.label}
        />
        <button 
        className="btn btn-outline-secondary">
          Add Item</button>
      </form>
    )
  }
}

export default ItemAddForm