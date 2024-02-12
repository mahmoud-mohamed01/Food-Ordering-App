import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  let cart = useContext(CartContext);
  let userProgress = useContext(UserProgressContext);
  let totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handelClose() {
    userProgress.hideCart();
  }

  function handelCheckOut() {
    userProgress.showCheckOut();
  }
  return (
    <Modal
      className="cart"
      open={userProgress.progress == "cart"}
      onClose={userProgress.progress == "cart" ? handelClose : null}
    >
      <h2>Your Cart{cart.items.length <= 0 ? "is Empty!" : ""}</h2>
      <ul>
        {cart.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              onIncrease={() => {
                cart.addItem(item);
              }}
              onDecrease={() => {
                cart.removeItem(item);
              }}
              item={item}
            ></CartItem>
          );
        })}
      </ul>
      <p className="cart-total">TotalPrice: ${totalPrice}</p>
      <p className="modal-actions">
        <button onClick={handelClose} className="text-button">
          close
        </button>

        {cart.items.length > 0 && (
          <button onClick={handelCheckOut} className="button">
            CheckOut
          </button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
