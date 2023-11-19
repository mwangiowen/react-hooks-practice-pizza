// PizzaList.js
import React, { useState, useEffect } from "react";
import Pizza from "./Pizza";
import PizzaForm from "./PizzaForm";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    // Fetch pizza data from the json-server
    fetch("http://localhost:3001/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  const handleEditPizza = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleFormSubmit = (editedPizza) => {
    // Implement logic to persist changes in the backend
    // For simplicity, let's assume you have an API endpoint for updating pizzas
    fetch(`http://localhost:3001/pizzas/${editedPizza.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPizza),
    })
      .then((response) => response.json())
      .then((updatedPizza) => {
        // Update the list of pizzas with the edited pizza
        setPizzas((prevPizzas) =>
          prevPizzas.map((p) => (p.id === updatedPizza.id ? updatedPizza : p))
        );
        // Clear the selected pizza state
        setSelectedPizza(null);
      })
      .catch((error) => console.error("Error updating pizza:", error));
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} onEdit={handleEditPizza} />
          ))}
        </tbody>
      </table>
      {/* Render PizzaForm with selected pizza data for editing */}
      {selectedPizza && (
        <PizzaForm pizza={selectedPizza} onSubmit={handleFormSubmit} />
      )}
    </>
  );
}

export default PizzaList;
