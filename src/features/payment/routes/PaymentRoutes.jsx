import { Route, Routes } from "react-router";
import { PaymentsPage } from "../pages";




const PaymentRoutes = () => (
  <Routes>
    <Route path="/" element="">
      <Route index element={<PaymentsPage />} />
    </Route>
  </Routes>
);

export default PaymentRoutes;
