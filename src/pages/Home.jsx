import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()



  const obtenerContacto = async() => {
	try {
		const resp = await fetch ("https://playground.4geeks.com/contact/agendas/moises-agenda")
		if(!resp.ok) {
			await crearAgenda();
			obtenerContacto();
		}
		const data = await resp.json();
		dispatch({type: "cargarContactos", payload: data.contacts});
		console.log(resp)
	} catch (error) {
		console.log("error cargando contacto");
		
	};
  };
  console.log(store.contacts)

  const crearAgenda = async() =>{

	const resp = await fetch("https://playground.4geeks.com/contact/agendas/moises-agenda",{
		method:"POST"
	});
  };

  useEffect(()=>{
	obtenerContacto();
  },[]);


const eliminarContacto = async(id) =>{
	
	try{
	const resp = await fetch ("https://playground.4geeks.com/contact/agendas/moises-agenda/contacts/" + id,{
		method:"DELETE",
		headers:{"Content-Type" : "application/json"}
	});
	dispatch({type:"eliminarContactos", payload:id})
	console.log(resp)
	return resp.ok
}catch(error){
	console.log("Error eliminando Contacto", error)
}


	
}




	return (
		<div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de contactos</h2>
        
      </div>
{store.contacts.length > 0 ? (
        store.contacts?.map((contacto) => (
          <ContactCard key={contacto.id} contacto={contacto} onEliminar={eliminarContacto} />
        ))
      ) : (
        <p>No hay contactos disponibles.</p>
      )}
    </div>
	);
}; 