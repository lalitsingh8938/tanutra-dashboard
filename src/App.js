// import Header from './components/Header';
// import List from './components/List';
// import Graph from './components/Graph';
// import Campaign from './components/Campaign';
// import SideMenu from './components/SideMenu';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   BrowserRouter,
// } from "react-router-dom";
// import Signup from './components/Signup';
// import Login from './components/Login';
// import OTPAuth from './components/OTPAuth';
// // import Catelog_uploads from './components/Catelog_uploads';
// import MyOrders from './components/MyOrders';
// import ManageInventory from './components/ManageInventory';
// import ForgotPassword from './components/ForgotPassword';
// import Otp from './components/Otp';
// import CreatePassword from './components/CreatePassword';
// import VendorProfile from './components/VendorProfile';
// import VendorKYC from './components/VendorKYC';
// import NavbarTanutra from './components/NavbarTanutra';


// function App() {
//   return (
//     <div className='bg-[#FFFCF4] '>
   
//     <BrowserRouter>

//     <Routes>
//       {/* Default route (Home Page) */}
//       <Route path="/" element={<> <NavbarTanutra /><Header /><List /><Graph /> <Campaign /><SideMenu /></>}/>
//       <Route path="/VendorProfile" element={<> <Header /><VendorProfile /></>}/>
//       <Route path="/Signup" element={<> <Header /><VendorKYC /><Signup /></>}/>
//       <Route path="/OTPAuth" element={<> <Header /><OTPAuth /></>}/>
//       <Route path="/Login" element={<> <Header /><Login /></>}/>
//       <Route path="/MyOrders" element={<> <Header /><MyOrders /></>}/>
//       <Route path="/ManageInventory" element={<><Header /> <ManageInventory /></>}/>
//       <Route path="/ForgotPassword" element={<> <Header /><ForgotPassword /></>}/>
//       <Route path="/Otp" element={<> <Header /><Otp /></>}/>
//       <Route path="/CreatePassword" element={<> <Header /><CreatePassword /></>}/>       
//       </Routes>
//       </BrowserRouter>
//       </div>
//   );
// }

// export default App;

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
import VendorBusinessProfile from './components/VendorBusinessProfile';
// import NavbarTanutra from './components/NavbarTanutra';

function App() {
  return (
    <div className='bg-[#FFFCF4]'>
      <Router>
        <Routes>
          Default route (Home Page)
          <Route path="/" element={<> <Header /><SideMenu /><List /><Graph /><Campaign /></>}/>
          <Route path="/VendorProfile" element={<> <Header /><SideMenu /><VendorProfile /></>}/>
          <Route path="/VendorBusinessProfile" element={<> <Header /><VendorBusinessProfile /></>} /> 
          <Route path="/Signup" element={<> <Header /><Signup /></>}/>
          <Route path="/VendorKYC" element={<> <Header /><VendorKYC /></>}/>
          <Route path="/OTPAuth" element={<> <Header /><OTPAuth /></>}/>
          <Route path="/Login" element={<> <Header /><Login /></>}/>
          <Route path="/MyOrders" element={<> <SideMenu /><Header /><MyOrders /></>}/>
          <Route path="/ManageInventory" element={<><SideMenu /><Header /> <ManageInventory /></>}/>
          <Route path="/Catelog_uploads" element={<><SideMenu /><Catelog_uploads /></>}/>
          <Route path="/ForgotPassword" element={<> <Header /><ForgotPassword /></>}/>
          <Route path="/Otp" element={<> <Header /><Otp /></>}/>
          <Route path="/CreatePassword" element={<> <Header /><CreatePassword /></>}/>      
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
