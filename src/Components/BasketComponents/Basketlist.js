import React from "react";
import { useEffect, useContext, useState } from "react";
import Item from "./Item";
import { Button, ListItem, List, ListItemText } from "@mui/material";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TableContext } from "../USECONTEXT/TableContext";

var ws = new W3CWebSocket("wss://websocket-server-mediaan.herokuapp.com");

export default function Basketlist({
  items,
  removeItem,
  addToBasket,
  removeItemOne,
  clearItems,
  handleSnackbarOpen,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const apiUrl = "https://db01-4-menuservice.herokuapp.com/api";
  const tableNr = localStorage.getItem("TableNr");
  const { tablekey } = useContext(TableContext);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    axios
      .get("https://qr-service-mediaan.herokuapp.com/api/check/" + tablekey)
      .then((data) => {
        setCheck(data.data);
        console.log(data);
        console.log(
          "for tablekey " + tablekey + " the check resulted in: " + data.data
        );
      });
  }, [tablekey]);

  function wsConnect(msg) {
    setTimeout(function () {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("new ws connected");
        sendMsg(msg);
        return;
      } else {
        if (ws.readyState !== WebSocket.CONNECTING)
          ws = new W3CWebSocket("ws://websocket-server-mediaan.herokuapp.com");

        console.log("wait for connection...");
        wsConnect();
      }
    }, 5);
  }

  function sendMsg(msg) {
    ws.send(JSON.stringify(msg));
    handleSnackbarOpen();
    clearItems();
  }

  const Order = async (dishes) => {
    const emptyOrder = {
      tableId: tableNr ? tableNr : 0,
      status: 0,
    };
    console.log(emptyOrder);

    if (items.length > 0 && check) {
      console.log("tablekey correct: " + tablekey);
      axios
        .post(`${apiUrl}/public/orders`, emptyOrder)
        .then((response) => {
          console.log(response);
          var orderId = response.data.id;
          dishes.forEach((dish) => {
            dish["orderId"] = orderId;
          });
          axios.post(`${apiUrl}/public/orderitems`, dishes).then(() => {
            console.log(JSON.stringify(orderId));
            wsConnect(orderId);
            const billItem = {
              bill_id: 1,
              order_id: orderId,
            };
            Bill(billItem);
          });
        })
        .catch(function () {});
    } else if (!check) {
      console.log("tablekey wrong");
      alert(
        "This table device is not authorized to order. Wrong or missing table key"
      );
    } else {
      handleSnackbarOpen();
    }
  };

  const Bill = async (billItem) => {
    console.log("test");
    const token = await getAccessTokenSilently();
    axios
      .post(`${apiUrl}/private/billItem/post`, billItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {});
  };

  const BasketItems = () => {
    var totalPrice = 0;

    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {items.map((item) => {
          totalPrice += item.price * item.quantity;
          return (
            <Item
              key={item.productId}
              removeItem={removeItem}
              addToBasket={addToBasket}
              removeItemOne={removeItemOne}
              item={item}
            />
          );
        })}
        <ListItem
          secondaryAction={
            <Button
              edge="start"
              variant="outlined"
              onClick={() => Order(items)}
            >
              order
            </Button>
          }
        >
          <ListItemText primary={"Total: €" + totalPrice} />
        </ListItem>
      </List>
    );
  };

  return <BasketItems />;
}
