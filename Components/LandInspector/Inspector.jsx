import React, { useState, useContext } from "react";
import { LandRegContext } from "@/context/LandReg";
import VerifyUser from "./VerifyUser";
import VerifyLand from "./VerifyLand";
import Transfer from "./Transfer"
import LDashboard from "./Ldashboard"
import TransferOwnerShip from "./TransferOwnerShip"


export default function Home() {
  const [activeSection, setActiveSection] = useState("Dashboard");


  const Logout = ()=> {
   
  }

  const sections = {
    "Dashboard":<LDashboard/>,
    "Verify User": <VerifyUser />,
    "Verify Land": <VerifyLand />,
    "Transfer Ownership": <TransferOwnerShip/>,
    
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
                activeSection === section
                  ? "bg-gray-600"
                  : "hover:bg-gray-700 focus:outline-none"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-10">
        <h1 className="text-3xl font-bold mb-4">{activeSection}</h1>
        <div className="text-gray-700">{sections[activeSection]}</div>
      </div>
    </div>
  );
}
