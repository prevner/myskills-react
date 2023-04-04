import { useState } from 'react';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Content from './components/Content/Content';
import AddItem from './components/Content/AddItem';
import SearchItem  from './components/Search/SearchItem';

function App() {

  //useState
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [newItem, setNewItem] = useState('');
  
  const [search,setSearch] = useState ('')
  //implement functions

  const setAndSaveItems = (newItems)=>{
    setItems(newItems);
    localStorage.setItem('shoppinglist',JSON.stringify(newItems))
  }
 const addItem = (item)=>{
    // generate a new id
    const id = items.length ? items[items.length -1].id + 1: 1;
    console.log(id);

    //myNewItem
    const myNewItem = {id,checked:false,item};
   
    //add myNewItem to a list 
    const listItems = [...items,myNewItem];
    setAndSaveItems(listItems)

 }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
      
    //verify is the value isn't empty
    if(!newItem) return;
    //add item : set a new item
    addItem(newItem);
    setNewItem('');

        
  }
  return (
    <div className="App">
       <Header 
          title={"Groceries list"}
        />
      
       <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
       />
       <SearchItem 
         search = {search}
         setSearch = {setSearch}
      />

       <Content
           items={items.filter(item=>(item.item).toLowerCase().includes(search.toLocaleLowerCase()))}
           handleCheck={handleCheck}
           handleDelete={handleDelete}
       />

       <Footer 
          length={items.length} 
        />
    </div>
  );
}

export default App;
