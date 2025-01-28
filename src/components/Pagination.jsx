// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PaginatedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [nextPage, setNextPage] = useState(null);
//   const [previousPage, setPreviousPage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async (url = "http://api.tanutra.com/api/product/get/all/") => {
//     setLoading(true);
//     try {
//       const response = await axios.get(url);
//       const { results, next, previous } = response.data;

//       setProducts(results.data); // Set the products
//       setNextPage(next); // Set the next page URL
//       setPreviousPage(previous); // Set the previous page URL
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleNext = () => {
//     if (nextPage) fetchProducts(nextPage);
//   };

//   const handlePrevious = () => {
//     if (previousPage) fetchProducts(previousPage);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Products</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {products.map((product) => (
//               <li key={product.id} className="p-4 border rounded shadow">
//                 <h2 className="font-semibold">{product.title}</h2>
//                 <p>Category: {product.category}</p>
//                 <p>Sub-category: {product.sub_category || "N/A"}</p>
//                 <p>Dimensions: {product.dimensions.width_cm} x {product.dimensions.height_cm} x {product.dimensions.lenght_cm} cm</p>
//                 <p>Weight: {product.dimensions.weight_gm} gm</p>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handlePrevious}
//               disabled={!previousPage}
//               className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={!nextPage}
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaginatedProducts;
