import React, { useState, useContext } from "react";
import { LandRegContext } from '@/context/LandReg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddLands() {

  const {  addLand } = useContext(LandRegContext); 
  const [area, setArea] = useState("");
  const [address, setAddress] = useState(""); 

  const [price, setPrice] = useState("");
  const [pid, setPid] = useState("");
  const [surveyNumber, setSurveyNumber] = useState("");
  const [document, setDocument] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();
   
    if (!area || !address || !price || !pid || !surveyNumber || !document) {
      console.log(area , address , price , pid , surveyNumber ,document)
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    try {
      
      addLand(area, address, price, "40.7128° N, 74.0060° W", pid, surveyNumber, document);

      toast.success("Land has been successfully added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding land:", error);
  
     
      toast.error("There was an error adding the land. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-[#FFFFFF]">
        <ToastContainer />
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#BB86FC]">Add Land Details</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium">Area (SqFt)</label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (SqFt)"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          

          <div>
            <label htmlFor="price" className="block text-sm font-medium">Land Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Land Price"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="pid" className="block text-sm font-medium">PID</label>
            <input
              type="number"
              id="pid"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              placeholder="PID"
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="survey" className="block text-sm font-medium">Survey No.</label>
            <input
              type="text"
              id="survey"
              value={surveyNumber}
              onChange={(e) => setSurveyNumber(e.target.value)}
              placeholder="Survey No."
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium">Upload Document</label>
            <input
              type="file"
              id="document"
              accept=".jpg,.pdf"
              onChange={(e) => setDocument(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] text-[#FFFFFF] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#03DAC5]"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#03DAC5] text-[#121212] font-bold rounded-lg hover:bg-[#BB86FC] transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
