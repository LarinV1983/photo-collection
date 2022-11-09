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
const [page, setPage] = React.useState(0);

React.useEffect(() => {
  setIsLoading(true);

  fetch(`http://localhost:3002/collection?_page=${page}&_limit=3&
    ${categoryId ? `category=${categoryId}` : ''}`,
    )
  .then((res )=> res.json())
  .then((json )=> {
    setCollections(json);
  })
  .catch((err) => {
    console.warn(err);
    alert('Ошибка при получении данных');
  })
  .finally(() => setIsLoading(false));
}, [categoryId, page]);

  return (
    <div className="App">
    <h1>Моя коллекция фотографий</h1>
    <div className='top'>
    <ul className='tags'>
   {cats.map((obj, i) => (
    <li onClick={()=> setCategoryId(i)}
    className={categoryId === i ? 'active' : ''} 
    key={obj.name}>
    {obj.name}
    </li>
    ))}
    </ul>
     <input value ={searchValue} 
     onChange={(e) => setSearchValue(e.target.value)} 
     className='search-input' type="text" 
     placeholder='Поиск по названию'/> 
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
      {
        [...Array(4)].map((_, i) => (
          <li onClick={()=> setPage(i + 1)} 
          className={page === i + 1 ? 'active' : ''} key={i}>
          {i + 1}
          </li>
      ))
      }
    </ul>
    </div>
  );
}

export default App;
