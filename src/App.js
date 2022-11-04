import './App.css';

function App() {
  return (
    <div className="App">
    <h1></h1>
    <div className='top'>
    <ul className='tags'>
      <li className='active'>Все</li>
      <li>Горы</li>
      <li>Море</li>
      <li>Архитектура</li>
      <li>Города</li>
    </ul>
     <input className='search-input' type="text" placeholder='Поиск по названию'/> 
    </div>
    <div className='content'>
      коллекция
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
