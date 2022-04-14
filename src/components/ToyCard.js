import React, { useState } from "react";

function ToyCard({toy, onDeleteClick}) {

  const {id, name, image, likes} = toy;
  const likeNumbers = parseInt(likes)
  const [newLikes, setNewLikes] = useState(likeNumbers);
  

  function handleDeleteClick(e) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => onDeleteClick(toy))
  }

  

  function patchLikes () {
    const addedLikes = newLikes +1

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "likes": addedLikes,
      })
    })
    .then((res) => res.json())
    .then((data) => setNewLikes(data.likes))
  }
  
  

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{newLikes} Likes </p>
      <button className="like-btn" onClick={patchLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
