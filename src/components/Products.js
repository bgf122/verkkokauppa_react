import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './products.css'

function Products() {
    const [products, setProducts] = useState([])
    const url = "https://verkkokauppa-bgf.herokuapp.com/api/"
    const navigate = useNavigate()

    useEffect(() => {
        fetch(url+'products')
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])
   

    return (
        <div className='productContainer'>
            {products.map((product, index) => 
                <div
                    className='productCard' 
                    key={index}> 
                    <div
                        className='imageWrapper'
                        style={{backgroundImage: `url(data:image/png};base64,${Buffer(product.images[0].image.data.data).toString('base64')})`}}/>
                    <div className='productWrapper' onClick={() => navigate('/tuote', {state: product})}>
                        <p className='productDescription'>{product.name}</p>
                        <p className='productLink'>Katso tuotetta</p>
                    </div>
                    
                </div>)}
        </div>
    )
}

export default Products;