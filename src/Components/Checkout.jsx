import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";

function Checkout() {
  let cart = useContext(CartContext);
  const [orderStatus, setOrderStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  let user = useContext(UserProgressContext);

  async function handelSubmit(event) {
    event.preventDefault();
    let fd = new FormData(event.target);
    let customerData = Object.fromEntries(fd.entries());
    try {
      console.log(customerData);
      setLoading(true);
      let response = await fetch(
        "https://food-order-api-bxh9.onrender.com/orders",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: {
              items: cart.items,
              customer: customerData,
            },
          }),
        }
      );
      setLoading(false);
      if (!response.ok) {
        setError(true);
      } else {
        setOrderStatus(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Modal
      open={user.progress == "checkout"}
      onClose={() => {
        user.hideCheckOut();
      }}
    >
      {loading && <h1>loading...</h1>}
      {orderStatus && (
        <div className="center">
          <h2>your order created !</h2>
          <p>we will contact you via email.</p>
        </div>
      )}
      {error && <h2 className="center">Error try again</h2>}

      {orderStatus == false && error == false && (
        <form onSubmit={handelSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: ${totalPrice}</p>
          <div className="control">
            <label htmlFor="">Full Name</label>
            <input required type="text" name="name" />
          </div>
          <div className="control">
            <label htmlFor="">Email</label>
            <input type="email" name="email" />
          </div>{" "}
          <div className="control">
            <label htmlFor="">Street</label>
            <input required type="text" name="street" />
          </div>
          <div className="control-row">
            <div className="control">
              <label htmlFor="">Postal Code</label>
              <input required type="number" name="postal-code" />{" "}
            </div>
            <div className="control">
              <label htmlFor="">City</label>
              <input required type="text" name="city" />{" "}
            </div>
          </div>
          <div className="modal-actions">
            <button
              onClick={() => {
                user.hideCheckOut();
              }}
              type="button"
              className="text-button"
            >
              Close
            </button>
            <button className="button">Submit</button>
          </div>
        </form>
      )}
      {(loading || error || orderStatus) && (
        <div className="modal-actions">
          <button
            onClick={() => {
              user.hideCheckOut();
              setError(false);
              setOrderStatus(false);
            }}
            type="button"
            className="text-button"
            y
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}

export default Checkout;
