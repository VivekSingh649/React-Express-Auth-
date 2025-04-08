import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser, loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }
    await loginUser(formData.email, formData.password);
  };
  return (
    <div className="gradient_bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto ">
          <section className="relative h-screen w-full flex items-center justify-center">
            <div className="relative max-w-lg md:mx-auto mx-6 w-full flex flex-col justify-center bg-white rounded-lg p-6">
              <div className="text-start mb-7">
                <a href="index.html" className="grow block mb-4">
                  <img
                    className="h-12 mx-auto"
                    src="assets/images/light-logo.svg"
                    alt="images"
                  />
                </a>
                <div className="text-center">
                  <p className="text-base font-medium text-light">
                    Welcome back! Select method to sign up
                  </p>
                </div>
              </div>
              <form className="text-start w-full" onSubmit={handleOnSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email-addon"
                    className="block text-base font-semibold text-dark mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email-addon"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    className="input-field"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password-addon"
                    className="block text-base font-semibold text-dark mb-2"
                  >
                    Password
                  </label>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password-addon"
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                      className="form-password input-field"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="inline-flex items-center justify-center py-2.5 px-4 border rounded-e-md -ms-px border-gray-300 cursor-pointer"
                    >
                      {showPassword ? (
                        <Eye color="gray" size={20} />
                      ) : (
                        <EyeOff color="gray" size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center flex-wrap gap-x-1 gap-y-2 mb-6 mt-3">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="checkbox-signin"
                      className="h-4 w-4 text-base rounded border-gray-300 text-dark focus:ring focus:ring-default-950/30 focus:ring-offset-0"
                    />
                    <label
                      className="text-base ms-2 text-light font-medium align-middle select-none"
                      htmlFor="checkbox-signin"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-base text-dark">
                    <small>Forgot your password?</small>
                  </Link>
                </div>
                <div className="text-center mb-7">
                  <button type="submit" className="w-full btn-primary">
                    Log In
                  </button>
                </div>
                {/* <div className="flex items-center my-6">
                <div className="flex-auto mt-px border-t border-dashed border-gray-800" />
                <div className="mx-4 text-dark">Or</div>
                <div className="flex-auto mt-px border-t border-dashed border-gray-800" />
              </div>
              <div className="flex md:justify-between justify-center items-center mb-8 md:gap-9 gap-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 gap-4 py-2.5 font-medium backdrop-blur-2xl border border-gray-300 bg-white text-dark rounded-md transition-all duration-500"
                >
                  <img
                    src="assets/images/google.png"
                    alt=""
                    className="max-w-5 h-5 text-dark "
                  />
                  Google
                </button>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 gap-4 py-2.5 font-medium backdrop-blur-2xl border border-gray-300 bg-white text-dark rounded-md transition-all duration-500 group"
                >
                  <img
                    src="assets/images/facebook.png"
                    alt=""
                    className="max-w-5 h-5 text-dark"
                  />
                  Facebook
                </button>
              </div> */}
                <p className="shrink text-light text-center">
                  Don't have an account ?
                  <Link to="/register" className="text-dark font-semibold ms-1">
                    <b>Register</b>
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
