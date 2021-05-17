import React, { useState, useEffect } from 'react';

import ToDoList from '../ToDoList';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import createTodoItem from '../App/functions/createTodoItem';
import LocalService from '../../services/localService';

const { getLocal, setLocal } = new LocalService();

const initState = {
  items: [],
  filter: 'all',
  search: ''
}

const App = () => {

  const [store, setStore] = useState(initState);

  useEffect(() => {
    const items = getLocal();
    setStore({...store, items});
    // eslint-disable-next-line
}, []); 

  const deleteItem = (id) => {
    const newArray = store.items.filter((el) => el.id !== id);
    setLocal(newArray);
    setStore((store) => ({ ...store, items: newArray}));
  }

  const onItemAdded = (text) => {
    const newItem = createTodoItem(text);
    const newArray = [...store.items, newItem];
    setLocal(newArray);
    setStore((store) => ({ ...store, items: newArray}));
  }

  const toggleProperty = (arr, id, propName) => {
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

  const onToggleImportant = (id) => {
    const items = toggleProperty(store.items, id, 'important');
    setLocal(items);
    setStore(store => ({ ...store, items }))
  }

  const onToggleDone = (id) => {
    const items = toggleProperty(store.items, id, 'done');
    setLocal(items);
    setStore(store => ({ ...store, items }));
  }

  const onSearchChange = (search) => {
    setStore({ ...store, search });
  };

  const searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  const onFilterChange = (filter) => {
    setStore({ ...store, filter });
    
  };

  const filterItems = (items, filter) => {
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

    const { items, search, filter } = store;

    const doneCount = items.filter(el => el.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = searchItems(filterItems(items, filter), search)

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={onSearchChange}/>
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={onFilterChange}/>
        </div>
  
        <ToDoList items={visibleItems}
        onDeleted={deleteItem} 
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}/>

        <ItemAddForm 
        onItemAdded={onItemAdded}/>
      </div>

    )
}

export default App;
