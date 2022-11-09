import React from 'react';
import Collection from './components/collection';
import './index.scss';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

function App() {
const [searchValue, setSearchValue] = React.useState('');
const [collections, setCollections] = React.useState([]);
const [categoryId, setCategoryId] = React.useState(0);
const [isLoading, setIsLoading] = React.useState(true);

React.useEffect(() => {
  setIsLoading(true);
  fetch(`http://localhost:3002/collections?
    ${categoryId ? `category=${categoryId}` : ''}`,
    )
  .then((res)=> res.json())
  .then((json) => {
    setCollections(json);
  })
  .catch((err) => {
    console.warn(err);
    alert('Ошибка при получении данных');
  })
  .finally(() => setIsLoading(false));
}, [categoryId]);

  return (
    <div className="App">
    <h1>Моя коллекция фотографий</h1>
    <div className='top'>
    <ul className='tags'>
   {cats.map((obj, index) => (
    <li onClick={()=> setCategoryId(index)}
    className={categoryId === index ? 'active' : ''} 
    key={obj.name}>
    {obj.name}
    </li>
    ))}
    </ul>
     <input value ={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
     className='search-input' type="text" placeholder='Поиск по названию'/> 
    </div>
    <div className='content'>
   {isLoading ? (<h2>ИДЕТ ЗАГРУЗКА ...</h2>
      ) : (
       collections.filter((obj)=> {
      return obj.name.toLowerCase().includes(searchValue.toLowerCase());
    }).map((obj, index) => (
      <Collection
        key={index}
        name={obj.name}
        images={obj.photos}
        />
    )))}
    </div>
    <ul className='pagination'>
      <li>1</li>
      <li className='active'>2</li>
      <li>3</li>
    </ul>
    </div>
  );
}

export default App;
