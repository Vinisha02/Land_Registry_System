import React, { useState, useContext, useEffect } from "react"; 
import PaymentCard from "../User/MakePayment";
import { LandRegContext } from "@/context/LandReg";
import AddLands from "./AddLands";
import MyLands from "../User/MyLands";
import LandGallery from "./LandGallery";
import Dashboard from "../Dashboard";
import MyReceivedReq from "./MyReceivedReq";
import MySentRequest from "./MySentRequest";

export default function Home() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { userRegistration, LandReg } = useContext(LandRegContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

 

  const sections = {
    
    "Add Lands": <AddLands />,
    "My Lands": <MyLands />,
    "Land Gallery": <LandGallery />,
    "My Received Request": <MyReceivedReq />,
    "My Sent Request": <MySentRequest />,
    Logout: (
      <button
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        Logout
      </button>
    ),
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-1/4 bg-gray-980 shadow-lg shadow-teal-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <div className="space-y-4">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex items-center space-x-3 w-full text-left px-4 py-2 rounded-lg transition ${
                activeSection === section ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-10">
        <h1 className="text-3xl font-bold mb-4">{activeSection}</h1>
        
        {loading ? (
          <p className="text-white">Loading user data...</p>
        ) : userData ? (
          <div className="text-white">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>City:</strong> {userData.city}</p>
            <p><strong>Aadhar Number:</strong> {userData.aadharNumber}</p>
            <p><strong>PAN Number:</strong> {userData.panNumber}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        ) : (
          <p className="text-white">No user data found. Please register.</p>
        )}

        <div className="text-gray-700">{sections[activeSection]}</div>
      </div>
    </div>
  );
}



