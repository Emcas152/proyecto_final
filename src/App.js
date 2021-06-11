import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/Landing"
import RegionesPage from "./components/Regiones"
import Header from "./components/Header";
import PokemonPage from "./components/ListaPokemon";
import DetalleRegion from "./components/DetalleRegion";
import DetallePokemon from "./components/DetallePokemon";



export default function App() {

  return (

        <div className="App">
            <Route path="/:Page" children={<Header />} />
          <Switch>
              <Route exact path="/">
                  <Redirect to="/Inicio" />
              </Route>
              <Route exact path="/Inicio">
                  <LandingPage />
              </Route>
              <Route exact path="/Regiones">
                <RegionesPage />
              </Route>
              <Route exact path="/ListaPokemon">
                  <PokemonPage />
              </Route>
              <Route exact path="/DetalleRegion/:id">
                  <DetalleRegion />
              </Route>
              <Route exact path="/DetallePokemon/:name">
                  <DetallePokemon />
              </Route>
          </Switch>
        </div>
  );
}
