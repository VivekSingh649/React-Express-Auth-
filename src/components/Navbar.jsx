import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { Loader2, Power } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    await logoutUser().then((data) => {
      setTimeout(() => {
        if (data.success) {
          navigate("/login");
          setLoading(false);
        } else {
          setLoading(false);
        }
      }, 1500);
    });
  };
  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-5xl w-full bg-white border border-gray-200 rounded-full mx-2 py-2.5 px-4 md:flex md:items-center md:justify-between md:px-6 md:mx-auto">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              to="/"
              aria-label="Preline"
            >
              <img
                src="/assets/images/light-logo.svg"
                alt="logo"
                className="w-36 h-auto"
              />
            </Link>
            {/* End Logo */}

            <div className="ms-1 sm:ms-2"></div>
          </div>

          <div className="md:hidden">
            {/* Toggle Button */}
            <button
              type="button"
              className="hs-collapse-toggle flex justify-center items-center size-7 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            {/* End Toggle Button */}
          </div>
        </div>

        <div
          id="hs-navbar-header-floating"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-navbar-header-floating-collapse"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7 main_menu">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className="menu_item font-medium text-gray-800"
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button className="btn-primary" onClick={handleLogout}>
                {loading ? (
                  <Loader2 size={"16"} className="animate-spin" />
                ) : (
                  <Power size={"16"} />
                )}
                {loading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link to="/login" className="btn-primary">
                <Power size={"16"} />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
