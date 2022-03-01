import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useLogout from "../../../shared/hooks/firebaseHooks/useLogout";
import Button from "../Button/Button";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useContext<string | any>(AuthContext);
  return (
    <div className="bg-[#4E95C3] h-[134px]">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link to={"/"}>
              <h1 className="pt-[37px] pb-9 pl-[100px] text-white font-normal text-5xl">
                TourWithUs
              </h1>
            </Link>
          </li>

          {!user ? (
            <div className="flex pr-[100px] space-x-6 items-center">
              <li>
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
              </li>
              <li>
                <Link to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex pr-[100px] items-center space-x-6">
              <li>Hello, {user.displayName}</li>
              <li>
                <Button
                  onClick={logout}
                  bgColor="bg-green-500"
                  borderColor="border-white"
                  textColor="text-white"
                >
                  Logout
                </Button>
              </li>
              <li>
                <Link to={`/profile/${user.uid}`}>
                  <Button>Profile</Button>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
