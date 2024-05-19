import './App.css'
import Auth from './site/Login'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { RouteType, publicRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import Page404 from './site/Page404';
function App() {
  const token = localStorage.getItem("accessToken") || '';
  const RouteRender = (route :RouteType, index : number) => {
    const Layout = route.layout || DefaultLayout;
    const Page = route.element;
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  };
  return (
      <div>
        <Router>
          <Routes>
            { 
              publicRoutes.map((route:RouteType,index:number) => 
                RouteRender(route,index)
              )
            }
            <Route path='*' element={<Page404/>}></Route>
          </Routes>

        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        <ToastContainer />
    </div>
  )
}
export default App
