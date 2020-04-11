import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO  } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload
      };
      case AGREGAR_PROYECTO:
        return {
          ...state,
          proyectos: [...state.proyectos, action.payload],
          formulario: false,
          errorFormulario: false
        };
        case VALIDAR_FORMULARIO:
        return {
          ...state, 
          errorFormulario: true
        };
        case PROYECTO_ACTUAL:
        return {
          ...state, 
          proyecto: state.proyectos.filter(proyecto => proyecto.id === action.payload)
        };
        case ELIMINAR_PROYECTO:
          return {
            ...state, 
            proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload), //aqui es proyectos por que a proyectos del state hay que rescribirlo, con todos los proyectos menos el eliminado
            proyecto: null //y aqui en el state, regresamos el valor a null, para que se resetee el valor y ya no muestre  ni el listado de tareas, ni el formulario para agregar tareas
          };
    default:
      return state;
  }
};
