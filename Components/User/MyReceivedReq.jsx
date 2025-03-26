import { useState, useEffect, useContext } from 'react';
import { LandRegContext } from '@/context/LandReg';

const LandRequests = () => {
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState({}); 
  const [rejectedRequests, setRejectedRequest] = useState([]);
  const { getMyReceivedLandRequests, acceptLandRequest , rejectLandRequest} = useContext(LandRegContext);

  const handleAcceptRequest = async (requestId) => {
    console.log(requestId);
    try {
      const receipt = await acceptLandRequest(requestId); 
      setAcceptedRequest((prevState) => ({ ...prevState, [requestId]: true })); 
    } catch (error) {
      console.error("Error in accepting request:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    console.log(requestId);
    try {
      const receipt = await rejectLandRequest(requestId); 
      setRejectedRequest((prevState) => ({ ...prevState, [requestId]: true }));
    } catch (error) {
      console.error("Error in rejecting request:", error);
    }
  };

  useEffect(() => {
    const getRequests = async () => {
      try {
        const requests = await getMyReceivedLandRequests();
        console.log("Land requests received by you:", requests);
        setReceivedRequests(requests);
      } catch (error) {
        console.error("Error retrieving received land requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    };

    getRequests();
  }, [acceptedRequest]);

  return (
    <div className="space-y-6">
      {loadingRequests ? (
        <p className="text-gray-300">Loading requests...</p>
      ) : receivedRequests.length === 0 ? (
        <p className="text-gray-300">No requests received.</p>
      ) : (
        receivedRequests.map((request, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <h4 className="font-semibold text-lg text-gray-800">
                Land ID: {request.landId}
              </h4>
              <p className="text-sm text-gray-500">Buyer's Address: {request.buyer}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="font-semibold">{request.status}</span>
              </p>
              <p className="text-sm text-gray-500">Price: ₹{request.price}</p>
            </div>
            <div className="space-x-4">
              {acceptedRequest[request.landId] ? (
                <span className="text-green-500 font-semibold">Accepted</span>
              ) : rejectedRequests.includes(request.landId) ? (
                <span className="text-red-500 font-semibold">Rejected</span>
              ) : (
                <>
                  <button
                    onClick={() => handleAcceptRequest(request.landId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-900"
                  >
                    {acceptedRequest[request.landId] ? 'Accepted' : 'Accept'}
                  </button>

                  <button
                    onClick={() => handleRejectRequest(request.landId)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-900"
                  >
                    {rejectedRequests[request.landId] ? 'Rejected' : 'Reject'}
                  </button>

                  
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LandRequests;
