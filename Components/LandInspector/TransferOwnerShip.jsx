import { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { LandRegContext } from "@/context/LandReg";
import Transfer from "./Transfer"; 

const LandRegistryDashboard = () => {
  const { getPaymentDoneList, getLandGallery, fetchContract } = useContext(LandRegContext);


  const [paymentRequests, setPaymentRequests] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const paymentDoneList = await getPaymentDoneList();
        const requestIds = paymentDoneList.map((id) => id.toString());
        console.log("Payment Request IDs:", requestIds);

      
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const landContract = fetchContract(signer);

        const requests = await Promise.all(
          requestIds.map(async (reqId) => {
          
            const requestDetails = await landContract.LandRequestMapping(reqId);
            
            if (!requestDetails || !requestDetails.landId) return null;
            
            const land = await landContract.lands(requestDetails.landId);
            return {
              requestId: reqId,
              landId: requestDetails.landId.toString(),
             
              sellerAddress: land.ownerAddress,
         
              buyerAddress: requestDetails.buyerId,
         
            };
          })
        );

        const validRequests = requests.filter((r) => r !== null);
        setPaymentRequests(validRequests);
      } catch (error) {
        console.error("Error fetching payment request data:", error);
      }
    };

    fetchData();
  }, [getPaymentDoneList, fetchContract]);

  
  const handleTransferClick = (record) => {
    setSelectedRecord(record);
  };


  if (selectedRecord) {
    return (
      <Transfer
        record={selectedRecord}
        onBack={() => setSelectedRecord(null)}
      />
    );
  }


  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-text">
        Land Inspector Dashboard
      </h2>
      {paymentRequests.length === 0 ? (
        <p className="text-text">No payment completed requests found.</p>
      ) : (
        <table className="w-full border-collapse bg-primary text-text">
          <thead className="bg-secondary text-primary">
            <tr>
              <th className="p-4 text-left">Request ID</th>
              <th className="p-4 text-left">Land Id</th>
              <th className="p-4 text-left">Seller Address</th>
              <th className="p-4 text-left">Buyer Address</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentRequests.map((req) => (
              <tr key={req.requestId}>
                <td className="p-4">{req.requestId}</td>
                <td className="p-4">{req.landId}</td>
                <td className="p-4">{req.sellerAddress}</td>
                <td className="p-4">{req.buyerAddress}</td>
                <td className="p-4">Payment Done</td>
                <td className="p-4">
                  <button
                    onClick={() => handleTransferClick(req)}
                    className="px-4 py-2 bg-secondary text-primary rounded hover:bg-accent"
                  >
                    Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LandRegistryDashboard;
