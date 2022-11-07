import React from "react";
import EditArticle from "../components/EditArticle";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Helmet } from "react-helmet";

const AdminDashboardEditArticle = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Edit Article | SunValley</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <EditArticle />
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardEditArticle;
