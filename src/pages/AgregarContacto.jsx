import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AgregarContacto = () => {
    const navigate = useNavigate();
    const [datos, setDatos] = useState({

        name: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    const manejarCambios = e =>
        setDatos({ ...datos, [e.target.name]: e.target.value });

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const nuevoContacto = {
            name: datos.name,
            email: datos.email,
            phone: datos.telefono,
            address: datos.direccion,
        }

        try {
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/moises-agenda/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoContacto)
            });
            if (resp.ok) {
                console.log("Contacto Creado");
                navigate("/");
            } else {
                console.log("Error al crear el contacto")
            }
        } catch (error) {
            console.log("Error del servidor", error)

        }
    }

    return (
        <div className="container mt-1">
            <h2>Agregar Contacto</h2>
            <form onSubmit={enviarFormulario}>
                <input type="text"
                    name="name"
                    placeholder="Nombre Completo"
                    value={datos.name}
                    onChange={manejarCambios}
                    className="form-control mb-2" />

                <input type="text"
                    name="email"
                    placeholder="Email"
                    value={datos.email}
                    onChange={manejarCambios}
                    className="form-control mb-2" />

                <input type="text"
                    name="telefono"
                    placeholder="Telefono"
                    value={datos.telefono}
                    onChange={manejarCambios}
                    className="form-control mb-2" />

                <input type="text"
                    name="direccion"
                    placeholder="Direccion"
                    value={datos.direccion}
                    onChange={manejarCambios}
                    className="form-control mb-2" />

                <button type="submit" className="btn btn-primary">
                    Guardar Contacto
                </button>
                <Link to={"/"}  className="btn btn-danger">Cancelar
                
                </Link>
            </form>
        </div>




    );
};
export default AgregarContacto