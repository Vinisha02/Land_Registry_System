

import React,{useState} from "react";

import Link from "next/link"; 

const dashboard = ()=>{
  return(
  <div className="min-h-screen flex bg-background">
    
    <div className="flex-1 bg-background">
   
     
        <h1 className="text-gray-300 font-bold mb-6">Dashboard</h1>
     

      
      <main className="p-6">
        <section id="overview" className="mb-6">
          <h2 className="text-gray-300 text-2xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow rounded  bg-gradient-to-r from-blue-500 to-purple-600" >
              <h3 className="text-lg font-semibold ">Total Lands</h3>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div className="p-4 bg-white shadow rounded bg-gradient-to-r from-gray-500 to-purple-600">
              <h3 className="text-lg font-semibold">Inspections Pending</h3>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div className="p-4 bg-white shadow rounded bg-gradient-to-r from-green-500 to-purple-600">
              <h3 className="text-lg font-semibold">Completed Tasks</h3>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </section>

        <section id="land-records" className="bg-secondary text-primary">
          <h2 className="text-2xl font-semibold mb-4 py-2 text-gray-300 ">Land Records</h2>
          <table className="w-full border-collapse bg-primary text-text">
            <thead>
              <tr className="bg-gray-200 text-left text-primary">
                <th className="py-2 px-4">Land ID</th>
                <th className="py-2 px-4">Owner</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">L001</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">California</td>
                <td className="py-2 px-4 text-green-500">Approved</td>
              </tr>
              <tr>
                <td className="py-2 px-4">L002</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">Nevada</td>
                <td className="py-2 px-4 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>
    </div>
  </div>
);
};


export default dashboard;