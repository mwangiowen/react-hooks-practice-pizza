// PizzaForm.js
import React, { useState } from "react";

function PizzaForm({ pizza }) {
  const [pizzaData, setPizzaData] = useState({
    topping: pizza ? pizza.topping : "",
    size: pizza ? pizza.size : "Small",
    vegetarian: pizza ? pizza.vegetarian : false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPizzaData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to submit the form data (add or edit pizza)
    console.log("Submit pizza data:", pizzaData);
    // Reset the form after submission
    setPizzaData({
      topping: "",
      size: "Small",
      vegetarian: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (your existing form structure) */}
      {/* Use pizzaData in your form inputs */}
      <input
        className="form-control"
        type="text"
        name="topping"
        placeholder="Pizza Topping"
        value={pizzaData.topping}
        onChange={handleInputChange}
      />
      {/* ... (other form inputs) */}
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
}

export default PizzaForm;
