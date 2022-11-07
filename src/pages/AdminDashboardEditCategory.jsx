import React from "react";
import EditCategory from "../components/EditCategory";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Helmet } from "react-helmet";

const AdminDashboardEditCategory = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Edit Category| SunValley</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <EditCategory />
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardEditCategory;
