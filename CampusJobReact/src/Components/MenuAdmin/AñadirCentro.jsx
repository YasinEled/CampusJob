import React, { useState } from 'react';

const AñadirCentro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Centro creado:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al backend
        setFormData({ nombre: '', correo: '', telefono: '' });
    };

    return (
        <div>
            <h1>Añadir Centro</h1>
            <h2>Informacion Centro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre del Centro:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
            <h2>Informacion Usuario Administrador</h2>
                <div>
                    <label htmlFor="emailUsrAdmin">Email del Usuario Admin: </label>
                    <input
                        type="text"
                        id="emailUsrAdmin"
                        name="emailUsrAdmin"
                        value={formData.emailUsrAdmin}
                        onChange={handleChange}
                        required
                    />
                    </div>
                <button type="submit">Crear Centro</button>
            </form>
        </div>
    );
};

export default AñadirCentro;