import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'))

export const Article = lazy(() => import('./pages/Article'))

export const Articles = lazy(() => import('./pages/Articles'))

// export const Create = lazy(() => import('./pages/Create'))

// export const Category = lazy(() => import('./pages/Category'))

export const Login = lazy(() => import('./pages/Login'))

export const AdminDashboardHome = lazy(() => import('./pages/AdminDashboardHome'))

export const NotFound = lazy(() => import('./pages/404'))