import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const user = false;
  const routing = useRoutes(routes(user));

  return (
    <div className="App">
      {routing}
    </div>
  );
}


const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
