import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from '../../config/token'

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      //Obtener un usuario
      usuarioAutenticado()
    } catch (error) {
      //console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //retorna el usuario autenticado, esto sirve tanto en el registro como en el login

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        tokenAuth(token)
      //funcion PARA ENVIAR EL TOKEN POR HEADER
    }
    try {
        const respuesta = await clienteAxios.get("api/auth");
       // console.log(respuesta)
       dispatch({
           type: OBTENER_USUARIO,
           payload: respuesta.data.usuario
       })
    } catch (error) {
        console.log(error.response)
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //cuando el usuario inicia sesion

  const  iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });
      usuarioAutenticado()
    } catch (error) {
       console.log(error.response.data.msg);
       const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  }

  //cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type:  CERRAR_SESION,

    });
   
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
