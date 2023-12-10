import { Route, Routes } from "react-router";
import { ApartmentsPage } from "../pages";




const ApartmentRoutes = () => (
  <Routes>
    <Route path="/" element="">
      <Route index element={<ApartmentsPage />} />
    </Route>
  </Routes>
);

export default ApartmentRoutes;
