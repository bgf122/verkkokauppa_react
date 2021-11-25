import './App.css';
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddProduct from './components/AddProduct';

function App() {
  const url = "https://verkkokauppa-bgf.herokuapp.com/api/"
  const [eventOpen, setEventOpen] = useState(false)

  const handleEventOpen = () => {
    setEventOpen(true);
  };

  const handleEventClose = () => {
    setEventOpen(false);
  };

  useEffect(() => {
    fetch(url+'categories')
    .then(response => response.json())
    .then(data => setCategories(data))
  }, [])

  const [categories, setCategories] = useState([{
    _id: '',
    name: ''
  }])


  return (
    <div className="App">
      <Button onClick={handleEventOpen}>
        OPEN
      </Button>
      <AddProduct 
        categories={categories} 
        setCategories={setCategories} 
        handleEventOpen={handleEventOpen} 
        handleEventClose={handleEventClose}
        eventOpen={eventOpen}
        url={url}/>
    </div>
  );
}

export default App;
