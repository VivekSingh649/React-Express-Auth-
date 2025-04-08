import { useState, useContext } from "react";
import { Eye, EyeOff, Forward, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.firstName || !formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    const { firstName, email, password } = formData;
    await registerUser(firstName, email, password).then((res) => {
      console.log(res);
      if (res) {
        setLoading(false);
        navigate("/profile");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <div className="gradient_bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
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
                    htmlFor="fullname-addon"
                    className="block text-base font-semibold text-dark mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname-addon"
                    className="input-field"
                    type="text"
                    placeholder="Enter your Full name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email-addon"
                    className="block text-base font-semibold text-dark mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email-addon"
                    className="input-field"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
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
                      className="form-password input-field"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
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
                    {loading ? (
                      <RotateCcw size={"16"} className="animate-spin" />
                    ) : (
                      <>
                        <Forward size={"16"} />
                        Register
                      </>
                    )}
                  </button>
                </div>
                <p className="shrink text-light text-center">
                  Already have an account ?
                  <Link to="/login" className="text-dark font-semibold ms-1">
                    <b>Login</b>
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

export default Register;
