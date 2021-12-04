import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, List, ListItem } from "@mui/material";

function AddProduct(props) {
    const [imageFiles, setImageFiles] = useState([])
    const productPath = 'products'
    const imagePath = 'images'
    const [product, setProduct] = useState({
        name: '',
        categories: [{ _id: undefined, name: '' }], 
        price: 0,
        images: [{ _id: undefined }],
        productDescription: ''
    })

    const changeHandler = async (event) => {
		setImageFiles(event.target.files)
        addImages(event.target.files)
	}
      
    const handleInputChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value})
    }

    const categoryFunction = (event) => {
        if (product.categories[0]._id === undefined) {
            let category = [event.target.value]
            setProduct({...product,  [event.target.name]: category })
        } else {
            let category = [...product.categories]
            category.push(event.target.value)
            setProduct({...product,  [event.target.name]: category })
        }
    }

    const addFunction = async () => {
        try {
            console.log(JSON.stringify(product))
            fetch(props.url+productPath, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
            props.handleEventClose()
        } catch(err) {
            console.log(err)
        } 
    }

    const clear = () => {
        setProduct({
            name: '',
            categories: [{ _id: undefined, name: '' }], 
            price: 0,
            images: [{ _id: undefined }],
            productDescription: ''
        })
        setImageFiles([])
    }

    const addImages = async (images) => {
        var productImages = []
        for (let i = 0; i < images.length; i++) {

            let formData = new FormData()
            formData.append('image', images[i])

            console.log(formData.get('image'))
            if (i === 0) {
                productImages.pop()
                fetch(props.url+imagePath, {
                    method: 'Post',
                    body: formData
                })
                .then(res => res.json())
                .then(data => productImages.push({'_id' : data}))
                .catch(err => console.log(err)); 
            } else {
                fetch(props.url+imagePath, {
                    method: 'Post',
                    body: formData
                })
                .then(res => res.json())
                .then(data => productImages.push({'_id' : data}))
                .catch(err => console.log(err)); 
            }
            setProduct({...product,  images: productImages })
            
        }        
    }
    
    return (
        <div>
            <Dialog
                open={props.eventOpen}
                onClose={props.handleEventClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
            <DialogTitle>Tuotteen lisäys</DialogTitle>
            <List>
                {product.categories.map((category, index) => 
                <ListItem key={index} value={category}>{category.name}</ListItem>)}
            </List>
            <DialogContent> 
                <TextField
                    id="nameSelect"
                    label="Tuotteen nimi"
                    name="name"
                    margin="dense"
                    value={product.name}
                    onChange={handleInputChange}
                    fullWidth/>
                <TextField
                    id="categorySelect"
                    select
                    label="Tuotteen kategoriat"
                    name="categories"
                    margin="dense"
                    onChange={categoryFunction}
                    fullWidth
                    defaultValue={props.categories[0]}>
                    {props.categories.map((category, index) => 
                        <MenuItem key={index} value={category}>
                        {category.name}
                        </MenuItem>)}
                </TextField>
                <TextField
                    id="categorySelect"
                    label="Tuotteen hinta"
                    name="price"
                    margin="dense"
                    value={product.price}
                    onChange={handleInputChange}
                    fullWidth/>
                <TextField
                    id="categorySelect"
                    label="Tuotteen kuvaus"
                    name="productDescription"
                    margin="dense"
                    value={product.productDescription}
                    fullWidth
                    onChange={handleInputChange}/>
                
                <input
                    type="file" 
                    name="file"
                    multiple
                    onChange={changeHandler}
                    />    
                <List>
                    {Array.from(imageFiles).map((image, index) => 
                    <ListItem key={index} value={image}>{image.name}</ListItem>)}
                </List>          
            </DialogContent>
            <DialogActions>
                <Button onClick={clear}>
                    Tyhjennä
                </Button>
                <Button onClick={props.handleEventClose}>
                    Sulje
                </Button>
                <Button onClick={addFunction}>
                    Lisää
                </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default AddProduct;
