import React, { useEffect, useState,createContext } from "react";
const { ethers } = require("ethers");
import Web3Modal from 'web3modal';

import landReg from "./Land.json";
import { id } from "ethers/lib/utils";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const ContractABI = landReg.abi;
console.log("Contract ABI:", ContractABI);



export const LandRegContext = createContext();



const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, ContractABI, signerOrProvider);


export const LandRegProvider = ({ children }) => {
  
  const [landGallery, setLandGallery] = useState([]);
  const [currentUser , setCurrentUser] = useState("");
  

  const addToLandGallery = (land) => {
    console.log('Adding land to gallery:', land);
    setLandGallery((prevGallery) => {
    
      const isDuplicate = prevGallery.some(existingLand => existingLand.id === land.id);
      if (isDuplicate) {
        console.log('Land already exists in the gallery');
        return prevGallery; 
      }
      
      
      const updatedGallery = [...prevGallery, land];
      console.log('Updated Land Gallery:', updatedGallery);
      return updatedGallery;
    });
  };
      
      async function checkContractOwner(userAddress) {
          try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
              

              const isOwner = await contract.isContractOwner(userAddress);
              console.log(`Is the user the contract owner? ${isOwner}`);
              return isOwner;
          } catch (error) {
              console.error("Error checking contract owner:", error);
              throw error;
          }
      }



 

      async function changeContractOwner(newOwnerAddress) {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract =fetchContract(signer);
          
          
    
            const transaction = await contract.changeContractOwner(newOwnerAddress);
    
            const receipt = await transaction.wait();
    
            console.log(`Contract owner changed successfully. Transaction hash: ${receipt.transactionHash}`);
            return receipt;
        } catch (error) {
            console.error("Error changing contract owner:", error);
            throw error;
        }
    }
    
    

    async function addLandInspector(inspectorAddress, name, age, designation, city) {
      
      try {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract =fetchContract(signer);
             

        const transaction = await contract.addLandInspector(inspectorAddress, name, age, designation, city, {
                gasLimit: ethers.utils.parseUnits("6000000", "wei"),
              });
              const receipt = await transaction.wait();
              
              console.log(`Land inspector added successfully. Transaction hash: ${receipt.transactionHash}`);
              return receipt;
      } catch (error) {
          console.error("Error adding land inspector:", error);
          throw error;
      }    
  }

  
  async function getAllLandInspectors() {
    try {
      
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider();
      const contract =fetchContract(provider);
        
     
        const inspectorList = await contract.ReturnAllLandIncpectorList();

        console.log("List of all land inspectors:", inspectorList);
        return inspectorList;
    } catch (error) {
        console.error("Error fetching land inspector list:", error);
        throw error;
    }
}

async function removeLandInspector(inspectorAddress) {
  try {
    
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract =fetchContract(signer);

      const transaction = await contract.removeLandInspector(inspectorAddress, {
        gasLimit: ethers.utils.parseUnits("200000", "wei"),
      });

      const receipt = await transaction.wait();
      console.log(`Land inspector removed successfully. Transaction hash: ${receipt.transactionHash}`);
      return receipt;
  } catch (error) {
      console.error("Error removing land inspector:", error);
      throw error;
  }
}


async function isLandInspector(inspectorAddress) {
  try {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract =fetchContract(signer);

     const isInspector = await contract.isLandInspector(inspectorAddress);

      console.log(`Is the address a land inspector? ${isInspector}`);
      return isInspector;
  } catch (error) {
      console.error("Error checking if address is a land inspector:", error);
      throw error;
  }
}

async function isUserRegistered(userAddress) {
  try {
      
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract =fetchContract(signer);
      const isRegistered = await contract.isUserRegistered(userAddress);

      console.log(`Is the user registered? ${isRegistered}`);
      return isRegistered;
  } catch (error) {
      console.error("Error checking if user is registered:", error);
      throw error;
  }
}



async function registerUser(name, age, city, aadharNumber, panNumber, email) {
  try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

     
      const currentAddress = await signer.getAddress();
      const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 

     
      const transaction = await contract.registerUser(name, age, city, aadharNumber, panNumber, email, {
          gasLimit: 6000000,
          nonce: nonce, 
      });

      const receipt = await transaction.wait(); 
      console.log(`User added successfully. Transaction hash: ${receipt.transactionHash}`);
      return true;
  } catch (error) {
      console.error("Error adding user:", error);
      throw error;
  }
}

