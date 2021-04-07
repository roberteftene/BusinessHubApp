import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/homePage";
import LandingPage from "./pages/landingpage/landingPage";
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/signin" exact component={Login}></Route>
        <Route path="/signup" exact component={Register}></Route>
        <Route path="/home" exact component={Home}></Route>
      </Switch>
    </Router>
  );
}
