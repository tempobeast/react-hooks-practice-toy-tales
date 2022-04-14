import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  console.log(toys)

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((res) => res.json())
    .then((data) => setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(toyObj) {
    setToys([...toys, toyObj])
  }

  function handleDeletedToy(toDelete) {
    const toysToDelete = toys.filter((toy) => toy.id !== toDelete.id)
    setToys(toysToDelete)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onNewToySubmit={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer onDeleteClick={handleDeletedToy} toys={toys}/>
    </>
  );
}

export default App;
