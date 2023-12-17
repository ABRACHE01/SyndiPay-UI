import { Route, Routes } from "react-router";
import { ClientsPage } from "../pages";




const ClientRoutes = () => (
  <Routes>
    <Route path="/" element="">
      <Route index element={<ClientsPage />} />
    </Route>
  </Routes>
);

export default ClientRoutes;
