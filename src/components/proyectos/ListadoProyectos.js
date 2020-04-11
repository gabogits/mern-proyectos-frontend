import React, {useContext, useEffect} from 'react';
import Proyecto from "./Proyecto";
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const ListadoProyectos = () => {
    //Extraer proyectos de state inicial

    const ProyectosContext = useContext(ProyectoContext);
    const {proyectos, obtenerProyectos } = ProyectosContext;
    //obtener proyectos cuando carga el componente
    useEffect(()=> {
      
        obtenerProyectos();
          // eslint-disable-next-line
    }, [])
        //revisar si proyectos tienen contenidos
    if(proyectos.length === 0) return <p>No hay proyectos comienza agregando uno</p>;
  
    return ( 
        
        <ul className="listado-proyectos">
           {proyectos.map(proyecto => (
                <Proyecto key={proyecto.id} proyecto={proyecto} /> 
           ))}
           
        </ul>
     );
}
 
export default ListadoProyectos;