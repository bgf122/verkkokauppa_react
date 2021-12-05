import React from 'react';
import { useNavigate } from 'react-router-dom';
import './shoppingCart.css'

function ShoppingCart(props) {
    const navigate = useNavigate()
    var totalSum = undefined;

    for (let i = 0; i < props.shoppingCart.length; i++) {
        if (totalSum === undefined) {
            totalSum = 0
            totalSum = totalSum + props.shoppingCart[i].price
        } else {
            totalSum = totalSum + props.shoppingCart[i].price

        } 
    }



    return (
        <div className='shoppingCartContainer'>
            <div className='productList'>
                {props.shoppingCart.map((product, index) => 
                <div className='shoppingCartItems' key={index}>
                    <p className='shoppingCartItemName'>
                        {product.name}
                    </p>
                    <p className='shoppingCartItemDescription'>
                        {product.productDescription}
                    </p>
                    <p className='shoppingCartItemPrice'>
                        {product.price} €
                    </p>
                </div>
                )}
                <p className='sumLine'>
                    {totalSum ? 'Yhteensä: ' + totalSum.toFixed(2) + ' €' : ''}
                    
                </p>
            </div>
            <div className='productListFooter'>
                <p className='footerPay'>Maksamaan</p>
                <p className='footerContinue' onClick={() => navigate('/tuotteet')}>Jatka ostoksia</p>
                <p className='footerEmpty' onClick={() => props.setShoppingCart([])}>Tyhjennä ostoskori</p>
            </div>
        </div>
    )
}

export default ShoppingCart;