import React from "react";
import CreateArticle from "../components/CreateArticle";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";

const AdminDashboardArticle = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <CreateArticle />
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardArticle;
