import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email ,setEmail] = useState("")
  
  React.useEffect(() => {
    if (location.state?.email) {
    setEmail(location.state.email);
    }
    }, [location.state]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };
  const handleChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    dispatch(verifyOTP(email, otp, navigate));
  };

  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 p-8 shadow-xl">

        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-3xl">
            📩
          </div>
        </div>

        <h1 className="text-center text-3xl font-semibold text-richblack-5">
          Verify your email
        </h1>

        <p className="mt-3 text-center text-sm text-richblack-300">
          Enter the 6-digit verification code sent to
          <span className="block font-medium text-yellow-50">
            {email || "your email"}
          </span>
        </p>

        <form onSubmit={handleVerify} className="mt-8">

            <label>
                <p>Email</p>
                <input
                required
                name="email"
                value={email}
                placeholder="enter your email"
                onChange={handleEmailChange}
                 className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-center text-xl tracking-[0.5em] text-white outline-none focus:border-yellow-50"/>

            </label>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm text-richblack-5"
          >
            Verification code
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-center text-xl tracking-[0.5em] text-white outline-none focus:border-yellow-50"
          />

          <button
            type="submit"
            disabled={otp.length !== 6}
            className="mt-6 w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify OTP
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-5 w-full text-sm text-richblack-300 hover:text-yellow-50"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;