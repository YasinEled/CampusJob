import React, { useState } from 'react';
import './Style/GestionarCursos.css';

const UserManager = () => {
  const [availableUsers, setAvailableUsers] = useState([
    { id: 1, name: 'Eric' },
    { id: 2, name: 'Yasin' },
    { id: 3, name: 'Oriol' },
  ]);

  const [addedUsers, setAddedUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  const afegirUser = (user) => {
    setAvailableUsers(prev => prev.filter(u => u.id !== user.id));
    setAddedUsers(prev => [...prev, user]);
  };

  const treureUser = (user) => {
    setAddedUsers(prev => prev.filter(u => u.id !== user.id));
    setAvailableUsers(prev => [...prev, user]);
  };

  const handleAddNewUser = () => {
    if (!newUserName.trim()) return;
    const newId = Date.now();
    const newUser = { id: newId, name: newUserName.trim() };
    setAvailableUsers(prev => [...prev, newUser]);
    setNewUserName('');
  };

  const guardarUsuarios = () => {
    console.log('Usuarios guardados:', addedUsers);
    alert('Usuarios guardados correctamente');
  };

  return (
    <div className="añadirusuariocurso-container">
      <div className="añadirusuariocurso-panel">
        <h3 className="añadirusuariocurso-title">Usuarios disponibles</h3>
        <ul className="añadirusuariocurso-list">
          {availableUsers.map(user => (
            <li key={user.id} className="añadirusuariocurso-item">
              {user.name}
              <button
                className="añadirusuariocurso-button"
                onClick={() => afegirUser(user)}
              >
                ➕ Añadir
              </button>
            </li>
          ))}
        </ul>
        <div className="añadirusuariocurso-add-form">
          <input
            className="añadirusuariocurso-input"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Nuevo usuario"
          />
          <button className="añadirusuariocurso-button" onClick={handleAddNewUser}>
            ➕ Añadir usuario
          </button>
        </div>
      </div>

      <div className="añadirusuariocurso-panel">
        <h3 className="añadirusuariocurso-title">Usuarios añadidos</h3>
        <ul className="añadirusuariocurso-list">
          {addedUsers.map(user => (
            <li key={user.id} className="añadirusuariocurso-item">
              {user.name}
              <button
                className="añadirusuariocurso-button"
                onClick={() => treureUser(user)}
              >
                ➖ Quitar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="añadirusuariocurso-footer">
        <button className="añadirusuariocurso-button" onClick={guardarUsuarios}>
          💾 Guardar
        </button>
      </div>
    </div>
  );
};

export default UserManager;
