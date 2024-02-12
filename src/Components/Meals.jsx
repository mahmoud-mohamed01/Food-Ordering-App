import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import Modal from "./UI/Modal";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const localUrl = "http://localhost:3000/";
  const url = "https://food-order-api-bxh9.onrender.com/";

  useEffect(() => {
    async function getMeals() {
      try {
        let response = await fetch(url + "meals");
        let data = await response.json();
        setMeals(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    getMeals();
  }, []);

  if (error) {
    return (
      <h1 className="center">error fetching data. try reload the page.</h1>
    );
  }
  if (loading) {
    return <h1 className="center">loading...</h1>;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

export default Meals;
