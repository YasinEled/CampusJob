import React, { useState } from "react";
import "../Styles/CreadorUser.css";

const options = [
  { id: "alumne", label: "Alumne" },
  { id: "profesor", label: "Profesor" },
  { id: "empresa", label: "Empresa" },
];

const CreatorUsersAC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleLabelClick = (value: string) => {
    // Si el usuario hace clic en el mismo valor, se deselecciona
    setSelectedOption(prev => (prev === value ? null : value));
  };

  return (
    <main className="creatorUsersMain">
      <div className="containerCreatorUser">
        <h1 className="titleCreatorUser">CREACIÓ D'USUARIS</h1>
        <div className="selectorContainer">
          {options
            .filter(opt => selectedOption === null || selectedOption === opt.id)
            .map(opt => (
              <React.Fragment key={opt.id}>
                <input
                  type="radio"
                  id={opt.id}
                  name="selector"
                  value={opt.id}
                  checked={selectedOption === opt.id}
                  readOnly // Previene cambios indeseados
                  style={{ display: "none" }}
                />
                <label
                                  className="CreatorSelectorUser"

                  htmlFor={opt.id}
                  onClick={() => handleLabelClick(opt.id)}
                >
                  {opt.label}
                </label>
              </React.Fragment>
            ))}
        </div>
          
        </div>
    </main>
  );
};

export default CreatorUsersAC;
