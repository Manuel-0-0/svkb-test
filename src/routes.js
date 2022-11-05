import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'))

export const Article = lazy(() => import('./pages/Article'))

export const Articles = lazy(() => import('./pages/Articles'))

export const Category = lazy(() => import('./pages/Category'))

export const Login = lazy(() => import('./pages/Login'))

export const NotFound = lazy(() => import('./pages/404'))