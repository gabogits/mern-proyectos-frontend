import React, {useReducer} from 'react';
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
   
    //crear el state inicial
    const initialState = {
        //tareas:  [],  //ya en la etapa de integracion del front con el back, cambiamos de tareas a tareasProyecto
        tareasProyecto: [], //esto en null lo pasamos a un arreglo vacio
        errorTarea:false,
        tareaSeleccionada: null,
        
    }

    
     //Dispatch para ejecutar las acciones
     const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Crear las funciones 

    //obtener las tareas de un proyecto

    const obtenerTareas = async proyecto => {
    
        try {
            const resultado =  await clienteAxios.get('/api/tareas', {params: {proyecto}});
          
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    //agregar una tarea al proyecto seleccionado

      const agregarTarea = async tarea => {
          try {
              const resultado = await  clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type:AGREGAR_TAREA,
                payload:resultado.data.tarea
            })
          } catch (error) {
              console.log(error)
          }
       
    }

    //valida y muestra un error en caso de ue sea necesario
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }
  //eliminar tarea por id 
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

        } catch (error) {
            console.log(error)
        }
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }
    //cambia el estado de cada tarea se elimino en la fase de integracion con el  back y se va a ocupar  Edita o modifica una tarea para ambas situaciones
    const actualizarTarea = async tarea => {
       
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
      
    }
    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

   
    
      //Limpiar la tarea seleccioanda
      const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA,
        })
    }
    return (
        <TareaContext.Provider  value={{
            //tareas: state.tareas,
            tareasProyecto: state.tareasProyecto,
            errorTarea: state.errorTarea,
            tareaSeleccionada:  state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}>
             {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;