// import React from 'react'
// // Import other page components
// import Header from './components/Header';
// import List from './components/List';
// import Graph from './components/Graph';
// import Campaign from './components/Campaign';
// import SideMenu from './components/SideMenu';
// function Dashboard = () => {
//   return (
//     <div>
//     <h1>Welcome to the Home Page!</h1>

//     {/* All pages will be rendered here */}
//     <Header />
//     <List />
//     <Graph />
//     <Campaign />
//     <SideMenu />
//   </div>
//   )
// }

// export default Dashboard

import React from "react";
// Import other page components
import Header from "./components/Header";
import List from "./components/List";
import Graph from "./components/Graph";
import Campaign from "./components/Campaign";
import SideMenu from "./components/SideMenu";

const Dashboard = () => {
  return (
    <div>
      {/* All pages will be rendered here */}
      <Header />
      <List />
      <Graph />
      <Campaign />
      <SideMenu />
    </div>
  );
};

export default Dashboard;
