import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
const Login = lazy(() => import('./screens/login'));
const Register = lazy(() => import('./screens/register'));
const Home = lazy(() => import('./screens/home'));
const Profile = lazy(() => import('./screens/profile'));
const Chat = lazy(() => import('./screens/chat'));

const ProtectedRoute = ({ children }) => {
    const isAuth = Boolean(useSelector((state) => state.token));
    if(!isAuth){
        return <Navigate to={'/auth/login'} />
    }
    else{
        return children
    }
}
const ProtectedRouteAuth = ({ children }) => {
    const isAuth = Boolean(useSelector((state) => state.token));

    if (isAuth) {
        return <Navigate to={'/'} />
    }
    return children
}
const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/profile/:userId",
                element: <Profile />,
            },
            {
                path: "/chat/:chatId/:friendId",
                element: <Chat />,
            }
           
        ]
    },
    {
        path: "/auth",
        element: <ProtectedRouteAuth> <Outlet /> </ProtectedRouteAuth>,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    },

]);
export default router