async function verifyUser(userAddress) {
  try {console.log(userAddress)

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract =fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 

      const transaction = await contract.verifyUser(userAddress, {
        gasLimit: ethers.utils.parseUnits("800000", "wei"),  
        nonce: nonce, 
      });

      const receipt = await transaction.wait();

      console.log(`User verified successfully. Transaction hash: ${receipt.transactionHash}`);
      return receipt;
  } catch (error) {
      console.error("Error verifying user:", error);
      throw error;
  }
}

async function isUserVerified(userAddress) {
  try {
    
    const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract =fetchContract(signer);

      const isVerified = await contract.isUserVerified(userAddress, {
        gasLimit: ethers.utils.parseUnits("600000", "wei"),
      });

      console.log(`Is the user verified? ${isVerified}`);
      return isVerified;
  } catch (error) {
      console.error("Error checking if user is verified:", error);
      throw error;
  }
}

async function getAllUserList() {
  try {
    
    const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider();
      const contract =fetchContract(provider);
        
     
       
    const userList = await contract.ReturnAllUserList();
    
    const detailedUserList = [];
    for (let i = 0; i < userList.length; i++) {
      const userAddress = userList[i];
      const userDetails = await contract.UserMapping(userAddress);
      detailedUserList.push({
        address: userAddress,
        name: userDetails.name,
        email: userDetails.email,
        status: userDetails.isUserVerified ? "Verified" : "Pending",
      });
    }
    
    console.log("All registered users:", detailedUserList);
    return detailedUserList;
  } catch (error) {
    console.error("Error retrieving user list:", error);
    throw error;
  }
}


async function addLand(area, address, landPrice, allLatiLongi, propertyPID, surveyNum, document) {
  try {
    
    const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract =fetchContract(signer);

      const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 

       

    const transaction = await contract.addLand(
      area,
      address,
      ethers.utils.parseUnits(landPrice.toString(), "wei"),
      allLatiLongi,
      propertyPID,
      surveyNum,
      document,
      {gasLimit: ethers.utils.parseUnits("800000", "wei"),  
        nonce: nonce, 
     }
    );

    const receipt = await transaction.wait();
    console.log(`Land added successfully. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error adding land:", error);
    throw error;
  }
}

async function getAllLandList() {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.JsonRpcProvider();
    const landContract = fetchContract(provider);

    const landIDs = await landContract.ReturnAllLandList();

    console.log("Fetched land IDs:", landIDs);

    const formattedLandIDs = landIDs.map(land => land.toString());
    console.log("Formatted land IDs:", formattedLandIDs);

  
    const formattedLandList = await Promise.all(
      formattedLandIDs.map(async (landID) => {
    
        try {
          const landDetails = await landContract.lands(landID);  
          
          console.log(landID, "dfgv",landDetails.ownerAddress,  landDetails.area.toString(),  landDetails.landPrice.toString(),  landDetails.propertyPID.toString(),  
           );
          return {
            id: landID,  
            ownerAddress: landDetails.ownerAddress,
            area: landDetails.area.toString(),  
            price: landDetails.landPrice.toString(),  
            pid: landDetails.propertyPID.toString(), 
            surveyNo: landDetails.surveyNum,  
            documentLink: landDetails.document || "#", 
            verified: landDetails.isLandVerified,  
          };
        } catch (err) {
          console.error(`Error fetching land details for ID ${landID}:`, err);
          return null; 
        }
      })
    );

    return formattedLandList.filter((land) => land !== null);
  } catch (error) {
    console.error("Error retrieving land list:", error);
    throw error;
  }
}

async function verifyLand(landId) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const currentAddress = await signer.getAddress();
    const contract = fetchContract(signer);

   

    const landDetails = await contract.lands(landId);
    if (!landDetails) {
      throw new Error("Land ID does not exist.");
    }

    const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 

    const transaction = await contract.verifyLand(landId, {gasLimit: ethers.utils.parseUnits("800000", "wei"),  
      nonce: nonce,  });
    const receipt = await transaction.wait();

    console.log(`Land verified successfully. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error verifying land:", error.message || error);
    throw error;
  }
}

async function checkLandVerification(landId) {
  try {


    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const currentAddress = await signer.getAddress();
    const contract = fetchContract(signer);

      const landContract = new ethers.Contract(contractAddress, ContractABI, signer);

      const isVerified = await landContract.isLandVerified(landId);

      console.log(`Land verification status for ID ${landId}: ${isVerified}`);
      return isVerified;
  } catch (error) {
      console.error("Error checking land verification:", error);
      throw error;
  }
}


async function isLandAlreadyListed(landId) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

   
    const landContract = new ethers.Contract(contractAddress, ContractABI, signer);

   
    const landDetails = await landContract.lands(landId);

   
    const isForSale = landDetails.isForSale;

    console.log(`Land verification status for ID ${landId}: ${isForSale}`);

    return isForSale;
  } catch (error) {
    console.error("Error checking land verification:", error);
    throw error;
  }
}

