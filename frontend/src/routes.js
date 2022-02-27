import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = (user) => [
  {
    path: "/",
    element: user ? <DashboardPage /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: !user ? <LoginPage /> : <Navigate to="/" />,
  },
  {
    path: "/register",
    element: !user ? <RegisterPage /> : <Navigate to="/" />,
  },
  {
    path: "/admin",
    element: user ? <AdminPanelPage /> : <Navigate to="/login" />,
  },
  {
    path: "/notfound",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/notfound" />,
  },
];

export default routes;
