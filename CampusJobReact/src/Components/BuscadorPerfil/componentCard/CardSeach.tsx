import React from "react";


const CardSearch = ({name, user}: {name: string, user: string}) => {
  return (
    <div className="cardSearch" style={{ display: "flex", flexDirection: "row", gap: "20px",justifyContent: "center", alignItems: "center", width: "100%", padding: "10px", borderRadius: "10px" }}>
      <div className="cardSearch__info">
        <p className="cardSearch__name">{name}</p>
        <p className="cardSearch__job">{user}</p>
      </div>
      <div className="cardSearch__button">
        <button className="button">Chat</button>
      </div>
    </div>
  )
}


export default CardSearch;