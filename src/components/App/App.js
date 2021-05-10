import React, { Component } from 'react';

import ToDoList from '../ToDoList';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

class App extends Component {

  state = {
    items: [],
    filter: 'all',
    search: '',
  }

  maxId = null;

  getLocal = () => {
    if (localStorage.getItem('items')) {
      // Добавляем все данные из localStaroge в наш массив
      this.setState( ( state ) => {
        const items = [...JSON.parse(localStorage.getItem('items'))] 
        return { items }
      })
    } else {
      this.setState( ( state ) => {
        const items = [
          this.createTodoItem('One'),
          this.createTodoItem('Two'),
          this.createTodoItem('Three'),
        ]
        return { items }
      })
    }
  };

  setLocal = () => {
    localStorage.setItem('items', JSON.stringify(this.state.items));
  }

  createTodoItem(label) {
    return {
      label, 
      important: false,
      id: ++this.maxId, 
      done: false
    }
  }
  deleteItem = async (id) => {
    await this.setState(({ items }) => {
      // Через фильтрацию, не изменяя исходны массив
      const newArray = items.filter((el) => el.id !== id);
      return {
        items: newArray
      }
    })
    this.setLocal();
  }

  onItemAdded = async (text) => {
    const newItem = this.createTodoItem(text);
    await this.setState(({ items }) => {
      const newArray = [...items, newItem];
      return {
        items: newArray
      }
    })
    this.setLocal();
  }

  onToggleImportant = async (id) => {
    await this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    })
    this.setLocal();
  }

  onToggleDone = async (id) => {
    await this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    })
    this.setLocal();
  }

  toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      const newArray = [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
      return newArray;
    }

  onSearchChange = (search) => {
    this.setState({ search });
  };

  searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems = (items, filter) => {
    switch(filter) {
      case ('all'): 
        return items;
      case ('active'): 
        return items.filter(item => !item.done)
      case ('done'): 
        return items.filter(item => item.done)
      default: break;    
    }
  };

  async componentDidMount() {
    await this.getLocal();
    this.maxId = this.state.items[this.state.items.length - 1].id
  }

  render () {

    const { items, search, filter } = this.state;

    const doneCount = items.filter(el => el.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(this.filterItems(items, filter), search)

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>
  
        <ToDoList items={visibleItems}
        onDeleted={this.deleteItem} 
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}/>

        <ItemAddForm 
        onItemAdded={this.onItemAdded}/>
      </div>

    )
  }
}

export default App;
