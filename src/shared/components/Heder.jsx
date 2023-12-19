import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { Link } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import {selectIsLoggedIn , selectCurrentUser } from "../../features/auth/redux/authSelectors"
import { logOut } from "../../features/auth/redux/authSlice";
import { useLogoutMutation } from "../../features/auth/redux/authApiSlice";

function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user =  useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar shouldHideOnScroll >
        <NavbarBrand>
          <p className="font-bold">
            {""}
            <Link to="/" >SyndiPay</Link>
          </p>
        </NavbarBrand>
        
        { 
        isLoggedIn && 
          <>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/apartments">
            Apartments
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/clients" aria-current="page">
            Clients
          </Link>
        </NavbarItem>
    
      </NavbarContent>
      </>
      }
          
          

        { isLoggedIn ? (
          <>
         
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <User
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name= {user.firstName+' '+user.lastName}
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    textValue="Signed in as"
                  >
                    <p className="font-semibold">Signed in as </p>
                    <p className="font-semibold text-success-500 ">{user.roles[0]}</p>
                  </DropdownItem>

                  <DropdownItem key="logout" color="danger" textValue="Log Out">
                    <Link  onClick={handleLogout} >Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </>
          
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <Link className="font-bold " to="/auth/login" >
                Login
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} to="/auth/register" className="font-bold text-white " color="success" >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
    </>
  );
}

export default Header;