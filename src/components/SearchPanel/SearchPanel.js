import React, { useState } from 'react';

import './SearchPanel.css';

const SearchPanel = (props) => {

  const [term, setTerm] = useState('');

  const onTermChange = (e) => {
    setTerm(e.target.value)
    props.onSearchChange(e.target.value);
  }

  return (
  <input type="text"
          className="form-control search-input"
          placeholder="type to search" 
          value={term}
          onChange={onTermChange }/>
  )       
};

export default SearchPanel;