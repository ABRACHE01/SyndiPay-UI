import { Route, Routes } from "react-router";
import { RootLayout } from "./shared/layouts";
import { NotFoundPage } from "./shared/pages";
import AuthRoutes from "./features/auth/routes/AuthRoutes";
import MailRoutes from "./features/mail/routes/MailRoutes";
import ApartmentRoutes from "./features/apartment/routes/ApartmentRoutes";
import { AuthMiddleware } from "./features/auth/middlewares";
import LandingPage from "./shared/pages/LandingPage";
import Dashboard from "./shared/pages/Dashboard"


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage/>} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/mail/*" element={<MailRoutes />} />
        
        <Route 
        path="/apartments/*" 
        element={
        <AuthMiddleware>
        <ApartmentRoutes />
        </AuthMiddleware>
        } />

        <Route
          path="/dashboard/*"
          element={
            <AuthMiddleware>
              <Dashboard/>
            </AuthMiddleware>
          }
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>

  );
}

export default App;
