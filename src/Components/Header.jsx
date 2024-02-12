import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

function Header() {
  let cart = useContext(CartContext);
  let userProgress = useContext(UserProgressContext);

  function handelShowCart() {
    userProgress.showCart();
  }

  let totalCartItems = cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <button onClick={handelShowCart} className="text-button ">
          Cart({totalCartItems})
        </button>
      </nav>
    </header>
  );
}

export default Header;
