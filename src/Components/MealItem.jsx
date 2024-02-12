import React, { useContext } from "react";
import CartContext from "../store/CartContext";

function MealItem({ meal }) {
  let cart = useContext(CartContext);

  function handelAddItem(item) {
    cart.addItem(item);
  }

  // const localUrl = "http://localhost:3000/";
  const url = "https://food-order-api-bxh9.onrender.com/";

  return (
    <li className="meal-item">
      <article>
        <img src={url + meal.image} alt="" />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price ">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <button
            onClick={() => {
              handelAddItem(meal);
            }}
            className="button"
          >
            Add to cart
          </button>
        </div>
      </article>
    </li>
  );
}

export default MealItem;
