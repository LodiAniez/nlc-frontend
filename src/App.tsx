import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/public/login";
import ProtectedLayout from "./pages/protected/layout";
import { Routes as PageRoutes } from "./constants/pages";
import ProtectedRoute from "./pages/protected/protected-route";
import ServiceOrdersPage from "./pages/protected/service-orders";
import ProjectsPage from "./pages/protected/projects";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path={PageRoutes.LOGIN} element={<LoginPage />} />

        {/* Protected Routes */}
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

        {/* Catch-all route (Redirect to /login if no route matches) */}
        <Route path="*" element={<Navigate to={PageRoutes.LOGIN} />} />
      </Routes>
    </Router>
  );
}

export default App;
