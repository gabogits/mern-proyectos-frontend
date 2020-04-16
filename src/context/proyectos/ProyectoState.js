import React, {useReducer} from 'react';


import ProyectoContext from './ProyectoContext';
import proyectoReducer from './ProyectoReducer';
import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO, 
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO, 
  } from '../../types';

import clienteAxios from "../../config/axios";

const ProyectoState = props => {

        //crear el state inicial
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto:null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //serie de funciones para el CRUD
    const mostrarFormulario = () => { //esta parte escribe las funciones que manda a llamar el reducer
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos
    
    const obtenerProyectos = async () => {
        try {
            const resultado =  await clienteAxios.get('api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload:resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error',
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            console.log(error)
        }
       
    }
    //agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
       
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
         
            dispatch({
                type: AGREGAR_PROYECTO,
                payload:resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error',
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            console.log(error)
        }
        //insertar el proyecto en el state
      
    }
    //validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    } 
    //selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    } 
    //Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error',
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            console.log(error)
        }
     
    } 


    
    return (
        <ProyectoContext.Provider 
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
            
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;