import React, { useState, useContext, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //obtener el state de los proyectos
  const ProyectosContext = useContext(ProyectoContext);
  const { proyecto } = ProyectosContext;

  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { errorTarea, tareaSeleccionada, agregarTarea, validarTarea, actualizarTarea, limpiarTarea } = tareasContext; //obtenerTareas

  //useEffect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if(tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada)
    }else {
      guardarTarea({
        nombre: "",
      })
    }
  }, [tareaSeleccionada])

  //state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //extraer el nombre del proyecto
  const { nombre } = tarea;

  if (!proyecto) return null;
  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;



  //limpiar los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if(nombre.trim() === '') {
      validarTarea();
      return;
    }
    
    //revisar si es edicion o es nueva tarea

 
    if(tareaSeleccionada === null) {
      //pasar la validacion
      tarea.proyecto = proyectoActual._id; //cambiamos de tarea.proyectoId = proyectoActual.id;   a tarea.proyecto = proyectoActual._id; para enviarle el id del proyecto al modelo y lo asigne  a este
      agregarTarea(tarea); //el reducer es el que limpia un previo error que podria haberse activado errorTarea
    }else {
      //actualizar tarea existente
      actualizarTarea(tarea);

      //limpia la tarea seleccionada del state
      limpiarTarea();
    }

    //obtener y filtrar las tareas del proyecto actual

    //obtenerTareas(proyectoActual.id)  esto lo tuve que co
    
    //con context esto ya no tiene que actualizar en el componente principal como listadoTareas o app.js, si no que se hace mediante el state global en este caso tareaState 
 //reiniciar al form
    guardarTarea({
      nombre: ''
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            value={nombre}
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar tarea": "Agregar tarea"}
          />
        </div>
      </form>

      {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
    </div>
  );
};

export default FormTarea;
