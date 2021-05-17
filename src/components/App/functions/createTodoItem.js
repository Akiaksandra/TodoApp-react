const createTodoItem = (label) => {
  return {
    label, 
    important: false,
    id: Math.floor(Math.random()*20), 
    done: false
  }
}

export default createTodoItem;