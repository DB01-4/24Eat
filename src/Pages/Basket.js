import React, { useState, useContext } from "react";
import Basketlist from "../Components/BasketComponents/Basketlist";
import { List, Snackbar, Alert } from "@mui/material";
import { TableContext } from "../Components/USECONTEXT/TableContext";

function Basket({ items, addToBasket, removeItemOne, removeItem, clearItems }) {
  const [open, setOpen] = useState(false);
  const [basketHasItems, setbasketHasItems] = useState(false);
  const { tablekey } = useContext(TableContext);

  const handleSnackbarOpen = () => {
    if (items.length > 0) {
      setbasketHasItems(true);
    } else {
      setbasketHasItems(false);
    }
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <h1>{tablekey}</h1>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Basketlist
          items={items}
          removeItem={removeItem}
          addToBasket={addToBasket}
          removeItemOne={removeItemOne}
          clearItems={clearItems}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      </List>
      {basketHasItems ? (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Your order has been sent to the kitchen!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            Please add products before ordering.
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Basket;
