import { number } from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditarContacto = () => {
    const navigate = useNavigate();
    const { id } = useParams();






    const [datos, setDatos] = useState({

        name: "",
        email: "",
        telefono: "",
        direccion: "",
    });



    useEffect(() => {
  const cargarContacto = async () => {
    try {
      const resp = await fetch(`https://playground.4geeks.com/contact/agendas/moises-agenda/contacts/${id}`);
      if (resp.ok) {
        const data = await resp.json();
        setDatos({
          name: data.name,
          email: data.email,
          telefono: data.phone,
          direccion: data.address,
        });
      } else {
        console.log("Error al cargar el contacto");
      }
    } catch (error) {
      console.log("Error en la petición", error);
    }
  };
  cargarContacto();
}, [id]);
    

       

const manejarCambios = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });

};

const manejarEnvio = async (e,) => {
    e.preventDefault();
    const contactoDatos = {
        name: datos.name,
        email: datos.email,
        phone: datos.telefono,
        address: datos.direccion,
        agenda_slug: "moises-agenda"
    }

    try {
        const resp = await fetch("https://playground.4geeks.com/contact/agendas/moises-agenda/contacts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactoDatos)
        });
        if (resp.ok) {
            console.log("Contacto actualizado correctamente")
            navigate("/");
        } else {
            console.log("error al actualizar el contacto")
        }

    } catch (error) {
        console.log("error actualizando en el servidor", error)

    };




};




return (

    <div className="container mt-5">
        <h2 className="mb-4">Editar Contacto</h2>
        <form onSubmit={manejarEnvio}>
            <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input type="text"
                    name="name"
                    value={datos.name}
                    className="form-control"
                    onChange={manejarCambios}
                    required />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo Electronico</label>
                <input type="text"
                    name="email"
                    value={datos.email}
                    className="form-control"
                    onChange={manejarCambios}
                    required />
            </div>

            <div className="mb-3">
                <label className="form-label">Telefono</label>
                <input type="text"
                    name="telefono"
                    value={datos.telefono}
                    className="form-control"
                    onChange={manejarCambios}
                    required />
            </div>

            <div className="mb-3">
                <label className="form-label">Direccion</label>
                <input type="text"
                    name="direccion"
                    value={datos.direccion}
                    className="form-control"
                    onChange={manejarCambios}
                    required />
            </div>
            <button className="btn btn-success" type="submit">Guardar</button>
            <Link to={"/"} className="btn btn-danger">Cancelar

            </Link>
        </form>
    </div>

)
}
export default EditarContacto