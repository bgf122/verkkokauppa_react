import React, { useState } from "react";
import ShoppingCart from './components/ShoppingCart';
import Products from './components/Products';
import ProductPage from './components/ProductPage'
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import CustomAppBar from './components/CustomAppBar'


function App() {
  const [shoppingCart, setShoppingCart] = useState([])

  return (
    <div>
      <CustomAppBar shoppingCart={shoppingCart}/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/tuotteet" element={<Products/>}/>
        <Route path="/tuote" element={<ProductPage shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>}/>
        <Route path="/ostoskori" element={<ShoppingCart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>} />
        <Route render={() => <h1>Sivua ei löydy!</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
