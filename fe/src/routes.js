import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBarMenu from "./components/sidebar-menu/SideBarMenu";
import AccountDetailsPage from "./pages/accountdetailspage/AccountDetailsPage";
import CommunityPage from "./pages/communitytoppage/CommunityPage";
import Home from "./pages/homepage/HomePage.jsx";
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
        <Route
          path="/accountdetails"
          exact
          component={AccountDetailsPage}
        ></Route>
        <>
          <SideBarMenu />
          <Route path="/home" component={Home}></Route>
          <Route path="/community" exact component={CommunityPage}></Route>
        </>
      </Switch>
    </Router>
  );
}
