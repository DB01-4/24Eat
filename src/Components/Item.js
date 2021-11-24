import React from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item({item, removeItem, addToBasket, removeItemOne}) {
    function handleItemClickAdd(e) {
        addToBasket(item)
    }
    function handleItemClickRemove(e) {        
        removeItem(item.productId)
    }
    function handleItemClickRemoveOne(e) {        
        removeItemOne(item)
    }
    
    var randomNumber = Math.random() * (100 - 0) + 0;
    randomNumber = Math.floor(randomNumber);
    return (
        <ListItem        
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick = {handleItemClickRemove} />
                </IconButton>
            }
        >
            <ListItemAvatar>
            <Avatar src={}/>
            </ListItemAvatar>
                <ListItemText primary={item.name} secondary={"€" + item.price * item.quantity} />

            <IconButton edge="start" aria-label="modify">
                <RemoveIcon onClick = {handleItemClickRemoveOne}/>                  
                {item.quantity}
                <AddIcon variant="contained" onClick = {handleItemClickAdd}/>       
            </IconButton>

            
                
        </ListItem>
    );
}
