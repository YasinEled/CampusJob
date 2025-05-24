import React from "react";
import "../../Style/CardSearch.css";

const CardSearch = ({ name, user }: { name: string; user: string }) => {
  return (
    <div className="cardSearch">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="profile"
        className="cardSearch__avatar"
      />
      <div className="cardSearch__info">
        <p className="cardSearch__name">{name}</p>
        <p className="cardSearch__job">{user}</p>
      </div>
      <div className="cardSearch__button">
        <button className="button">Ver Perfil</button>
      </div>
    </div>
  );
};

export default CardSearch;
