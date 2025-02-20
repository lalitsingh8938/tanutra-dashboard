import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthContext";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

// Import your components
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import OTPAuth from "./components/Authentication/SignupOTP";
import Dashboard from "./Dashboard";
import VendorProfile from "./components/VendorProfile/VendorProfile";
// import Stepper from './components/Stepper';
import BusinessProfile from "./components/BusinessKYC/BusinessProfile";
import BusinessDescription from "./components/BusinessKYC/BusinessDescription";
import BankDetails from "./components/BusinessKYC/BankDetails";
import ThanksYou from "./components/BusinessKYC/ThanksYou";
import MyOrders from "./components/MyOrders";
import ManageInventory from "./components/ProductPage/ManageInventory";
import CatelogUploads from "./components/CatelogUploads";
import ForgotPassword from "./components/ForgetPassword/Password";
import Otp from "./components/ForgetPassword/Otp";
import CreatePassword from "./components/ForgetPassword/CreatePassword";
import KYCDocument from "./components/BusinessKYC/KYCDocument";
import PickupAdd from "./components/BusinessKYC/PickupAdd";
import SocialMedia from "./components/BusinessKYC/SocialMedia";
import ProductUpload from "./components/ProductPage/ProductUpload";
import Header from "./components/Navbar/Header";
import SideMenu from "./components/Navbar/SideMenu";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import FormPage from "./FormPage";
import VendorKycStatus from "./components/BusinessKYC/VendorKycStatus";
import EditProducts from "./components/ProductPage/EditProducts";
import ProductList from "./components/ProductPage/ProductList";
import Pagination from "./components/ForgetPassword/Pagination";
import EditProductImages from "./components/ProductPage/EditProductImages";
import EditVendorProfile from "./components/VendorProfile/EditVendorProfile";
import MyProfileButton from "./components/VendorProfile/MyProfileButton";
// import DocumentView from './components/DocumentView';

function App() {
  return (
    <AuthProvider>
      <div className="bg-[#FFFCF4] h-screen">
        <Router>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/OTPAuth" element={<OTPAuth />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Otp" element={<Otp />} />
            <Route path="/CreatePassword" element={<CreatePassword />} />

            {/* Protected Routes */}
            <Route
              path="/Dashboard"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/VendorProfile"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <VendorProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/MyProfileButton"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <MyProfileButton />
                </PrivateRoute>
              }
            />

            <Route
              path="/BusinessProfile"
              element={
                <PrivateRoute>
                  <Header />
                  {/* <Stepper /> */}
                  <SideMenu />
                  {/* <FormPage /> */}

                  <BusinessProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/BusinessDescription"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <BusinessDescription />
                </PrivateRoute>
              }
            />

            <Route
              path="/EditProducts/:id"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <EditProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="/EditVenodrProfile"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <EditVendorProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/EditProductImages/:id"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <EditProductImages />
                </PrivateRoute>
              }
            />

            <Route
              path="/ProductList"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/BankDetails"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <BankDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/ThanksYou"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <ThanksYou />
                </PrivateRoute>
              }
            />
            <Route
              path="/MyOrders"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/ManageInventory"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <ManageInventory />
                  {/* <ProductPage /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="/Pagination"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <Pagination />
                </PrivateRoute>
              }
            />

            <Route
              path="/CatelogUploads"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <CatelogUploads />
                </PrivateRoute>
              }
            />
            <Route
              path="/KYCDocument"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <KYCDocument />
                </PrivateRoute>
              }
            />
            <Route
              path="/PickupAdd"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <PickupAdd />
                </PrivateRoute>
              }
            />
            <Route
              path="/SocialMedia"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  {/* <Stepper /> */}
                  <SocialMedia />
                </PrivateRoute>
              }
            />
            <Route
              path="/ProductUpload"
              element={
                <PrivateRoute>
                  <Header />
                  <SideMenu />
                  <ProductUpload />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './components/AuthContext';
// import { ToastContainer } from 'react-toastify';

// // Import your components
// import Login from './components/Login';
// import Signup from './components/Signup';
// import OTPAuth from './components/OTPAuth';
// import Dashboard from './Dashboard';
// import VendorProfile from './components/VendorProfile';
// import BusinessProfile from './components/BusinessProfile';
// import EditVendorProfile from './components/EditVendorProfile';
// import MyProfileButton from './components/MyProfileButton';
// import Header from './components/Header';
// import SideMenu from './components/SideMenu';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   const accessToken = localStorage.getItem("access_token");
//   return (
//     <AuthProvider>
//       <div className="bg-[#FFFCF4] h-screen">
//         <Router>
//           <ToastContainer
//             position="top-center"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//           {/* Header ko yahan render karein */}
//           <Header />
//           {/* SideMenu ko yahan render karein */}
//           <SideMenu />
//           {/* MyProfileButton ko yahan render karein */}
//           <MyProfileButton accessToken={accessToken} />
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/Login" element={<Login />} />
//             <Route path="/Signup" element={<Signup />} />
//             <Route path="/OTPAuth" element={<OTPAuth />} />
//             {/* Protected Routes */}
//             <Route
//               path="/Dashboard"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/VendorProfile"
//               element={
//                 <PrivateRoute>
//                   <VendorProfile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/BusinessProfile"
//               element={
//                 <PrivateRoute>
//                   <BusinessProfile />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/EditVendorProfile"
//               element={
//                 <PrivateRoute>
//                   <EditVendorProfile />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </Router>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
