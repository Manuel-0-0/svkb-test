import React, { Suspense } from "react";
import { NotFound, Home, Login, Articles, Article} from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboardArticle from "./pages/AdminDashboardArticles";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import AdminDashboardCreateArticle from "./pages/AdminDashboardCreateArticle";
import AdminDashboardCreateCategory from "./pages/AdminDashboardCreateCategory";
import AdminDashboardCategory from "./pages/AdminDashboardCategory";
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
          {/*  />
          
          <Route path="/create" exact={true} element={<Create />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<Category />} />
          
          <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/admin/article" element={<AdminDashboardArticle />} />
          <Route path="/admin/article/create" element={<AdminDashboardCreateArticle />} />
          <Route path="/admin/category" element={<AdminDashboardCategory />} />
          <Route path="/admin/category/create" element={<AdminDashboardCreateCategory />} />
          <Route path="/admin/home" element={<AdminDashboardHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;