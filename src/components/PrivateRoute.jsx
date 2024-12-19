// import React from "react";
// import {useEffect} from "react"; 
// import { Route, Navigate, useNavigate} from "react-router-dom";

// // Private Route Component
// function PrivateRoute(props) {
//   // Check if the user is logged in by checking for the access token in localStorage
//   const {component} = props
//   const nevigate= useNavigate();
//   useEffect(()=>{
//     let login = localStorage.getItem('/Login');
//     if (!login) {
//       nevigate('/Login')

//     }
//   })

//   return (
//     <div>
//       <component />

//     </div>
     
//   );
// }

// export default PrivateRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// function PrivateRoute({ children }) {
//   const accessToken = localStorage.getItem("access_token");
//   console.log("Access Token from localStorage:", accessToken);

//   return accessToken ? children : <Navigate to="/Login" replace />;
// }

// export default PrivateRoute;



// import React from 'react'
// import { Navigate } from "react-router-dom";

// function PrivateRoute({isAuth,childern}) {
//   return isAuth ? childern : <Nevigate to = "/Dashboard"/>
//     // <div>
      
//     // </div>
// //   )
// }

// export default PrivateRoute


// ProtectedRoute.js


// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { isLoggedIn } = useAuth();

//   return isLoggedIn ? children : <Navigate to="/Dashboard" />;
// };

// export default PrivateRoute;










/////////////////////////////////////////////////////////













import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/Login" />;
  }

  return children;
};

export default PrivateRoute;
