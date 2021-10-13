import './App.css';
import ItemFilteredList from './components/ItemFilteredList/ItemFilteredList';
import ItemList from './components/ItemList/ItemList'
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="nav-bar-sale">On sale</div>
      <ItemFilteredList></ItemFilteredList>
      <div className="nav-bar">All Products</div>
      <ItemList></ItemList>
    </div>
  );
}

export default App;
