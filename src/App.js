import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./context/proyectos/ProyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from  "./components/rutas/RutaPrivada";
// revisar si tenemos un token
const token = localStorage.getItem("token");

if(token){
  tokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/proyectos" component={Proyectos} />
            </Switch>
          </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

//dentro de router es todo lo que se vera en todas las paginas
//todo lo que se coloque en switch es el contenido de cada pagina
export default App;
