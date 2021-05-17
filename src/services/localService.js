import createTodoItem from '../components/App/functions/createTodoItem';

export default class LocalService {

  setLocal = (data) => {
    localStorage.setItem('items', JSON.stringify(data));
  }  

  getLocal = () => {
    if (localStorage.getItem('items')) {
      // Добавляем все данные из localStaroge в наш массив
        const items = [...JSON.parse(localStorage.getItem('items'))] 
        return items;
    } else {
        const items = [
          createTodoItem('One'),
          createTodoItem('Two'),
          createTodoItem('Three'),
        ]
        console.log(items)
        return items;
    }
  };
}