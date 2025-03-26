import React, { useContext } from 'react';
import { FaUserShield, FaUser, FaLandmark } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { LandRegContext } from '@/context/LandReg';


export default function Home1() {

  const router = useRouter();
   const { connectWallet } = useContext(LandRegContext);

   const handle = async() => {

    // if( await connectWallet() == false)
    //   {  await router.push('/userRegis');}
        
    //     else
        router.push('/landInspector'); 
      

      
   }

   const handle1 = async() => {
    router.push('/contractowner') ;console.log("e4wwr");
    
 }

 const handle2 = async() => {console.log("e1wwr");
  if( await connectWallet() == false)
{  console.log("ew2wr");  await router.push('/userRegis');  console.log("3ttr");}
  
  else
 { router.push('/user') ; console.log("e4wwr");}
}


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
     =
        <div
          className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
          onClick={() => handle1()}
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-4 rounded-full shadow-md">
              <FaUserShield size={40} />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Contract Owner</h3>
            <p className="text-gray-600 mt-2 text-center">Login</p>
          </div>
        </div>

        
        <div
          className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
          onClick={() => handle2()}
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-500 text-white p-4 rounded-full shadow-md">
              <FaUser size={40} />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">User</h3>
            <p className="text-gray-600 mt-2 text-center">Login</p>
          </div>
        </div>

      
        <div
          className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
          onClick={() => handle()}
        >
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white p-4 rounded-full shadow-md">
              <FaLandmark size={40} />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Land Inspector</h3>
            <p className="text-gray-600 mt-2 text-center">Login</p>
          </div>
        </div>
      </div>
    </div>
  );
}
