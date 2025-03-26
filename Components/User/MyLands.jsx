import { useContext, useEffect, useState } from "react";
import { LandRegContext } from "@/context/LandReg";
import { ethers } from "ethers";


import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MyLands = () => {
  const [lands, setLands] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const {
    getMyLands,
    checkLandVerification,
    addToLandGallery,
    makeLandForSell,
    isLandAlreadyListed,
  } = useContext(LandRegContext);


  const [verifiedLands, setVerifiedLands] = useState({});
  const [landForSale, setLandForSale] = useState({});

  const [selectedLand, setSelectedLand] = useState(null);


  const mapContainerStyle = {
    width: "600px",
    height: "450px",
  };


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

 
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask is not installed");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log(`Wallet Address: ${address}`);
      } catch (error) {
        console.error("Failed to fetch wallet address:", error.message);
      }
    };
    fetchWalletAddress();
  }, []);


  useEffect(() => {
    if (!walletAddress) return;

    const fetchLands = async () => {
      try {
        const landList = await getMyLands(walletAddress);
        setLands(landList || []);

        const verificationResults = {};
        const landSaleStatus = {};

        for (const land of landList) {
          try {
            const isVerified = await checkLandVerification(land.id);
            console.log(`Land ID ${land.id} verification status: ${isVerified}`);
            const isListed = await isLandAlreadyListed(land.id);

            verificationResults[land.id] = isVerified;
            landSaleStatus[land.id] = isListed;
          } catch (error) {
            console.error(`Error verifying land ID ${land.id}:`, error);
            verificationResults[land.id] = false;
            landSaleStatus[land.id] = false;
          }
        }

        setVerifiedLands(verificationResults);
        setLandForSale(landSaleStatus);
      } catch (error) {
        console.error("Failed to fetch lands:", error);
      }
    };

    fetchLands();
  }, [walletAddress]);

  const handleMakeForSell = async (land, landId) => {
    try {
     
      await addToLandGallery(land);

      
      await makeLandForSell(landId);

    
      const updatedSaleStatus = await isLandAlreadyListed(landId);

      setLandForSale((prevState) => ({
        ...prevState,
        [land.id]: updatedSaleStatus,
      }));

      alert("Land listed for sale successfully!");
    } catch (error) {
      console.error("Error listing land for sale:", error.message);
      alert("Failed to list land for sale!");
    }
  };

  
  const handleViewDetails = (land) => {
    setSelectedLand(land);
  };

  const closeMapModal = () => {
    setSelectedLand(null);
  };

  const [markerPosition, setMarkerPosition] = useState({ lat: 18.5204, lng: 73.8567 });

  
  useEffect(() => {
    if (selectedLand) {
     
      const lat = selectedLand.latitude || 18.5204;
      const lng = selectedLand.longitude || 73.8567;
      setMarkerPosition({ lat, lng });
    }
  }, [selectedLand]);


  const handleSaveLocation = () => {
    if (!selectedLand) return;
    console.log(
      `Saving location for land ID: ${selectedLand.id}`,
      markerPosition.lat,
      markerPosition.lng
    );
    
    alert(`Location updated to lat=${markerPosition.lat}, lng=${markerPosition.lng}`);
  };

  return (
    <div>
      <h2>My Lands</h2>
      <div className="land-list">
        {lands && lands.length > 0 ? (
          lands.map((land) => (
            <div key={land.id} className="land-item">
              <p>
                <strong>Owner:</strong> {land.ownerAddress}
              </p>
              <p>
                <strong>Area:</strong> {land.area} sq ft
              </p>
              <p>
                <strong>Price:</strong> {land.price} ETH
              </p>
              <p>
                <strong>PID:</strong> {land.pid}
              </p>
              <p>
                <strong>Survey No:</strong> {land.surveyNo}
              </p>
              <div className="buttons">
                <button
                  className="sell-btn"
                  disabled={landForSale[land.id] || !verifiedLands[land.id]}
                  onClick={() => handleMakeForSell(land, land.id)}
                >
                  {landForSale[land.id] ? "Listed for Sale" : "Make it for Sale"}
                </button>

                <button className="details-btn" onClick={() => handleViewDetails(land)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No lands found.</p>
        )}
      </div>

   
      {selectedLand && (
        <div className="map-modal">
          <div className="map-content">
            <h2>Land Details (ID: {selectedLand.id})</h2>
            <p>
              <strong>Owner:</strong> {selectedLand.ownerAddress}
            </p>
            <p>
              <strong>Area:</strong> {selectedLand.area} sq ft
            </p>
            <p>
              <strong>Price:</strong> {selectedLand.price} ETH
            </p>
            <p>
              <strong>PID:</strong> {selectedLand.pid}
            </p>
            <p>
              <strong>Survey No:</strong> {selectedLand.surveyNo}
            </p>

         
            {!isLoaded ? (
              <div>Loading map...</div>
            ) : (
              <div className="map-iframe-container">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={markerPosition}
                  zoom={15}
                  onClick={(e) => {
                    setMarkerPosition({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                  }}
                >
                  <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={(e) => {
                      setMarkerPosition({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      });
                    }}
                  />
                </GoogleMap>
              </div>
            )}

            <button className="save-btn" onClick={handleSaveLocation}>
              Save Location
            </button>
            <button className="close-btn" onClick={closeMapModal}>
              Close Map
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .land-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .land-item {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 10px;
          background: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .buttons button {
          background: #333;
          color: #fff;
          padding: 10px 20px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .buttons button:hover {
          background: #555;
        }
        .buttons button:disabled {
          background: #ddd;
          color: #888;
          cursor: not-allowed;
        }

        /* Modal Styles */
        .map-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .map-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 700px;
          width: 90%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        .map-iframe-container {
          margin: 20px 0;
        }
        .close-btn,
        .save-btn {
          background: #d9534f;
          color: #fff;
          padding: 8px 16px;
          margin: 5px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .close-btn:hover {
          background: #c9302c;
        }
        .save-btn:hover {
          background: #b52a28;
        }
      `}</style>
    </div>
  );
};

export default MyLands;
