import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandRegContext } from '@/context/LandReg';

const ContractOwnerDashboard = () => {
  const { checkContractOwner, changeContractOwner, addLandInspector, getAllLandInspectors, removeLandInspector, isLandInspector} = useContext(LandRegContext);
  const [currentSection, setCurrentSection] = useState("add-inspector"); 
  const [landInspectors, setLandInspectors] = useState([]);
  const [newOwnerAddress, setNewOwnerAddress] = useState(""); 

  const [formData, setFormData] = useState({
    address: "",
    name: "",
    age: "",
    designation: "",
    city: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInspector = () => {
     const { address, name, age, designation, city } = formData;

    addLandInspector(address,name, age, designation, city);


    if (!address || !name || !age || !designation || !city) {
      toast.error("All fields are mandatory!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    // Add land inspector logic; replace with backend integration
    const newInspector = { ...formData, id: Date.now() };
    setLandInspectors([...landInspectors, newInspector]);
    setFormData({ address: "", name: "", age: "", designation: "", city: "" });

    // Success Toast Notification
    toast.success("Land Inspector added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };


  const handleRemoveInspector = (id) => {
    const inspectorToRemove = landInspectors.find((inspector) => inspector.id === id);
  
    if (inspectorToRemove) {
      removeLandInspector(inspectorToRemove.address)
        .then(() => {
          setLandInspectors(landInspectors.filter((inspector) => inspector.id !== id));
  
          toast.success("Land Inspector removed successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        })
        .catch((error) => {
          toast.error("Failed to remove Land Inspector!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        });
    } else {
      toast.error("Inspector not found!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  

  

  return (
    <div className="min-h-screen bg-[#000000] text-white">
     
      <ToastContainer />

      <div className="flex h-screen">
      
        <aside className="bg-[#000000] w-64 h-screen p-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Contract Owner</h1>

          <nav className="space-y-4">
            <button
              onClick={() => setCurrentSection("add-inspector")}
              className={`w-full py-2 px-4 text-left ${
                currentSection === "add-inspector"
                  ? "text-[#BB86FC]"
                  : "text-[#FFFFFF]"
              } hover:text-[#BB86FC] rounded-md border-none bg-transparent`}
            >
              Add Land Inspector
            </button>
            <button
              onClick={() => setCurrentSection("view-inspectors")}
              className={`w-full py-2 px-4 text-left ${
                currentSection === "view-inspectors"
                  ? "text-[#BB86FC]"
                  : "text-[#FFFFFF]"
              } hover:text-[#BB86FC] rounded-md border-none bg-transparent`}
            >
              View Land Inspectors
            </button>
            <button
              onClick={() => setCurrentSection("change-owner")}
              className={`w-full py-2 px-4 text-left ${
                currentSection === "change-owner"
                  ? "text-[#BB86FC]"
                  : "text-[#FFFFFF]"
              } hover:text-[#BB86FC] rounded-md border-none bg-transparent`}
            >
              Change Contract Owner
            </button>
            <button
              className="w-full py-2 px-4 bg-transparent text-[#CF6679] hover:text-red-300 rounded-md border-none"
              onClick={() => alert("Logout functionality coming soon!")}
            >
              Logout
            </button>
          </nav>
        </aside>

        <div className="w-0.5 bg-white h-full"></div>

        
        <main className="flex-1 p-6 space-y-12 bg-[#000000] flex justify-center items-start">
         
          {currentSection === "add-inspector" && (
            <section className="bg-[#1F1F1F] p-6 rounded shadow-lg text-white max-w-md w-full">
              <h2 className="text-2xl font-extrabold mb-4 text-[#BB86FC]">
                Add Land Inspector
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter Age"
                    className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-semibold">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter Designation"
                    className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleAddInspector}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-purple-500 rounded text-black font-semibold"
                >
                  Add
                </button>
              </form>
            </section>
          )}

          {currentSection === "view-inspectors" && (
            <section className="bg-[#1F1F1F] p-6 rounded shadow-lg text-white w-full">
              <h2 className="text-2xl font-extrabold mb-4 text-[#BB86FC]">
                Land Inspectors
              </h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600 text-white">
                    <th className="p-2">Address</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Age</th>
                    <th className="p-2">Designation</th>
                    <th className="p-2">City</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {landInspectors.map((inspector) => (
                    <tr
                      key={inspector.id}
                      className="border-b border-gray-600 hover:text-[#BB86FC]"
                    >
                      <td className="p-2">{inspector.address}</td>
                      <td className="p-2">{inspector.name}</td>
                      <td className="p-2">{inspector.age}</td>
                      <td className="p-2">{inspector.designation}</td>
                      <td className="p-2">{inspector.city}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleRemoveInspector(inspector.id)}
                          className="py-2 px-4 bg-green-500 hover:bg-purple-500 rounded text-black font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

{currentSection === "change-owner" && (
  <section className="bg-[#1F1F1F] p-6 rounded shadow-lg text-white max-w-md w-full">
    <h2 className="text-2xl font-extrabold mb-4 text-[#BB86FC]">
      Change Contract Owner
    </h2>
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-white font-semibold">
          New Contract Owner Address
        </label>
        <input
          type="text"
          name="newOwnerAddress"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
          placeholder="Enter New Contract Owner Address"
          className="w-full p-3 rounded bg-[#2E2E2E] text-white focus:outline-none"
        />
      </div>
      <button
        onClick={async () => {
          if (!newOwnerAddress) {
            toast.error("Please enter a valid address!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            return;
          }
          try {
            await changeContractOwner(newOwnerAddress);
            toast.success("Contract owner changed successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            setNewOwnerAddress(""); 
          } catch (error) {
            toast.error("Failed to change contract owner!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            console.error(error);
          }
        }}
        className="w-full py-3 px-4 bg-green-500 hover:bg-purple-500 rounded text-black font-semibold"
      >
        Change
      </button>
    </form>
  </section>
)}

        </main>
      </div>
    </div>
  );
};

export default ContractOwnerDashboard;