import React from "react";
import CreateCategory from "../components/CreateCategory";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";

const AdminDashboardCategory = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <CreateCategory />
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardCategory;