async function getLandGallery() {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.JsonRpcProvider();
    const landContract = fetchContract(provider);

    const landIDs = await landContract.ReturnAllLandList();

    console.log("Fetched land IDs:", landIDs);

    const formattedLandIDs = landIDs.map(land => land.toString());
    console.log("Formatted land IDs:", formattedLandIDs);

    const formattedLandList = await Promise.all(
      formattedLandIDs.map(async (landID) => {
        try {
          const landDetails = await landContract.lands(landID);

          console.log(landID, "Details:", landDetails);

          
          let isForSale = landDetails[8];  
          console.log("isForSale value from index 8:", isForSale);

          if (isForSale === undefined || isForSale === null) {
           
            isForSale = landDetails.isForSale;
            console.log("isForSale value from isForSale property:", isForSale);
          }

         
          if (Boolean(isForSale)) {
            return {
              id: landID,
              ownerAddress: landDetails[9] || landDetails.ownerAddress,
              area: landDetails[1].toString(),
              price: landDetails[3].toString(),
              pid: landDetails[5].toString(),
              surveyNo: landDetails[2],
              documentLink: landDetails[6] || "#",
              verified: landDetails[10] || landDetails.isLandVerified,
            };
          } else {
            console.log(`Skipping land ${landID} as it is not for sale`);
            return null;
          }
        } catch (err) {
          console.error(`Error fetching land details for ID ${landID}:`, err);
          return null;
        }
      })
    );

    
    return formattedLandList.filter((land) => land !== null);

  } catch (error) {
    console.error("Error retrieving land list:", error);
    throw error;
  }
}



async function getMyLands(userAddress) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    
    const landContract = fetchContract(signer);

    const landIDs = await landContract.myAllLands(userAddress);

    console.log("Fetched land IDs:", landIDs);

  
    const formattedLandIDs = landIDs.map(land => land.toString());
    console.log("Formatted land IDs:", formattedLandIDs);

   
    const formattedLandList = await Promise.all(
      formattedLandIDs.map(async (landID) => {
       
        try {
          const landDetails = await landContract.lands(landID);  
          
          console.log(landID, "dfgv",landDetails.ownerAddress,  landDetails.area.toString(),  landDetails.landPrice.toString(),  landDetails.propertyPID.toString(),  
           );
          return {
            id: landID,  
            ownerAddress: landDetails.ownerAddress,
            area: landDetails.area.toString(),  
            price: landDetails.landPrice.toString(), 
            pid: landDetails.propertyPID.toString(),  
            surveyNo: landDetails.surveyNum,  
            documentLink: landDetails.document || "#",  
            verified: landDetails.isLandVerified,  
          };
        } catch (err) {
          console.error(`Error fetching land details for ID ${landID}:`, err);
          return null;
        }
      }))

      return formattedLandList.filter(land => land !== null);  

    }catch (error) {
     console.error("Error retrieving user's lands:", error);
     throw error;}
}


