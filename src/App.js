import { useState,useEffect } from 'react';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Content from './components/Content/Content';
import AddItem from './components/Content/AddItem';
import SearchItem  from './components/Search/SearchItem';

function App() {

  //API URL
   const API_URL = 'http://localhost:3500/items';
  //useState
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');  
  const [search,setSearch] = useState ('')


  useEffect(()=>{
    const fetchItems = async()=>{
      try {
          const response = await fetch(API_URL); 
          const listItems = await response.json();
          console.log(listItems);
          setItems(listItems);
      } catch (error) {
         console.log(error.stack)
      }
    }
    (async()=>fetchItems())();
  },[])
 
  


  //implement functions

/*   const setAndSaveItems = (newItems)=>{
    setItems(newItems);
    
  } */
 const addItem = (item)=>{
    // generate a new id
    const id = items.length ? items[items.length -1].id + 1: 1;
    
    //myNewItem
    const myNewItem = {id,checked:false,item};
   
    //add myNewItem to a list 
    const listItems = [...items,myNewItem];
    setItems(listItems)

 }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)
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
