import React, { useState, useContext } from "react";
import { LandRegContext } from "@/context/LandReg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Home1 from "../home1";

const secretKey =
  "tjCmgrrcx2b7I83qu80GZhahqrHBGsTBr7Z305xYjc4AToApLWX50purgP8YYjkZn";
const clientIdKey =
  "f4eb75199e000ab1e0f97f3370250ac7:c70b4f66dc0087cbb1da8dc3c2d4ad48";

const UserRegistration = () => {
  const { registerUser } = useContext(LandRegContext);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [document, setDocument] = useState(null);
  const [email, setEmail] = useState("");

  
  const [otp, setOtp] = useState("");
  const [clientID, setClientID] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);

  const sendOTP = async () => {
    if (aadharNumber.length !== 12 || !/^\d+$/.test(aadharNumber)) {
      toast.error("Please enter a valid 12-digit Aadhaar number!", { position: "top-right" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.emptra.com/aadhaarVerification/requestOtp",
        { aadhaarNumber: aadharNumber }, 
        {
          headers: {
            "Content-Type": "application/json",
            secretKey,
            clientID: clientIdKey,
          },
        }
      );
      if (response.data.result?.data?.client_id) {
        setClientID(response.data.result.data.client_id);
        setOtpSent(true);
        toast.success("OTP sent to your registered mobile number.", { position: "top-right" });
      } else {
        toast.error("Failed to send OTP. Try again.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error sending OTP.", { position: "top-right" });
      console.error(error);
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP!", { position: "top-right" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.emptra.com/aadhaarVerification/submitOtp",
        { client_id: clientID, otp },
        {
          headers: {
            "Content-Type": "application/json",
            secretKey,
            clientID: clientIdKey,
          },
        }
      );
      if (response.data.result?.data) {
        toast.success("Aadhaar verified successfully!", { position: "top-right" });
        setIsAadhaarVerified(true);
      } else {
        toast.error("OTP verification failed. Try again.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error verifying OTP.", { position: "top-right" });
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !city || !aadharNumber || !panNumber || !email) {
      console.log(id, name, age, city, aadharNumber, panNumber, document, email);
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    if (!isAadhaarVerified) {
      toast.error("Please verify your Aadhaar before registering!", { position: "top-right" });
      return;
    }

    try {
      
      const Registered = await registerUser(name, age, city, aadharNumber, panNumber, email);
      console.log("Registration response:", Registered);
      toast.success("User has been successfully added!", { position: "top-right" });
      
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("There was an error adding the user. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-[#FFFFFF]">
      <ToastContainer />
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="aadharNumber" className="block text-sm font-medium">
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              value={aadharNumber}
              onChange={(e) => {
                setAadharNumber(e.target.value);
                setIsAadhaarVerified(false);
                setOtpSent(false);
              }}
              placeholder="Enter 12-digit Aadhaar number"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          {aadharNumber && !otpSent && (
            <div>
              <button
                type="button"
                onClick={sendOTP}
                disabled={loading}
                className="w-full px-4 py-2 bg-[#03DAC5] text-[#121212] font-bold rounded-lg hover:bg-[#BB86FC] transition"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {otpSent && !isAadhaarVerified && (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-[#03DAC5] text-[#121212] font-bold rounded-lg hover:bg-[#BB86FC] transition"
                >
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}

          {isAadhaarVerified && (
            <div className="text-green-500 text-center">Aadhaar Verified</div>
          )}

          <div>
            <label htmlFor="panNumber" className="block text-sm font-medium">
              PAN Number
            </label>
            <input
              type="text"
              id="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              placeholder="PAN Number"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium">
              Upload Document
            </label>
            <input
              type="file"
              id="document"
              accept=".jpg,.pdf"
              onChange={(e) => setDocument(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#03DAC5] text-[#121212] font-bold rounded-lg hover:bg-[#BB86FC] transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;