import React, { Suspense } from "react";
import { NotFound, Home, Login, Articles,AdminDashboardHome, Article} from "./routes";
//Articles, Article, Create, Category, Login,  Dashboard
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/create" exact={true} element={<Create />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<Category />} />
          
          <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/admin/home" element={<AdminDashboardHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;