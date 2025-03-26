import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from '@/context/LandReg';
import { ethers } from "ethers";

const ConfirmPaymentCard = ({
  buyerAddress,
  ownerAddress,
  amountInRupees,
  ethConversionRate,
  onCancel,
  onConfirm,
}) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // Track payment status
  const [loading, setLoading] = useState(false); // Track loading state during payment

  if (!TrackingContext) {
    console.error("TrackingContext is not available.");
    return null;
  }

  const { currentUser, connectToMetaMask, makePayment } = useContext(TrackingContext);

  
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!currentUser) {
        try {
          await connectToMetaMask();
        } catch (error) {
          console.error("Failed to connect wallet:", error.message);
        }
      }
    };

    checkWalletConnection();
  }, [currentUser, connectToMetaMask]);

  const amountInEth = parseFloat(amountInRupees) * 0.0000031600;
  const amountInEthString = amountInEth.toFixed(18);

  console.log("Amount in eth:", amountInEth);
  console.log("ETH Conversion Rate:", ethConversionRate);

  const handlePayment = async () => {


    if (amountInEth <= 0) {
      console.error("Payment amount must be greater than zero.");
      alert("Payment amount must be greater than zero.");
      return;
    }

    setLoading(true);
    try {
      await makePayment(ownerAddress, amountInEthString, "Payment for shipment");
      setPaymentStatus('success');  onConfirm();
    } catch (error) {
      console.error("Payment failed:", error.message);
      setPaymentStatus('failed'); // Set the payment status to "failed"
    }
    setLoading(false);
  };

  return (
    <>
      {/* Show the payment successful card when payment is confirmed */}
      {paymentStatus === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-black text-white rounded-lg shadow-xl w-[38rem] h-[15rem] p-8 flex flex-col space-y-6">
            <h2 className="text-white text-3xl font-semibold text-center">Payment Successful</h2>
            <div className="space-y-4 flex-1">
              <p className="text-white font-medium text-lg text-center">Your payment has been successfully processed!</p>
            </div>
            <div className="flex justify-center space-x-6 mt-6">
              <button
                onClick={onCancel}
                className="bg-teal-500 text-black px-6 py-3 rounded-lg shadow hover:bg-teal-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show the payment confirmation card if payment is not successful */}
      {paymentStatus !== "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black text-white rounded-lg shadow-xl w-[38rem] h-[28rem] p-8 flex flex-col space-y-6">
            <h2 className="text-teal-400 text-3xl font-semibold text-center">Confirm Payment</h2>

            <div className="space-y-4 flex-1">
              <div>
                <p className="text-gray-400 text-sm">Owner's Address:</p>
                <p className="text-teal-400 font-medium text-sm">{ownerAddress}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Buyer's Address:</p>
                <p className="text-teal-400 font-medium text-sm">{buyerAddress}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex justify-between">
                <p className="text-gray-400 text-base">Amount (₹):</p>
                <p className="text-teal-400 font-semibold text-base">{amountInRupees}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-base">Amount (ETH):</p>
                <p className="text-teal-400 font-semibold text-base">{amountInEth.toString()} ETH</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-6">
              <button
                onClick={onCancel}
                className="bg-orange-500 text-black px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment} 
                className={`bg-teal-500 text-black px-6 py-3 rounded-lg shadow hover:bg-teal-600 transition ${loading && 'opacity-50 cursor-not-allowed'}`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPaymentCard;
