import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer

// Import your components
import Login from './components/Login';
import Signup from './components/Signup';
import OTPAuth from './components/OTPAuth';
import Dashboard from './Dashboard';
import VendorProfile from './components/VendorProfile';
// import Stepper from './components/Stepper';
import BusinessProfile from './components/BusinessProfile';
import BusinessDescription from './components/BusinessDescription';
import BankDetails from './components/BankDetails';
import ThanksYou from './components/ThanksYou';
import MyOrders from './components/MyOrders';
import ManageInventory from './components/ManageInventory';
import CatelogUploads from './components/Catelog_uploads';
import ForgotPassword from './components/ForgotPassword';
import Otp from './components/Otp';
import CreatePassword from './components/CreatePassword';
import KYCDocument from './components/KYCDocument';
import PickupAdd from './components/PickupAdd';
import SocialMedia from './components/SocialMedia';
import ProductUpload from './components/ProductUpload';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import PrivateRoute from './components/PrivateRoute';
import FormPage from './FormPage';
import ProductPage from './components/ProductPage';
import VendorKYC from './components/VendorKYC';
import EditProducts from './components/EditProducts';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';


function App() {
  return (
    <AuthProvider>
      <div className="bg-[#FFFCF4] h-screen">
        <Router>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />}/>
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
                  <ProductPage />
                </PrivateRoute>
              }
            />
          

            <Route
              path="/Catelog_uploads"
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