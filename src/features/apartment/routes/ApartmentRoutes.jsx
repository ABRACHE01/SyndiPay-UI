import { Route, Routes } from "react-router";
import { ApartmentsPage , ApartmentDetails } from "../pages";




const ApartmentRoutes = () => (
  <Routes>
    <Route path="/" element="">
      <Route index element={<ApartmentsPage />} />
      <Route path="/:id" element={<ApartmentDetails />} />
    </Route>
  </Routes>
);

export default ApartmentRoutes;
