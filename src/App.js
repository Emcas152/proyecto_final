import './App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/Landing"
import RegionesPage from "./components/Regiones"
import Header from "./components/Header";


export default function App() {
  return (
    <div className="App">
        <Route path="/:Page" children={<Header />} />
      <Switch>
          <Route exact path="/Inicio">
              <LandingPage />
          </Route>
          <Route exact path="/Regiones">
            <RegionesPage />
          </Route>
      </Switch>

    </div>
  );
}
