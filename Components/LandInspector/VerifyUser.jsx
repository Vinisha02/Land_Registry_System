import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LandRegContext } from "@/context/LandReg";

const VerifyUserr = () => {
  const [users, setUsers] = useState([]); 
  const { getAllUserList, verifyUser } = useContext(LandRegContext);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await getAllUserList();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-300">Verify User</h2>
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
      <table className="w-full border-collapse bg-primary text-text">
        <thead className="bg-secondary text-primary text-gray-300">
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? ( 
            users.map((user, index) => (
              <tr key={user.address} className="border-b border-accent text-gray-300">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.status}</td>
                <td className="p-4">
                 
                  <button
                      onClick={async () => {
                        try {
                          await verifyUser(user.address);
                          setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                              u.address === user.address ? { ...u, status: "Verified" } : u
                            )
                          );
                          toast.success("User verified successfully!");
                        } catch (error) {
                          toast.error("Verification failed!");
                        }
                      }}
                      className="px-4 py-2 bg-secondary text-primary rounded hover:bg-accent"
                    >
                      {user.status === "Verified" ? "Verified" : "Verify"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyUserr;
