import Header from './components/Header';
import List from './components/List';
import Graph from './components/Graph';
import Campaign from './components/Campaign';
import SideMenu from './components/SideMenu';
import PrivateRoute from './components/PrivateRoute'; // Correct the path if necessary

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import OTPAuth from './components/OTPAuth';
import Catelog_uploads from './components/Catelog_uploads';
import MyOrders from './components/MyOrders';
import ManageInventory from './components/ManageInventory';
import ForgotPassword from './components/ForgotPassword';
import Otp from './components/Otp';
import CreatePassword from './components/CreatePassword';
import VendorProfile from './components/VendorProfile';
import VendorKYC from './components/VendorKYC';
import BusinessProfile from './components/BusinessProfile';
import {Helmet} from "react-helmet";
import BusinessDescription from './components/BusinessDescription';
import BankDetails from './components/BankDetails';
import SocialMedia from './components/SocialMedia';
import KYCDocument from './components/KYCDocument';

function App() {
  return (
    <div className="bg-[#FFFCF4]">
      <Helmet>
        <title>Tanutra Partners 
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
     
      <Router>
        <Routes>
          Default route (Home Page)
          <Route path="/" element={<> <Header /><SideMenu /><List /><Graph /><Campaign /></>}/>
          <Route path="/VendorProfile" element={<> <Header /><SideMenu /><VendorProfile /></>}/>
          <Route path="/BusinessProfile" element={<> <Header /><SideMenu /><BankDetails /><BusinessDescription /><BusinessProfile /></>} /> 
          <Route path="/Signup" element={<> <Header /><Signup /></>}/>
          <Route path="/VendorKYC" element={<> <Header /><VendorKYC /></>}/>
          <Route path="/OTPAuth" element={<> <Header /><OTPAuth /></>}/>
          <Route path="/Login" element={<> <Header /><Login /></>}/>
          <Route path="/MyOrders" element={<> <SideMenu /><Header /><MyOrders /></>}/>
          <Route path="/ManageInventory" element={<><SideMenu /><Header /> <ManageInventory /></>}/>
          <Route path="/Catelog_uploads" element={<><SideMenu /><Catelog_uploads /> <KYCDocument /><SocialMedia /></>}/>
          <Route path="/ForgotPassword" element={<> <Header /><ForgotPassword /></>}/>
          <Route path="/Otp" element={<> <Header /><Otp /></>}/>
          <Route path="/CreatePassword" element={<> <Header /><CreatePassword /></>}/>      
    
        </Routes>
      </Router>
      {/* <Tanutrafavicon /> */}
    </div>
  );
}

export default App;
