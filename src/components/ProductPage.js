import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './productPage.css'

function ProductPage(props) {
    const state = useLocation()
    const product = state.state
    const shoppingCart = props.shoppingCart
    const navigate = useNavigate()
    
    return (
        <div className='container'>
            <div className='imageContainer'>
                <img 
                    src={`data:image/png};base64,${Buffer(product.images[0].image.data.data).toString('base64')}`}
                    alt={product.name}/>
            </div>
            <div className='productInfoContainer'>
                <div className='productHeader'>
                    <h1>{product.name}</h1>
                </div>
                <div className='productInfo'>
                    {product.productDescription}
                </div>
                <div className='productPrice'>
                    <p>{product.price} €</p>
                </div>
                <div className='productOptions'>
                    <p className='addToBasket' onClick={() => props.setShoppingCart([...shoppingCart, product])}>Lisää ostoskoriin</p>
                    <p className='continueShopping' onClick={() => navigate('/tuotteet')}>Jatka ostoksia</p>
                </div>

            </div>
        </div>
    )
}

export default ProductPage