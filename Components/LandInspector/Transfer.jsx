import jsPDF from "jspdf";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LandRegContext } from "@/context/LandReg";

export default function Transfer({ record, onBack }) {
  const router = useRouter();

  const landIdFromQuery = router.query.landId;
  const currentRecord = record || { landId: landIdFromQuery };

  const {
    transferLandOwnership,
    getUserData,      
    getLandGallery,    
  } = useContext(LandRegContext);

 
  const sellerAddress = currentRecord.sellerAddress || "";
  const buyerAddress = currentRecord.buyerAddress || "";

  
  const [sellerName, setSellerName] = useState("");
  const [sellerAge, setSellerAge] = useState("");
  const [sellerCity, setSellerCity] = useState("");
  const [sellerWallet, setSellerWallet] = useState(sellerAddress);
  const [sellerAadhar, setSellerAadhar] = useState("");
  const [sellerPan, setSellerPan] = useState("");
  const [sellerPhoto, setSellerPhoto] = useState(null);

  
  const [buyerName, setBuyerName] = useState("");
  const [buyerAge, setBuyerAge] = useState("");
  const [buyerCity, setBuyerCity] = useState("");
  const [buyerWallet, setBuyerWallet] = useState(buyerAddress);
  const [buyerAadhar, setBuyerAadhar] = useState("");
  const [buyerPan, setBuyerPan] = useState("");
  const [buyerPhoto, setBuyerPhoto] = useState(null);

  
  const [landOwnerAddress, setLandOwnerAddress] = useState(currentRecord.ownerAddress || "");
  const [landArea, setLandArea] = useState(currentRecord.area || "");
  const [landPid, setLandPid] = useState(currentRecord.pid || "");
  const [landSurveyNo, setLandSurveyNo] = useState(currentRecord.surveyNo || "");
  const [landLocation, setLandLocation] = useState("India");
  const [landPrice, setLandPrice] = useState(currentRecord.price || "");

  
  const [witnessName, setWitnessName] = useState("");
  const [witnessAge, setWitnessAge] = useState("");
  const [witnessAddress, setWitnessAddress] = useState("");
  const [witnessPhoto, setWitnessPhoto] = useState(null);

  
  const [paymentStatus, setPaymentStatus] = useState("Payment Done");
  const [isTransferred, setIsTransferred] = useState(false);

  
  const [step, setStep] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let stream = null;

  
  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log("Starting camera for step:", step);
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Camera access denied. Please allow permissions.");
      }
    };
    startCamera();

    return () => {
      
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [step]);

 
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 200, 200);
    const photo = canvasRef.current.toDataURL("image/png");

   
    if (step === 0) {
      setSellerPhoto(photo);
      setStep(1);
    } else if (step === 1) {
      setBuyerPhoto(photo);
      setStep(2);
    } else if (step === 2) {
      setWitnessPhoto(photo);
      setStep(3);
    }
  };

  
  const isAllPhotosCaptured = step >= 3;

  useEffect(() => {
    const fetchSellerBuyerData = async () => {
      try {
        if (sellerAddress) {
          const sellerData = await getUserData(sellerAddress);
          setSellerName(sellerData.name);
          setSellerAge(sellerData.age);
          setSellerCity(sellerData.city);
          setSellerAadhar(sellerData.aadharNumber);
          setSellerPan(sellerData.panNumber);
        }
        if (buyerAddress) {
          const buyerData = await getUserData(buyerAddress);
          setBuyerName(buyerData.name);
          setBuyerAge(buyerData.age);
          setBuyerCity(buyerData.city);
          setBuyerAadhar(buyerData.aadharNumber);
          setBuyerPan(buyerData.panNumber);
        }
      } catch (err) {
        console.error("Error fetching seller/buyer user data:", err);
      }
    };
    fetchSellerBuyerData();
  }, [sellerAddress, buyerAddress, getUserData]);

  
  useEffect(() => {
    const fetchLandData = async () => {
      try {
        const landId = currentRecord.landId;
        if (!landId) return;

        const gallery = await getLandGallery();
        const found = gallery.find((item) => item.id.toString() === landId.toString());
        if (!found) {
          console.log(`No land found with ID ${landId}`);
          return;
        }

        setLandOwnerAddress(found.ownerAddress || "");
        setLandArea(found.area || "");
        setLandPid(found.pid || "");
        setLandSurveyNo(found.surveyNo || "");
        setLandLocation("India");
        setLandPrice(found.price || "");
      } catch (err) {
        console.error("Error fetching land data:", err);
      }
    };
    fetchLandData();
  }, [currentRecord.landId, getLandGallery]);

  
  const [isWitnessInfoFilled, setIsWitnessInfoFilled] = useState(false);
  const handleWitnessInfoChange = () => {
    if (witnessName && witnessAge && witnessAddress) {
      setIsWitnessInfoFilled(true);
    } else {
      setIsWitnessInfoFilled(false);
    }
  };

  const isSellerInfoFilled = () =>
    sellerName && sellerAge && sellerCity && sellerWallet && sellerAadhar && sellerPan;

  const isBuyerInfoFilled = () =>
    buyerName && buyerAge && buyerCity && buyerWallet && buyerAadhar && buyerPan;

  const isLandInfoFilled = () =>
    landOwnerAddress && landArea && landPid && landSurveyNo && landLocation && landPrice;

  const handleTransfer = async () => {
    const requestId = currentRecord.requestId || currentRecord.landId;
    if (
      isSellerInfoFilled() &&
      isBuyerInfoFilled() &&
      isLandInfoFilled() &&
      isWitnessInfoFilled &&
      sellerPhoto &&
      buyerPhoto &&
      witnessPhoto &&
      paymentStatus === "Payment Done" &&
      requestId
    ) {
      
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Ownership Transfer Document", 20, 20);


      doc.setFontSize(12);
      doc.text("Seller Information:", 20, 40);
      doc.text(`Name: ${sellerName}`, 20, 50);
      doc.text(`Age: ${sellerAge}`, 20, 60);
      doc.text(`City: ${sellerCity}`, 20, 70);
      doc.text(`Wallet: ${sellerWallet}`, 20, 80);
      doc.text(`Aadhaar: ${sellerAadhar}`, 20, 90);
      doc.text(`PAN: ${sellerPan}`, 20, 100);

     
      doc.text("Buyer Information:", 20, 120);
      doc.text(`Name: ${buyerName}`, 20, 130);
      doc.text(`Age: ${buyerAge}`, 20, 140);
      doc.text(`City: ${buyerCity}`, 20, 150);
      doc.text(`Wallet: ${buyerWallet}`, 20, 160);
      doc.text(`Aadhaar: ${buyerAadhar}`, 20, 170);
      doc.text(`PAN: ${buyerPan}`, 20, 180);

      doc.text("Witness Information:", 20, 200);
      doc.text(`Name: ${witnessName}`, 20, 210);
      doc.text(`Age: ${witnessAge}`, 20, 220);
      doc.text(`Address: ${witnessAddress}`, 20, 230);

     
      doc.text("Land Information:", 20, 250);
      doc.text(`Owner: ${landOwnerAddress}`, 20, 260);
      doc.text(`Area: ${landArea}`, 20, 270);
      doc.text(`PID: ${landPid}`, 20, 280);
      doc.text(`Survey No.: ${landSurveyNo}`, 20, 290);
      doc.text(`Location: "India"`, 20, 300);

      doc.text(`Price: ${landPrice}`, 20, 310);

      const documentUrl = doc.output("datauristring");

      try {
        const receipt = await transferLandOwnership(requestId.toString(), documentUrl);
        console.log("Transfer successful:", receipt);
        setIsTransferred(true);
        doc.save("Ownership_Transfer_Document.pdf");
      } catch (error) {
        console.error("Error during transfer:", error);
      }
    } else {
      console.log("Please fill all fields, capture photos, confirm payment, and have a valid requestId.");
    }
  };

  
  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-6">Transfer Ownership</h1>
        <p className="text-center mb-4">
          Payment Status: <span className="font-bold">{paymentStatus}</span>
        </p>

        {}
        <div className="flex flex-col items-center mb-8">
          {step < 3 ? (
            <div className="w-52 h-52 border rounded-lg overflow-hidden relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            </div>
          ) : (
            <p className="p-4 text-center">All photos captured ✅</p>
          )}

          <canvas ref={canvasRef} width="200" height="200" className="hidden"></canvas>

          <button
            onClick={capturePhoto}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md disabled:opacity-50"
            disabled={step >= 3}
          >
            {step === 0
              ? "Capture Seller Photo"
              : step === 1
              ? "Capture Buyer Photo"
              : step === 2
              ? "Capture Witness Photo"
              : "All Photos Captured"}
          </button>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {}
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Seller Profile</h2>
            {sellerPhoto ? (
              <img src={sellerPhoto} alt="Seller" className="w-40 h-40 rounded-lg mb-4" />
            ) : (
              <p className="text-sm mb-4">No Seller Photo Yet</p>
            )}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Seller Name"
                value={sellerName}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Seller Age"
                value={sellerAge}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Seller City"
                value={sellerCity}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Seller Wallet"
                value={sellerWallet}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Seller Aadhaar"
                value={sellerAadhar}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Seller PAN"
                value={sellerPan}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
            </div>
          </div>

          {}
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Buyer Profile</h2>
            {buyerPhoto ? (
              <img src={buyerPhoto} alt="Buyer" className="w-40 h-40 rounded-lg mb-4" />
            ) : (
              <p className="text-sm mb-4">No Buyer Photo Yet</p>
            )}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Buyer Name"
                value={buyerName}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Buyer Age"
                value={buyerAge}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Buyer City"
                value={buyerCity}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Buyer Wallet"
                value={buyerWallet}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Buyer Aadhaar"
                value={buyerAadhar}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Buyer PAN"
                value={buyerPan}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
            </div>
          </div>

          {}
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Land Info</h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Owner Address"
                value={landOwnerAddress}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Area"
                value={landArea}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="PID"
                value={landPid}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Survey No."
                value={landSurveyNo}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Location"
                value={landLocation}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
              <input
                type="text"
                placeholder="Price"
                value={landPrice}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg text-black bg-gray-100"
              />
            </div>
          </div>

          {}
          <div className="p-6 rounded-lg shadow-md bg-background">
            <h2 className="text-accent font-semibold text-lg mb-4">Witness Info</h2>
            {witnessPhoto ? (
              <img src={witnessPhoto} alt="Witness" className="w-40 h-40 rounded-lg mb-4" />
            ) : (
              <p className="text-sm mb-4">No Witness Photo Yet</p>
            )}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Witness Name"
                value={witnessName}
                onChange={(e) => {
                  setWitnessName(e.target.value);
                  handleWitnessInfoChange();
                }}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Witness Age"
                value={witnessAge}
                onChange={(e) => {
                  setWitnessAge(e.target.value);
                  handleWitnessInfoChange();
                }}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Witness Address"
                value={witnessAddress}
                onChange={(e) => {
                  setWitnessAddress(e.target.value);
                  handleWitnessInfoChange();
                }}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>
          </div>
        </div>

        {}
        <div className="flex flex-col items-center justify-center mt-6">
          {isTransferred && (
            <p className="mb-4 text-lg font-semibold text-green-600">
              Successfully Transferred
            </p>
          )}

          <button
            onClick={handleTransfer}
            className={`px-6 py-3 font-bold text-white rounded-lg mt-4 ${
              isSellerInfoFilled() &&
              isBuyerInfoFilled() &&
              isLandInfoFilled() &&
              isWitnessInfoFilled &&
              sellerPhoto &&
              buyerPhoto &&
              witnessPhoto &&
              paymentStatus === "Payment Done" &&
              !isTransferred
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={
              !(
                isSellerInfoFilled() &&
                isBuyerInfoFilled() &&
                isLandInfoFilled() &&
                isWitnessInfoFilled &&
                sellerPhoto &&
                buyerPhoto &&
                witnessPhoto &&
                paymentStatus === "Payment Done" &&
                !isTransferred
              )
            }
          >
            {isTransferred ? "Ownership Transferred" : "Transfer"}
          </button>
        </div>

        {}
        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-300 text-black rounded"
          >
            Back
          </button>
        )}
      </div>

      {}
    </div>
  );
}
