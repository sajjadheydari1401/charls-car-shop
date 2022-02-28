import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import styled from "styled-components";
import routes from "./routes";

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  flex-grow: 1;
  padding: 0 60px;
  background-color: #e9ecef;
`;

const App = () => {
  const user = false;
  const routing = useRoutes(routes(user));

  return (
    <Main>
      <NavBarComponent />
      <Container>{routing}</Container>
    </Main>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
