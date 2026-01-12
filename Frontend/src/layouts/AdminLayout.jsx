import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