async function makeLandForSell(landId) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 
   
    const transaction = await landContract.makeItforSell(landId, { gasLimit: ethers.utils.parseUnits("800000", "wei"),  
      nonce: nonce,  });
    const receipt = await transaction.wait();

    console.log(`Land ID ${landId} is now for sale. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error making land for sale:", error);
    throw error;
  }
}

async function requestToBuyLand(landId) {
  try {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest'); 
     
    const transaction = await landContract.requestforBuy(landId,  { gasLimit: ethers.utils.parseUnits("800000", "wei"),  
      nonce: nonce,  });
    const receipt = await transaction.wait();

    console.log(`Request to buy land ID ${landId} submitted successfully. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error requesting to buy land:", error);
    throw error;
  }
}

async function fetchRequestStatus(requestId) {
  try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractABI, signer);

       const isPaymentDone = await contract.requesteStatus(requestId);
      console.log("Payment status:", isPaymentDone);

      return isPaymentDone;
  } catch (error) {
      console.error("Error fetching request status:", error);
  }
}

async function getMyReceivedLandRequests() {
  try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const landContract = fetchContract(signer);
      const currentAddress = await signer.getAddress();
      const nonce = await provider.getTransactionCount(currentAddress, 'latest');

      const receivedRequestIds = await landContract.myReceivedLandRequests({
          gasLimit: ethers.utils.parseUnits("10000000", "wei"),
          nonce: nonce,
      });

      console.log("Received request IDs:", receivedRequestIds);

      if (!receivedRequestIds || receivedRequestIds.length === 0) {
          console.warn("No received requests found.");
          return [];
      }

      const receivedRequests = await Promise.all(
          receivedRequestIds.map(async (id) => {
              try {
                  const requestDetails = await landContract.LandRequestMapping(id);

                  if (!requestDetails || !requestDetails.landId) {
                      console.error(`Invalid request details for ID: ${id}`, requestDetails);
                      return null;  
                  }

                  const landId = requestDetails.landId?.toString() || "N/A";
                  const buyer = requestDetails.buyerId || "Unknown";
                  
                  const landDetails = await landContract.lands(id);  
                  const price= landDetails.landPrice.toString();  
                  const status = 
                  requestDetails.requestStatus.toString() == "0" ? "Pending" :
                  requestDetails.requestStatus.toString() == "1" ? "Accepted" :
                  requestDetails.requestStatus.toString() == "2" ? "Rejected" :
                  requestDetails.requestStatus.toString() == "3" ? "Payment Done" :
                  requestDetails.requestStatus.toString() == "4" ? "Completed" :
                  "Unknown";
                     console.log("sdfghj" , status  )
                   
                  return {
                      landId,
                      buyer,
                      status,
                      price,
                  };
              } catch (err) {
                  console.error(`Error fetching details for request ID: ${id}`, err);
                  return null;
              }
          })
      );

      return receivedRequests.filter(Boolean);
  } catch (error) {
      console.error("Error retrieving received land requests:", error);
      throw error;
  }
}



async function getMySentLandRequests() {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest');

    const receivedRequestIds = await landContract.mySentLandRequests({
        gasLimit: ethers.utils.parseUnits("800000", "wei"),
        nonce: nonce,
    });

    console.log("Received request IDs:", receivedRequestIds);

    if (!receivedRequestIds || receivedRequestIds.length === 0) {
        console.warn("No received requests found.");
        return [];
    }
    const receivedRequests = await Promise.all(
        receivedRequestIds.map(async (id) => {
            try {
                const requestDetails = await landContract.LandRequestMapping(id);

                if (!requestDetails || !requestDetails.landId) {
                    console.error(`Invalid request details for ID: ${id}`, requestDetails);
                    return null; 
                }

                const landId = requestDetails.landId?.toString() || "N/A";
                const seller = requestDetails.sellerId || "Unknown";

                const landDetails = await landContract.lands(id); 
                const price= landDetails.landPrice.toString();  
                const status = 
                        requestDetails.requestStatus.toString() == "0" ? "Pending" :
                        requestDetails.requestStatus.toString() == "1" ? "Accepted" :
                        requestDetails.requestStatus.toString() == "2" ? "Rejected" :
                        requestDetails.requestStatus.toString() == "3" ? "Payment Done" :
                        requestDetails.requestStatus.toString() == "4" ? "Completed" :
                        "Unknown";
                  console.log("sdfghj" , status  )
                 
                return {  
                    landId,
                    seller,
                    status,
                    price,
                };
            } catch (err) {
                console.error(`Error fetching details for request ID: ${id}`, err);
                return null;
            }
        })
    );

    return receivedRequests.filter(Boolean);
} catch (error) {
    console.error("Error retrieving received land requests:", error);
    throw error;
}
}

