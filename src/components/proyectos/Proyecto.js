import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
const Proyecto = ({proyecto}) => {
    //obtener el state de los proyectos
    const ProyectosContext = useContext(ProyectoContext);
  
    const {proyectoActual  } = ProyectosContext;
    
    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext); 
    const { obtenerTareas } = tareasContext;
    
    //Funcion para agregar el proyectoActual
    const seleccionarproyecto = id => {
        proyectoActual(id) //fijar un proyecto
        obtenerTareas(id) //filtrar las tareas cuando se de click
    }
    
    return ( 
      <li>
          <button type="button" className="btn btn-blank" onClick={() => seleccionarproyecto(proyecto.id) }>{proyecto.nombre}</button>
      </li>
     );
}
 
export default Proyecto;