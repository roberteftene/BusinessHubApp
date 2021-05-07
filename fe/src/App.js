import "./custom/custom.scss";
import "./_assets/js/loader";
import "./_assets/js/jquery.waypoints.min";
import "./App.css";
import Routes from "./routes";
import SideBarMenu from "./components/sidebar-menu/SideBarMenu";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
