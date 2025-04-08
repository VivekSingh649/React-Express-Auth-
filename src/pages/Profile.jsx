import {
  Shield,
  ShieldCheck,
  Mail,
  User,
  Edit,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import ProfileSkeleton from "../components/ProfileSkeleton";
const Profile = () => {
  const { user, searching } = useContext(AuthContext);

  return (
    <div className="gradient_bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <section className="relative h-screen w-full flex items-center justify-center p-6">
            <div className="py-8 max-w-md w-full">
              {searching ? (
                <ProfileSkeleton />
              ) : user ? (
                <div className="bg-white rounded-4xl shadow p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={
                          user?.avatar ||
                          "https://api.dicebear.com/9.x/adventurer/svg?seed=Jude"
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-100"
                      />
                      <button className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <Edit size={18} className="text-gray-600" />
                      </button>
                    </div>

                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {user?.firstName}
                        </h1>
                        {user?.isAccountVerified ? (
                          <ShieldCheck className="text-green-500" size={24} />
                        ) : (
                          <ShieldAlert className="text-red-400" size={24} />
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                        <Mail size={18} />
                        <span>{user?.email}</span>
                      </div>
                      <p className="mt-2 text-gray-500">
                        Member since:{" "}
                        {user?.createdAt ? (
                          new Date(user.createdAt).toLocaleString("en-us", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        ) : (
                          <span className="text-red-500">Not Mentioned</span>
                        )}
                      </p>
                    </div>

                    {!user?.isAccountVerified ? (
                      <div className="mt-6 px-4 py-2 rounded-full flex items-center gap-2 bg-red-100 text-red-700 transition-colors">
                        <ShieldAlert size={20} />
                        <span>Your Account is not verified</span>
                      </div>
                    ) : (
                      <div className="mt-6 px-4 py-2 rounded-full flex items-center gap-2 bg-green-100 text-green-700 transition-colors">
                        <ShieldCheck size={20} />
                        <span>Account Verified</span>
                      </div>
                    )}

                    <div className="mt-8 flex w-full justify-center gap-4">
                      {!user?.isAccountVerified && (
                        <Link to="/verify-account" className="btn-otuline">
                          Verify Account
                        </Link>
                      )}
                      <Link to="/forgot-password" className="btn-otuline">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-4xl shadow p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={
                          user?.avatar ||
                          "https://api.dicebear.com/9.x/adventurer/svg?seed=Jude"
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-100"
                      />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      No user found!
                    </h1>
                  </div>
                  <div className="mt-8 flex w-full justify-center gap-4">
                    <Link to="/login" className="btn-otuline">
                      Login
                    </Link>
                    <Link to="/forgot-password" className="btn-otuline">
                      Forgot Password
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
