import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

        //obtener el state de los proyectos
        const ProyectosContext = useContext(ProyectoContext);
        const { proyecto, eliminarProyecto  } = ProyectosContext;

        //obtener las tareas del proyecto
        const tareasContext = useContext(tareaContext); 
        const { tareasProyecto } = tareasContext;


        //si no hay proyecto seleccionado
        if(!proyecto) return <h2>Selecciona un proyecto</h2>; 

        //array destructuring para extraer el proyecto actual
        const  [proyectoActual] = proyecto; //estamos extrayendo primero el objeto y de ahi vamos a extraer las propiedades
    
    return ( 
      
        <Fragment>
        <h2>Proyecto: {proyectoActual.nombre} </h2>

        <ul className="listado-tareas">
           {tareasProyecto.length === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                :  tareasProyecto.map(tarea => (
                    <Tarea  key={tarea._id}
                        tarea={tarea} />
                ))
            
           }
        </ul>

        <button     
            type="button"
            className="btn btn-eliminar"
            onClick={() => eliminarProyecto(proyectoActual._id)}
        >Eliminar Proyecto &times;</button>
    </Fragment>
     );
}
 
export default ListadoTareas;