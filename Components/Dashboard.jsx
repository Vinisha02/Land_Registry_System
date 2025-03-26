
export default function Dashboard() {
  return (
    <div className="flex">
      
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="border p-4 rounded-lg bg-gray-100 shadow">
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Verified
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold">Wallet Address</label>
              <input
                type="text"
                value="0x32F02118B4CF24D8974E25F4646098c41DC"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Name</label>
              <input
                type="text"
                value="User"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Age</label>
              <input
                type="text"
                value="22"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-bold">City</label>
              <input
                type="text"
                value="Pune, Maharashtra, India"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Aadhaar Number</label>
              <input
                type="text"
                value="123412341234"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-bold">PAN</label>
              <input
                type="text"
                value="ABC1234123"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>
          </div>
          <div className="mt-4">
            <a
              href="/viewDocument" // Link to actual document viewer
              className="text-blue-500 hover:underline"
            >
              View Document
            </a>
          </div>
          <div className="mt-2">
            <label className="text-sm font-bold">Email</label>
            <input
              type="text"
              value="user@gmail.com"
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}