import React, {useContext, useEffect} from 'react';
import Proyecto from "./Proyecto";
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContext from '../../context/alertas/alertaContext'

const ListadoProyectos = () => {
    //Extraer proyectos de state inicial

    const ProyectosContext = useContext(ProyectoContext);
    const {mensaje, proyectos, obtenerProyectos } = ProyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta } = alertaContext;


    //obtener proyectos cuando carga el componente
    useEffect(()=> {
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
          // eslint-disable-next-line
    }, [mensaje])
        //revisar si proyectos tienen contenidos
    if(proyectos.length === 0) return <p>No hay proyectos comienza agregando uno</p>;
  
    return ( 
        
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
           {proyectos.map(proyecto => (
                <Proyecto key={proyecto._id} proyecto={proyecto} /> 
           ))}
           
        </ul>
     );
}
 
export default ListadoProyectos;