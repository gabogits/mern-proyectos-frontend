import { 
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types';

export default (state, action) => {

  switch (action.type) {
   
    case TAREAS_PROYECTO: 
      return {
        ...state,
        tareasProyecto: action.payload
      }
      case AGREGAR_TAREA: 
      return {
        ...state,
        tareasProyecto: [ action.payload, ...state.tareasProyecto ], //creamos un arreglo de tareas que ya teniamos mas la nueva
        //ya en la etapa de integracion del front con el back, cambiamos de tareas a tareasProyecto
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
        tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload), 
      }
      case ACTUALIZAR_TAREA:  //ambos cases actualizan el objeto completo de la tarea por lo que es correcto hacer esto, se ocupa el mismo codigo
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ) // aqui tenemos que escribir la ruta completa por que estamos pasando todo el objeto tarea action.payload.id 
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
