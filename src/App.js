import React from 'react';
import Collection from './components/collection';
import './index.scss';

function App() {
const [searchValue, setSearchValue] = React.useState('');
const [collections, setCollections] = React.useState([]);

React.useEffect(() => {
  fetch('')
  .then((res)=> res.json())
  .then((json) => {
    setCollections(json);
  })
  .catch((err) => {
    console.warn(err);
    alert('Ошибка при получении данных');
  });
}, []);

  return (
    <div className="App">
    <h1>Моя коллекция фотографий</h1>
    <div className='top'>
    <ul className='tags'>
      <li className='active'>Все</li>
      <li>Горы</li>
      <li>Море</li>
      <li>Архитектура</li>
      <li>Города</li>
    </ul>
     <input value ={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
     className='search-input' type="text" placeholder='Поиск по названию'/> 
    </div>
    <div className='content'>
    {collections.filter((obj)=> {
      return obj.name.toLowerCase().includes(searchValue.toLowerCase());
    }).map((obj, index) => (
      <Collection
        key={index}
        name={obj.name}
        images={obj.photos}
        />
    ))}
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
