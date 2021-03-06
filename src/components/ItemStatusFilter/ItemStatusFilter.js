import React, { Component } from 'react';

import './ItemStatusFilter.css';

class ItemStatusFilter extends Component {

  filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  render() {

    const { filter, onFilterChange } = this.props;
    const buttons = this.filterButtons.map(({ name, label }) => {
      const isActive = name === filter;
      const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary');

      return (
        <button key={name}
              type="button"
              onClick={() => onFilterChange(name)}
              className={classNames}>{label}</button>
      )
      })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

export default ItemStatusFilter;