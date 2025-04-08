import { Eye, EyeOff, Forward, RotateCcw } from "lucide-react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <label
          htmlFor="password-addon"
          className="block text-base font-semibold text-dark mb-2"
        >
          Confirm New Password
        </label>
        <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            id="password-addon"
            className="input-field form-password"
            placeholder="Enter your confirm password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center py-2.5 px-4 border rounded-e-md -ms-px border-gray-300 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye color="gray" size={20} />
            ) : (
              <EyeOff color="gray" size={20} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
