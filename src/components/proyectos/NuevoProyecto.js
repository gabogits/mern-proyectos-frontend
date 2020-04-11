import React, { Fragment, useState, useContext } from "react";
import ProyectoContext from '../../context/proyectos/ProyectoContext';


const NuevoProyecto = () => {
  //obtener el state del formulario
  const ProyectosContext = useContext(ProyectoContext);
  const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError  } = ProyectosContext;
  //state para proyecto

  const [proyecto, guardarProyecto] = useState({
    nombre: ''
  })
  // Extraer nombre del proyecto
  const {nombre } = proyecto;

  // lee los contenidos del input
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }
 
  //cuando el usuario envia un proyecto
  const onSubmitProyecto = e => {
    e.preventDefault();

    //validar proyecto
    if(nombre === ''){
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto)
    //reinciar el form
    guardarProyecto({
      nombre:''
    })

    //Mostrar fromulario
  
  }
  const onClickFormulario = () => {
    mostrarFormulario();
  }
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>
      {
        formulario ? 
          (
            <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
            <input
              type="text"
              className="input-text"
              placeholder="Nombre Proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
            />
    
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar Proyecto"
            />
          </form>
          )
        : null
      }
     
     {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

    </Fragment>
  );
};

export default NuevoProyecto;