async function acceptLandRequest(requestId) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest');

    const transaction = await landContract.acceptRequest(requestId, {
      gasLimit: ethers.utils.parseUnits("800000", "wei"),
      nonce: nonce,
    });

    const receipt = await transaction.wait();
    console.log(`Land request ID ${requestId} accepted. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error accepting land request:", error);
    throw error;
  }
}



async function rejectLandRequest(requestId) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest');

    
    const transaction = await landContract.rejectRequest(requestId, {
      gasLimit: ethers.utils.parseUnits("1000000", "wei"),
      nonce: nonce,
    });

    const receipt = await transaction.wait();
    console.log(`Land request ID ${requestId} rejected. Transaction hash: ${receipt.transactionHash}`);
    return receipt;
  } catch (error) {
    console.error("Error rejecting land request:", error);
    throw error;
  }
}


async function getRequestStatus(requestId) {
  try {
    
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const landContract = fetchContract(signer);    

      const isPaymentDone = await landContract.requesteStatus(requestId);

      console.log(`Request ID ${requestId} payment status: ${isPaymentDone}`);
      return isPaymentDone;
  } catch (error) {
      console.error("Error fetching request status:", error);
      throw error;
  }
}

async function getLandPrice(landId) {
  try {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = fetchContract(signer);
    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, 'latest');

      const price = await landContract.landPriceFun(landId, {
        gasLimit: ethers.utils.parseUnits("1000000", "wei"),
        nonce: nonce,
      });

    console.log("Fetched price from contract:", price.toString()); 

    return price.toString(); 


  } catch (error) {
      console.error("Error fetching land price:", error);
      throw error;
  }
}

async function convertINRtoETH(amountInINR) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
    const data = await response.json();
    const exchangeRate = data.ethereum.inr;
    console.log("ETH to INR exchange rate:", exchangeRate);
    
    return (amountInINR / exchangeRate).toFixed(6);  
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw new Error("Failed to convert INR to ETH");
  }
}

async function makePayment(landId, requestId) {
  try {
    console.log(`Initiating payment for landId: ${landId}, requestId: ${requestId}`);

    
    const priceInINR = await getLandPrice(landId);
    if (!priceInINR || isNaN(priceInINR)) throw new Error("Invalid land price received");
    console.log("Fetched price from contract:", priceInINR);

    
    const priceInETH = await convertINRtoETH(priceInINR);
    if (!priceInETH || isNaN(priceInETH)) throw new Error("ETH conversion failed");
    console.log("Converted Price in ETH:", priceInETH);

    
    const formattedAmountInEth = ethers.utils.parseEther(priceInETH.toString());
    console.log("Formatted ETH Amount:", formattedAmountInEth.toString());

  
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const balance = await provider.getBalance(await signer.getAddress());
    console.log("Wallet Balance:", ethers.utils.formatEther(balance));

    const contract = fetchContract(signer);
    console.log("Contract fetched successfully");

    
    const balanceInWei = await signer.getBalance();
    const balanceInEther = ethers.utils.formatEther(balanceInWei);
    console.log("Balance in Ether:", balanceInEther);

    const estimatedGas = await contract.estimateGas.makePayment(landId, {
      value: formattedAmountInEth,
    });
    console.log("Estimated Gas:", estimatedGas.toString());

    
    console.log("Sending transaction...");
    const tx = await contract.makePayment(landId, {
      value: formattedAmountInEth,
      gasLimit: estimatedGas.add(ethers.BigNumber.from("100000")), 
    });

    await tx.wait();
    console.log("Payment successful:", tx.hash);
  } catch (error) {
 
    console.error("Error making payment:", error.message || error);
  }
}




async function getPaymentDoneList() {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const landContract = fetchContract(signer);
    const paymentDoneList = await landContract.returnPaymentDoneList();
    console.log("Payment Done List:", paymentDoneList);
    return paymentDoneList;
  } catch (error) {
    console.error("Error fetching payment done list:", error);
    throw error;
  }
}


async function makePaymentTestFun(receiverAddress, amountInEther) {
  try {
   
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    
    const landContract = new ethers.Contract(contractAddress, ContractABI, signer);

    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, "latest");

    const amountInWei = ethers.utils.parseEther(amountInEther);

    const transaction = await landContract.makePaymentTestFun(receiverAddress, {
      value: amountInWei,
      nonce: nonce, 
    });

    const receipt = await transaction.wait();
    console.log(
      `Payment of ${amountInEther} ETH sent to ${receiverAddress}. 
       Tx Hash: ${receipt.transactionHash}`
    );
    return receipt;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
}


async function transferLandOwnership(requestId, documentUrl) {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const landContract = new ethers.Contract(contractAddress, ContractABI, signer);

    const currentAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(currentAddress, "latest");

    console.log("Request ID:", requestId);
    console.log("Document URL:", documentUrl);

    const transaction = await landContract.transferOwnership(requestId, documentUrl, {
      gasLimit: ethers.utils.parseUnits("1000000", "wei"),
      nonce: nonce, 
    });

    const receipt = await transaction.wait();
    console.log(
      `Ownership transferred for request ID ${requestId}. 
       Transaction hash: ${receipt.transactionHash}`
    );
    return receipt;
  } catch (error) {
    console.error("Error transferring land ownership:", error);
    if (error?.message) console.error("Error message:", error.message);
    if (error?.data) console.log("Error data:", error.data);
    if (error.code === -32603) {
      console.log("JSON-RPC Internal error. Check contract or gas settings.");
    }
    throw error;
  }
}

 
const checkIfWalletConnected = async() => {
  try{

      if(!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
          method:"eth_accounts",
      });

    
     if(accounts.length){
      setCurrentUser(accounts[0]);
     }else{
      return "Not connected"
     }

  }
  catch(error){
      return "Not connected"
  }
};

async function getUserData(userAddress) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const landContract = fetchContract(signer);

   
  const userStruct = await landContract.UserMapping(userAddress);

  return {
    id: userStruct[0],
    name: userStruct[1],
    age: userStruct[2].toString(),
    city: userStruct[3],
    aadharNumber: userStruct[4],
    panNumber: userStruct[5],
    email: userStruct[6],
    isUserVerified: userStruct[7],
  };
}

const connectWallet = async () => {
  
  try{

      if (!window.ethereum) {
          alert("Please install Metamask to use this feature.");
          return;
        }
        
        
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts", 
        });
        console.log(accounts[0]);  
        
        const isRegistered = await isUserRegistered(accounts[0]);
        console.log("gh", isRegistered);
    
        if (!isRegistered) {
          alert("Register first!");
          return false;
        }

        setCurrentUser(accounts[0]);
        return true;
  }
  catch(error){
      console.log("Something went wrong" , error);
  }
};

  const disconnectWallet = () => {
    setCurrentUser(null);

    try{
     if (window.ethereum && window.ethereum.disconnect) {
      window.ethereum.disconnect(); 
    }
}catch(error){
    console.log("Something went wrong" , error);
}
   
 
  };




useEffect(()=>{
  checkIfWalletConnected();
},[]);


return (
    <LandRegContext.Provider
      value={{
        addToLandGallery,
        connectWallet,disconnectWallet,
        checkContractOwner ,
        changeContractOwner,
        addLandInspector,
        getAllLandInspectors,
        removeLandInspector,
        isLandInspector,
        isUserRegistered,
        registerUser,
        verifyUser,
        isUserVerified,
        getAllUserList,
        addLand,
        getAllLandList,
        verifyLand,
        checkLandVerification,
        getMyLands,
        makeLandForSell,
        requestToBuyLand,
        getMyReceivedLandRequests,
        getMySentLandRequests,
        acceptLandRequest,
        rejectLandRequest,
        getRequestStatus,
        getLandPrice,
        makePayment,
        getPaymentDoneList,
        transferLandOwnership,
        makePaymentTestFun,
        fetchContract,landGallery,
        getLandGallery,
        isLandAlreadyListed,
        getUserData
      }}
    >
      {children}
    </LandRegContext.Provider>
  );
};







