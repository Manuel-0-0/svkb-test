import React, { Suspense } from "react";
import { NotFound, Home, Login, Articles, Article } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboardArticles from "./pages/AdminDashboardArticles";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import AdminDashboardArticle from "./pages/AdminDashboardArticle";
import AdminDashboardCreateArticle from "./pages/AdminDashboardCreateArticle";
import AdminDashboardEditArticle from "./pages/AdminDashboardEditArticle";
import AdminDashboardEditCategory from "./pages/AdminDashboardEditCategory";
import AdminDashboardCreateCategory from "./pages/AdminDashboardCreateCategory";
import AdminDashboardCategory from "./pages/AdminDashboardCategory";
import AdminDashboardCategories from "./pages/AdminDashboardCategories";
import AdminDashboardAddUser from "./pages/AdminDashboardAddUser"
import Loading from "./components/Loading";


function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" exact={true} element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />


          <Route path="/admin/home" element={<AdminDashboardHome />} />

          <Route path="/admin/user/create" element={<AdminDashboardAddUser />} />

          <Route path="/admin/article" element={<AdminDashboardArticles />} />
          <Route path="/admin/article/create" element={<AdminDashboardCreateArticle />} />
          <Route path="/admin/article/:articleId" element={<AdminDashboardArticle />} />
          <Route path="/admin/article/edit/:articleId" element={<AdminDashboardEditArticle />} />

          <Route path="/admin/category" element={<AdminDashboardCategories />} />
          <Route path="/admin/category/create" element={<AdminDashboardCreateCategory />} />
          <Route path="/admin/category/:categoryId" element={<AdminDashboardCategory />} />
          <Route path="/admin/category/edit/:categoryId" element={<AdminDashboardEditCategory />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;