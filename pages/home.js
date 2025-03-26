import { useContext } from "react"
import { LandRegContext  } from "@/context/LandReg"
import { Box, Text, useColorModeValue } from '@chakra-ui/react';


export default function Home() {
  const seller="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  
  const contractowner="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
 
  const buyer="0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  
  
  const LandInspector="0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
  


  const { getLandGallery, checkContractOwner, changeContractOwner, addLandInspector, getAllLandInspectors, removeLandInspector, isLandInspector, isUserRegistered, registerUser, verifyUser, 
    isUserVerified, getAllUserList, addLand, getAllLandList, verifyLand, checkLandVerification, getMyLands, makeLandForSell, requestToBuyLand, getMyReceivedLandRequests, 
    getMySentLandRequests, acceptLandRequest, rejectLandRequest, getRequestStatus, getLandPrice, makePayment, getPaymentDoneList, transferLandOwnership, makePaymentTestFun } = useContext(LandRegContext)
  return (
    <div style={{display:'flex' , justifyContent:"space-evenly", flexDirection:'column'}}>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>7
    

    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10 "   onClick={()=>checkContractOwner(contractowner)}>CHECH CONTRACT OWNER </button>
    { <button onClick={()=>changeContractOwner(contractowner)}>CHange CONTRACT OWNER </button> } 
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>addLandInspector(LandInspector,"Vedi", 21, "Land Inspector0", "Kanpur")}>ADD LAND INSPECTOR </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getAllLandInspectors()}>GET ALL LAND INSPECTOR</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>removeLandInspector(LandInspector)}>Remove land inspector</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>isLandInspector(LandInspector)}>IS land inspector</button>  
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>isUserRegistered(buyer)}>IS user registered</button>  
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>registerUser("seller", 20, "raiur", "6902-5678-02212", "5660480937", "buyya@gmail.com")}>Register user </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>verifyUser(buyer)}>Verify user</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>isUserVerified(buyer)}>IS user Verifed</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getAllUserList()}>Get all user list</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>addLand(1500, "1234 Elm Street, Springfield, IL", 15, "40.7128° N, 74.0060° W", 1234789, "SN98764321", "land_document.pdf")}>Add land</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getAllLandList()}>Get all land list</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>verifyLand(1)}>Verify land </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>checkLandVerification(1)}>Check land verification </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getMyLands(seller)}> Get my land </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>makeLandForSell(1)}> Make land for Sell </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>requestToBuyLand(1)}> Request to buy land  </button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getMyReceivedLandRequests()}>Get My Recived land request</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getMySentLandRequests()}>Get My Sent land request</button> 
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>acceptLandRequest(1)}>Accept land Request</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>rejectLandRequest(1)}>Reject land Request</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getRequestStatus(1)}>GEt Request status</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getLandPrice(1)}>get land price</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>makePayment(1)}>Make payment</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getPaymentDoneList()}>get payment done list</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>transferLandOwnership(1, "hkhjshqkljdj")}>transfer Land Ownership</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>makePaymentTestFun(seller)}>make Payment Test Fun</button>
    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"    onClick={()=>getLandGallery()}>Land Gallery</button>

     { <button onClick={()=>changeContractOwner(contractowner)}>CHange CONTRACT OWNER </button> }
 
    
    </div>
  )
}


