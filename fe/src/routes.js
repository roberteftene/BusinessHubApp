import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountDetailsPage from "./pages/accountdetailspage/AccountDetailsPage";
import Home from "./pages/homePage";
import LandingPage from "./pages/landingpage/landingPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/registerPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/signin" exact component={LoginPage}></Route>
        <Route path="/signup" exact component={RegisterPage}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route
          path="/accountdetails"
          exact
          component={AccountDetailsPage}
        ></Route>
      </Switch>
    </Router>
  );
}
