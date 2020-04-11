import { 
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO: 
      return {
        ...state,
        tareasProyecto: state.tareas.filter(tarea =>  tarea.proyectoId === action.payload )
      }
      case AGREGAR_TAREA: 
      return {
        ...state,
        tareas: [action.payload, ...state.tareas ], //creamos un arreglo de tareas que ya teniamos mas la nueva
        errorTarea:false
      }

      case VALIDAR_TAREA: 
      return {
        ...state,
        errorTarea:true
      }
      case ELIMINAR_TAREA: 
      return {
        ...state,
        tareas: state.tareas.filter(tarea => tarea.id !== action.payload), 
      }
      case ACTUALIZAR_TAREA:  //ambos cases actualizan el objeto completo de la tarea por lo que es correcto hacer esto, se ocupa el mismo codigo
      case ESTADO_TAREA: 
      return {
        ...state,
        tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea ), // aqui tenemos que escribir la ruta completa por que estamos pasando todo el objeto tarea action.payload.id 
        //si encuentra el mismo id va sobrescribir la tarea con el estado modificado
        // tareaSeleccionada: null esta podria ser una opcion para limpiar la tarea seleccionada
      } 
      case TAREA_ACTUAL: 
      return {
        ...state,
        tareaSeleccionada: action.payload, 
      }
      case LIMPIAR_TAREA: 
      return {
        ...state,
        tareaSeleccionada: null, 
      }
    default:
      return state;
  }
};
