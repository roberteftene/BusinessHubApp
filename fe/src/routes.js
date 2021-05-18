import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBarMenu from "./components/sidebar-menu/SideBarMenu";
import SideBarMenuBusiness from "./components/sidebar-menu/SideBarMenuBusiness";
import AccountDetailsPage from "./pages/accountdetailspage/AccountDetailsPage";
import BusinessDashboardPage from "./pages/businessdashboardpage/BusinessDashboardPage.jsx";
import BusinessProfilePage from "./pages/businessprofilepage/BusinessProfilePage";
import CommunityPage from "./pages/communitytoppage/CommunityPage";
import Home from "./pages/homepage/HomePage.jsx";
import LandingPage from "./pages/landingpage/landingPage";
import LoginPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import RegisterPage from "./pages/registerpage/registerPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/signin" component={LoginPage}></Route>
        <Route path="/signup" component={RegisterPage}></Route>
        <Route path="/accountdetails" component={AccountDetailsPage}></Route>
        <>
          <SideBarMenu />
          <Route path="/home" exact component={Home}></Route>
          <Route path="/community" component={CommunityPage}></Route>
          <Route path="/profile" component={ProfilePage} />
          <>
            <SideBarMenuBusiness />
            <Route
              path="/business-dashboard"
              component={BusinessDashboardPage}
            />
            <Route path="/business-profile" component={BusinessProfilePage} />
          </>
        </>
      </Switch>
    </Router>
  );
}
