import './App.css'
import Auth from './site/Auth'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
      <div>
        <Auth></Auth>
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
