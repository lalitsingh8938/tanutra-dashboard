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
