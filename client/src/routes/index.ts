import DefaultLayout from "@/components/Layout/DefaultLayout";
import LoginLayout from "@/components/Layout/LoginLayout";
import LoginWithPolicyLayout from "@/components/Layout/LoginWithPolicyLayout";
import Home from "@/site/Home";
import Login from "@/site/Login";
import LoginEmail from "@/site/LoginEmail";
import Upload from "@/site/Upload";
export interface RouteType {
    path: string;
    element: React.ComponentType; 
    layout?: React.ComponentType<{children : React.ReactNode}>;
    fullScreen? : boolean;
}

export const publicRoutes : RouteType[] = [
    { path: "/", element: Home, layout : DefaultLayout , fullScreen :true },
    { path: "/login", element: Login, layout : LoginWithPolicyLayout , fullScreen :true },
    { path: "/login-email", element: LoginEmail, layout : LoginLayout , fullScreen :true },
];
  
export const privateRoutes : RouteType[] = [
   { path: "/upload", element: Upload,layout : DefaultLayout, fullScreen :false },
];