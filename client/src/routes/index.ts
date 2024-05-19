import DefaultLayout from "@/components/Layout/DefaultLayout";
import LoginLayout from "@/components/Layout/LoginLayout";
import LoginWithPolicyLayout from "@/components/Layout/LoginWithPolicyLayout";
import Home from "@/site/Home";
import Login from "@/site/Login";
import LoginEmail from "@/site/LoginEmail";
export interface RouteType {
    path: string;
    element: React.ComponentType; 
    layout : React.ComponentType<{children : React.ReactNode}>;
}

export const publicRoutes = [
    { path: "/home", element: Home, layout : DefaultLayout },
    { path: "/login", element: Login, layout : LoginWithPolicyLayout },
    { path: "/login-email", element: LoginEmail, layout : LoginLayout },
];
  
//   const privateRoutes = [
//     { path: "/mission", component: Mission },
//     { path: "/redeemed-gifts", component: RedeemedGifts },
//   ];