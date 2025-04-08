import {
  ChevronLeft,
  Forward,
  LockOpen,
  Mail,
  KeyRound,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import OtpInput from "../components/OtpInput";
import ResetPassword from "./ResetPassword";
import AuthCard from "../components/AuthCard";
import StepsProgress from "../components/StepsProgress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: "email",
    title: "Forgot Password",
    description: "Enter your email address to receive a verification code",
    icon: Mail,
  },
  {
    id: "otp",
    title: "Verify Email",
    description: "Enter the 6-digit code sent to your email",
    icon: KeyRound,
  },
  {
    id: "reset",
    title: "Reset Password",
    description: "Create a new password for your account",
    icon: LockOpen,
  },
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { sendForgotPasswordOTP, resetPassword } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email");
  const navigate = useNavigate();

  useEffect(() => {
    const currentStep = steps.find((s) => s.id === step);
    document.title = `${currentStep.title} | Your App Name`;
  }, [step]);

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Please enter your email");
      setLoading(false);
      return;
    }
    try {
      await sendForgotPasswordOTP(email).then((res) => {
        if (res.success) {
          setStep("otp");
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otpValue) => {
    setOtp(otpValue);
    setStep("reset");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!newPassword) {
      toast.error("Please enter your new password");
      setLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    try {
      await resetPassword(email, newPassword, otp).then((res) => {
        if (res.success) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    const currentStep = steps.find((s) => s.id === step);

    return (
      <AuthCard
        icon={currentStep.icon}
        title={currentStep.title}
        description={currentStep.description}
      >
        {step === "email" && (
          <form onSubmit={handleSendOTP} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Back to login
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary flex items-center gap-2
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Next
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <div className="mt-8 space-y-6">
            <OtpInput onComplete={handleVerifyOTP} />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("email")}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Change email
              </button>
              <button
                onClick={() => handleSendOTP()}
                disabled={loading}
                className="btn-primary"
              >
                Resend code
              </button>
            </div>
          </div>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
            <ResetPassword
              password={newPassword}
              setPassword={setNewPassword}
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("otp")}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Change Otp
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    Changing...
                    <ArrowRight size={16} />
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        )}
      </AuthCard>
    );
  };

  return (
    <div className="gradient_bg">
      <div className="container mx-auto">
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center">
          <StepsProgress steps={steps} currentStep={currentStepIndex} />
          {renderStepContent()}
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
