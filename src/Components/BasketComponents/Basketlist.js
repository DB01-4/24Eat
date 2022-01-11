import React from 'react'
import Item from './Item'
import { Button, ListItem, List, ListItemText } from '@mui/material';
import axios from 'axios';

const client = new WebSocket('ws://websocket-server-mediaan.herokuapp.com');


export default function Basketlist({items, removeItem, addToBasket, removeItemOne, clearItems}) {
    
    const apiUrl = "https://db01-4-menuservice.herokuapp.com/api";
    const tableNr = localStorage.getItem("TableNr");


    const handleOrder = async (dishes) => {

        const emptyOrder = {
            tableId: tableNr? tableNr : 0,
            status: 0
        }
        console.log(emptyOrder);
        
        axios
        .post(`${apiUrl}/public/orders`, emptyOrder)
        .then((response) => {
            console.log(response);
            var orderId = response.data.id;
            dishes.forEach(dish => {
                dish["orderId"] = orderId;
            });
            axios
            .post(`${apiUrl}/public/orderitems`, dishes)
            .then((response) => {
                console.log(JSON.stringify(orderId));
                client.send(JSON.stringify(orderId));
                clearItems();
            })
        })
        .catch(function () {
        });
    }


    const BasketItems = () => {

        var totalPrice = 0;

        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {items.map(item => {
                    totalPrice += item.price * item.quantity;
                   return (
                    <Item key={item.productId} removeItem={removeItem} addToBasket={addToBasket} removeItemOne={removeItemOne} item={item}/>
                   );
                })}
            <ListItem
                secondaryAction={
                    <Button edge="start" variant="outlined" onClick= {() => handleOrder(items)} >order</Button>   
                }
            >
                <ListItemText primary={"Total: €" + totalPrice} />
            </ListItem>
            </List>
        )
    }

    return <BasketItems/>;
}
