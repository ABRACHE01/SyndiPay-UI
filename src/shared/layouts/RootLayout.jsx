import { Outlet } from "react-router";
import { Header } from "../components"

const RootLayout = () => {
      
  return (
    <>
    <Header/>
      <Outlet/>
    </>
  );
};

export default RootLayout;
