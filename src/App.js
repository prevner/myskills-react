import { useState } from 'react';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Content from './components/Content/Content';


function App() {
  const [items, setItems] = useState([
    {
      id :1,
      checked : true,
      item : "First item"
    },
    {
      id :2,
      checked : false,
      item : "Second item"
    },
    {
      id :3,
      checked : false,
      item : "Third item"
    }
  ]);
  
  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem('shoppinglist',JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppinglist',JSON.stringify(listItems))
  }
  return (
    <div className="App">
       <Header 
          title={"Groceries list"}
        />
       <Content
       items={items}
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
