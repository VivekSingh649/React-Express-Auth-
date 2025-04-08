import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, MailCheck } from "lucide-react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [step, setStep] = useState("confirm");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const { sendVerificationOTP, verifyAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setLoading(true);
    setSent(true);
    setTimer(30);
    await sendVerificationOTP().then((data) => {
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          setStep("otp");
        }, 1500);
      } else {
        setLoading(false);
        setSent(false);
      }
    });
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setSent(true);
    await verifyAccount(otp.join("")).then((data) => {
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          navigate("/profile");
        }, 1500);
      } else {
        setLoading(false);
        setSent(false);
      }
    });
  };

  const reverseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(reverseTimer, 1000);
    return () => clearInterval(interval);
  }, [timer]);

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
            <div className="max-w-md w-full bg-white rounded-4xl shadow-lg p-8">
              {step === "confirm" ? (
                <div className="text-center">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Verify Your Email
                  </h2>
                  <p className="mt-2 text-gray-600">
                    We'll send a verification code to your email address to
                    confirm your identity.
                  </p>
                  <button
                    onClick={handleSendOTP}
                    disabled={loading}
                    className={`mt-6 w-full btn-primary ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <Mail size={18} />
                    {loading ? "Sending..." : "Send Verification Code"}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <MailCheck className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Enter Verification Code
                  </h2>
                  <p className="mt-2 text-gray-600">
                    We've sent a code to your email.
                    <br /> Please enter it below.
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-2xl font-bold outline-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !p-0"
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.join("").length !== 6}
                    className={`mt-6 w-full btn-primary ${
                      loading || otp.join("").length !== 6
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                  {sent && (
                    <div className="flex mt-4 justify-center gap-4">
                      {timer > 0 ? (
                        <>
                          <p className="text-gray-600">Next OTP</p>
                          <p className="text-gray-600">
                            00:{`${timer < 10 ? "0" + timer : timer}`}
                          </p>
                        </>
                      ) : (
                        <button onClick={handleSendOTP} className="btn-otuline">
                          Resend OTP
                        </button>
                      )}
                    </div>
                  )}
                  {sent && (
                    <p className="text-red-600 mt-2">
                      OTP will expire in 60 Min.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyAccount;
