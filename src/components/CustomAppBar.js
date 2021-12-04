import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddProduct from './AddProduct';
import { useNavigate } from "react-router-dom";

function CustomAppBar() {
    const url = "https://verkkokauppa-bgf.herokuapp.com/api/"
    const [eventOpen, setEventOpen] = useState(false)
    const navigate = useNavigate()

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
        <div>
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                <IconButton
                    color="inherit"
                    onClick={handleEventOpen}
                    edge="start"
                > 
                    <MenuIcon />
                </IconButton >
                <div style={{marginLeft: '25%', marginRight: '25%',width: "100%", justifyContent: 'space-between', display: 'flex'}}>
                    <IconButton 
                        color="inherit"
                        onClick={() => navigate('/tuotteet')}>
                        <Typography variant='h5'>
                            Tuotteet
                        </Typography>
                    </IconButton>
                    <IconButton 
                        color="inherit"
                        onClick={() => navigate('/')}>
                        <Typography variant='h5'>
                            Verkkokauppa
                        </Typography>
                    </IconButton>
                </div>
                <IconButton
                    color="inherit"
                    edge="end"
                    >
                    <ShoppingCartIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <AddProduct 
                categories={categories} 
                setCategories={setCategories} 
                handleEventOpen={handleEventOpen} 
                handleEventClose={handleEventClose}
                eventOpen={eventOpen}
                url={url}/>
        </div>
    )
}

export default CustomAppBar