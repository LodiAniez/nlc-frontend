import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Routes as PageRoutes } from "@constants/pages";
import LoginPage from "@pages/public/login";
import ProtectedLayout from "@pages/protected/layout";
import ProtectedRoute from "@pages/protected/protected-route";
import ServiceOrdersPage from "@pages/protected/service-orders";
import ProjectsPage from "@pages/protected/projects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PageRoutes.LOGIN} element={<LoginPage />} />
        <Route
          path={PageRoutes.SERVICE_ORDERS}
          element={
            <ProtectedRoute
              element={
                <ProtectedLayout>
                  <ServiceOrdersPage />
                </ProtectedLayout>
              }
            />
          }
        />
        <Route
          path={PageRoutes.PROJECTS}
          element={
            <ProtectedRoute
              element={
                <ProtectedLayout>
                  <ProjectsPage />
                </ProtectedLayout>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to={PageRoutes.LOGIN} />} />
      </Routes>
    </Router>
  );
}

export default App;
