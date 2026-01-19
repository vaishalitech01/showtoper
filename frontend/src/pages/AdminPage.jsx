import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_API_URL;




const AdminPage = () => {
  const [formsData, setFormsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormsData();
  }, []);

  const fetchFormsData = async () => {
    try {
      const response = await axios.get(`${baseurl}/forms`);
      setFormsData(response.data);
    } catch (error) {
      console.error('Failed to fetch forms data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            Total: {formsData.length}
          </span>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading leads...</div>
          ) : formsData.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No property inquiries found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.email}</div>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-gray-400">{item.mobile}</div>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;