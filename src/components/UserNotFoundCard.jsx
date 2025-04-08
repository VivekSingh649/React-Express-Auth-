import { UserX, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import AuthCard from "./AuthCard";

const UserNotFoundCard = () => {
  return (
    <AuthCard
      icon={UserX}
      title="Account Not Found"
      description="We couldn't find an account with this email address. Would you like to create a new account or try logging in?"
    >
      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login to Existing Account
          </Link>
          <Link
            to="/register"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            Create New Account
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto"
        >
          Try Different Email
        </button>
      </div>
    </AuthCard>
  );
};

export default UserNotFoundCard;
