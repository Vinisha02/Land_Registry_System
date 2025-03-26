import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import { LandRegContext } from "@/context/LandReg";

const VerifyLand = () => {
  const [lands, setLands] = useState([]);
  const { verifyLand, getAllLandList } = useContext(LandRegContext);

  useEffect(() => {
    const fetchLandList = async () => {
      try {
        const landList = await getAllLandList();  
        setLands(landList);  
      } catch (error) {
        console.error("Error fetching land list:", error);
        toast.error('Failed to load land list.');
      }
    };

    fetchLandList();  
  }, [getAllLandList]);

  const handleVerify = async (landId) => {
    try {
      
      await verifyLand(landId);
  
      toast.success('Land Verified Successfully!');
  
      setLands((prevLands) =>
        prevLands.map((land) =>
          land.id === landId ? { ...land, verified: true } : land
        )
      );
    } catch (error) {
      console.error("Error verifying land:", error);
      toast.error('Error verifying land. Please try again.');
    }
  };

  return (
    <div className="h-screen flex bg-background text-text text-gray-300">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Verify Land</h2>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <table className="w-full border-collapse bg-primary text-text text-gray-300">
          <thead className="bg-secondary text-gray-300">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Owner Address</th>
              <th className="p-4 text-left">Area</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">PID</th>
              <th className="p-4 text-left">SurveyNo.</th>
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-left">Verify</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(lands) && lands.length > 0 ? (
    lands.map((land) => (
      <tr key={land.id} className="text-gray-300 border-b border-accent text-white">
        <td className="p-4">{land.id}</td>
        <td className="p-4 truncate">{land.ownerAddress}</td>
        <td className="p-4">{land.area}</td>
        <td className="p-4">{land.price}</td>
        <td className="p-4">{land.pid}</td>
        <td className="p-4">{land.surveyNo}</td>
        <td className="p-4 text-accent">
          <a
            href={land.documentLink || "#"}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        </td>
        <td className="text-gray-300 p-4">
          <button
            onClick={() => handleVerify(land.id)}
            className="text-gray-300 px-4 py-2 bg-secondary text-primary rounded hover:bg-accent"
          >
            {land.verified ? "Verified" : "Verify"}
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-gray-300 p-4 text-center">No lands available</td>
    </tr>
  )}
</tbody>
        </table>
      </main>
    </div>
  );
};

export default VerifyLand;
