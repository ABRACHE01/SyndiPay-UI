import { Route, Routes } from "react-router";
import { VerifyEmailPage } from "../pages";

const MailRoutes = () => (
  <Routes>
    <Route path="verify-email" element={<VerifyEmailPage />} />
  </Routes>
);

export default MailRoutes;
