import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/login';
import Signup from './component/signup';
import Tutorial from './component/tutorial';
import DashBoard from './component/dashBoard';
import ForgotPassword from './component/forgotPassword';
import Footer from './component/footer';
import Logout from "./component/logout";
import ImageUpload from "./component/File";
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from "./component/resetPassword";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Main content area */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/File" element={<ImageUpload/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
