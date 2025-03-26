


import { useContext, useEffect, useState } from 'react';
import { LandRegContext } from '@/context/LandReg';
import { ethers } from 'ethers';

const LandGallery = () => {
  const [lands, setLands] = useState([]);
  const { getLandGallery, requestToBuyLand } = useContext(LandRegContext);
  const [requestSent, setRequestSent] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const landList = await getLandGallery();
        setLands(landList || []);
      } catch (error) {
        console.error("Failed to fetch lands:", error);
      }
    };

    fetchLands();
  }, []);

  const handleBuyRequest = async (landId) => {
    try {
      await requestToBuyLand(landId);
      alert("Request to buy land sent successfully!");
      setRequestSent((prevState) => [...prevState, landId]);
    } catch (error) {
      console.error('Error sending request to buy:', error.message);
      alert('Failed to send request to buy.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-6">Land Gallery</h1>
      <div className="land-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lands && lands.length > 0 ? (
          lands.map((land) => (
            <div key={land.id} className="land-item border p-6 rounded-lg shadow-lg bg-gray-900">
              <p><strong>Owner:</strong> <span className="block truncate">{land.ownerAddress}</span></p>
              <p><strong>Area:</strong> {land.area} sq ft</p>
              <p><strong>Price:</strong> {ethers.utils.formatEther(land.price)} ETH</p>
              <p><strong>PID:</strong> {land.pid}</p>
              <p><strong>Survey No:</strong> {land.surveyNo}</p>
              <div className="buttons mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={() => handleBuyRequest(land.id)}
                  disabled={requestSent.includes(land.id)}
                >
                  {requestSent.includes(land.id) ? 'Request Sent' : 'Buy Land'}
                </button>
                <a href={land.documentLink} target="_blank" rel="noopener noreferrer">
                  <button className="ml-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition">
                    View Document
                  </button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-6">No lands found.</p>
        )}
      </div>

      <style jsx>{`
        .land-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .land-item {
          width: 100%;
          max-width: 400px;
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 10px;
          background: #1a202c;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .land-item:hover {
          transform: translateY(-5px);
        }
        .buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .buttons button:disabled {
          background: #ddd;
          color: #888;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default LandGallery;
