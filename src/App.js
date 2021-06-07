import './App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/Landing"
import RegionesPage from "./components/Regiones"
import Header from "./components/Header";


function App() {
  return (
    <div className="App">
        <Header />
      <Switch>
        <Route path="/Regiones">
            <RegionesPage />
        </Route>
        <Route path="/">
            <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
