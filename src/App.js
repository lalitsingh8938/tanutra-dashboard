// import Header from './components/Header';
// import List from './components/List';
// import Graph from './components/Graph';
// import Campaign from './components/Campaign';
// import SideMenu from './components/SideMenu';
// import PrivateRoute from './components/PrivateRoute'; 
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import Signup from './components/Signup';
// import Login from './components/Login';
// import OTPAuth from './components/OTPAuth';
// import Catelog_uploads from './components/Catelog_uploads';
// import MyOrders from './components/MyOrders';
// import ManageInventory from './components/ManageInventory';
// import ForgotPassword from './components/ForgotPassword';
// import Otp from './components/Otp';
// import CreatePassword from './components/CreatePassword';
// import VendorProfile from './components/VendorProfile';
// import VendorKYC from './components/VendorKYC';
// import BusinessProfile from './components/BusinessProfile';
// import {Helmet} from "react-helmet";
// import BusinessDescription from './components/BusinessDescription';
// import BankDetails from './components/BankDetails';
// import SocialMedia from './components/SocialMedia';
// import KYCDocument from './components/KYCDocument';
// import PickupAdd from './components/PickupAdd';
// import ThanksYou from './components/ThanksYou';
// import ProductUpload from './components/ProductUpload';


// function App() {
//   return (
//     <div className="bg-[#FFFCF4] h-screen">
//       <Helmet>
        
//         <meta name="description" content="Helmet application" />
//       </Helmet>
     
//       <Router>
//         <Routes>
//           Default route (Home Page)
//           <Route path="/" element={<> <Header /><SideMenu /><List /><Graph /><Campaign /></>}/>
//           <Route path="/VendorProfile" element={<> <Header /><SideMenu /><VendorProfile /></>}/>
//           <Route path="/BusinessProfile" element={<><Header /><SideMenu /><BusinessProfile /></>} /> 
//           <Route path="/BusinessDescription" element={<><Header /><SideMenu /><Header /><BusinessDescription /></>}/>
//           <Route path="/BankDetails" element={<><Header /><SideMenu /><BankDetails /></>}/>
//           <Route path="/ThanksYou" element={<> <Header /><SideMenu /><ThanksYou /></>}/>
//           <Route path="/Signup" element={<> <Header /><Signup /></>}/>
//           <Route path="/VendorKYC" element={<> <Header /><SideMenu /><VendorKYC /></>}/>
//           <Route path="/OTPAuth" element={<> <Header /><OTPAuth /></>}/>
//           <Route path="/Login" element={<> <Header /><Login /></>}/>
//           <Route path="/MyOrders" element={<> <SideMenu /><Header /><MyOrders /></>}/>
//           <Route path="/ManageInventory" element={<><SideMenu /><Header /> <ManageInventory /></>}/>
//           <Route path="/Catelog_uploads" element={<><SideMenu /><Catelog_uploads/></>}/>
//           <Route path="/ForgotPassword" element={<> <Header /><ForgotPassword /></>}/>
//           <Route path="/Otp" element={<> <Header /><Otp /></>}/>
//           <Route path="/CreatePassword" element={<> <Header /><CreatePassword /></>}/> 
//           <Route path="/KYCDocument" element={<><Header /><SideMenu /><KYCDocument /></>}/>
//           <Route path="/PickupAdd" element={<> <Header /><SideMenu /><PickupAdd /></>}/>
//           <Route path="/SocialMedia" element={<> <Header /><SideMenu /><SocialMedia /></>}/>
//           <Route path="/ProductUpload" element={<> <Header /><SideMenu /><ProductUpload /></>}/>
    
//         </Routes>
//       </Router>
  
//     </div>
//   );
// }

// export default App;






import Header from './components/Header';
import List from './components/List';
import Graph from './components/Graph';
import Campaign from './components/Campaign';
import SideMenu from './components/SideMenu';
import PrivateRoute from './components/PrivateRoute'; 
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
import PickupAdd from './components/PickupAdd';
import ThanksYou from './components/ThanksYou';
import ProductUpload from './components/ProductUpload';
import Dashboard from './Dashboard';


function App() {
  return (
    <div className="bg-[#FFFCF4] h-screen">
      <Helmet>
        
        <meta name="description" content="Helmet application" />
      </Helmet>
     
      <Router>
        <Routes>
          Default route (Home Page)
          <Route path="/" element={<> <Login /></>}/>
           <Route path="/Dashboard" element={<> <Dashboard /></>}/> 
          <Route path="/VendorProfile" element={<> <Header /><SideMenu /><VendorProfile /></>}/>
          <Route path="/BusinessProfile" element={<><Header /><SideMenu /><BusinessProfile /></>} /> 
          <Route path="/BusinessDescription" element={<><Header /><SideMenu /><Header /><BusinessDescription /></>}/>
          <Route path="/BankDetails" element={<><Header /><SideMenu /><BankDetails /></>}/>
          <Route path="/ThanksYou" element={<> <Header /><SideMenu /><ThanksYou /></>}/>
          <Route path="/Signup" element={<> <Header /><Signup /></>}/>
          <Route path="/VendorKYC" element={<> <Header /><SideMenu /><VendorKYC /></>}/>
          <Route path="/OTPAuth" element={<> <Header /><OTPAuth /></>}/>
          <Route path="/Login" element={<> <Header /><Login /></>}/>
          <Route path="/MyOrders" element={<> <SideMenu /><Header /><MyOrders /></>}/>
          <Route path="/ManageInventory" element={<><SideMenu /><Header /> <ManageInventory /></>}/>
          <Route path="/Catelog_uploads" element={<><SideMenu /><Catelog_uploads/></>}/>
          <Route path="/ForgotPassword" element={<> <Header /><ForgotPassword /></>}/>
          <Route path="/Otp" element={<> <Header /><Otp /></>}/>
          <Route path="/CreatePassword" element={<> <Header /><CreatePassword /></>}/> 
          <Route path="/KYCDocument" element={<><Header /><SideMenu /><KYCDocument /></>}/>
          <Route path="/PickupAdd" element={<> <Header /><SideMenu /><PickupAdd /></>}/>
          <Route path="/SocialMedia" element={<> <Header /><SideMenu /><SocialMedia /></>}/>
          <Route path="/ProductUpload" element={<> <Header /><SideMenu /><ProductUpload /></>}/>
    
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;




