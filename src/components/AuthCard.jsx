import { motion } from "framer-motion";

const AuthCard = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          {description && <p className="text-gray-600 mb-6">{description}</p>}
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthCard;
