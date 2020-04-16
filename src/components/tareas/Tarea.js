import React, {useContext} from 'react';
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {
    //obtener el state de los proyectos
    const ProyectosContext = useContext(ProyectoContext);
    const { proyecto } = ProyectosContext;
    const [proyectoActual] = proyecto;

     //obtener la funcion del context de tarea
     const tareasContext = useContext(tareaContext); 
     const { eliminarTarea, actualizarTarea, guardarTareaActual } = tareasContext; //oculte obtenerTareas

     //funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea

     const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id)
        //obtenerTareas(proyectoActual._id)  //esto es igual a proyecto[0].id y nos ahorramos esta linea const [proyectoActual] = proyecto; tambien lo comentè y sigue funconando
    
     }

     //funcion que modifica el estado de la tarea
     const cambiarEstado = tarea => {
  
        tarea.estado = !tarea.estado;
        /*
        if(tarea.estado) {
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }*/
        actualizarTarea(tarea)
     }
     //agrega una tarea actual cuando el usuario dese editarla
     const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
     }
    
    return ( 
        <li className="tarea sombra">
        <p> {tarea.nombre}</p>

        <div className="estado">
         
            {tarea.estado
            ?
                (
                    <button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                )
            :
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Incompleto</button>
                )
            }
        </div>

        <div className="acciones">
            <button 
                type="button"
                className="btn btn-primario"
                onClick ={()=> seleccionarTarea(tarea)}
              
            >Editar</button>

            <button
                type="button"
                className="btn btn-secundario"
               onClick ={()=> tareaEliminar(tarea._id)}
            >Eliminar</button>
        </div>
    </li>
     );
}
 
export default Tarea;
