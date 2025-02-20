import React, { useState, useEffect, useRef } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { GoChevronDown } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteProducts from "./DeleteProducts"; // Import DeleteProducts component
import { useNavigate } from "react-router-dom";
import EditProducts from "./EditProducts";

function ManageInventory() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
      {/* Manage Inventory Section */}
      <div className="flex">
        <main className="ml-0 md:ml-60 flex-1 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-white py-4 shadow-md flex items-center">
            <div className="text-xl text-slate-700 font-bold">
              Manage Inventory
            </div>
          </div>

          {/* Buttons Section */}
          <div className="bg-white py-2 shadow mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              <button
                className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
                type="button"
              >
                Active (30)
              </button>
              <button
                className="hover:text-blue-600 hover:scale-105 px-6 py-2 text-slate-600 font-semibold rounded-md text-sm"
                type="button"
              >
                Activation Pending (0)
              </button>
              <button
                className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
                type="button"
              >
                Blocked (0)
              </button>
              <button
                className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
                type="button"
              >
                Paused (0)
              </button>
            </div>

            <button
              className="w-36 h-10 bg-blue-700 cursor-pointer mt-1 text-white font-semibold flex items-center justify-center rounded-md text-md gap-2 mr-10"
              type="button"
              onClick={() => navigate("/ProductUpload")}
            >
              <TiArrowUpThick className="w-5 h-6 border-t-2" />
              Add Product
            </button>
          </div>

          <div className="bg-white py-2 border flex flex-wrap gap-4 items-center">
            <button
              className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
              type="button"
            >
              All Stock (4)
            </button>
            <button
              className="hover:text-blue-600 hover:scale-105 px-6 py-2 text-slate-600 font-semibold rounded-md text-sm"
              type="button"
            >
              Out of Stock (0)
            </button>
            <button
              className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
              type="button"
            >
              Low Stock (0)
            </button>

            <button className="text-blue-700 text-sm font-semibold">
              Bulk Stock Update
            </button>
          </div>

          <div className="bg-white py-2 border flex flex-wrap gap-4 items-center justify-between">
            <p className="ml-3 opacity-75">Filter by :</p>
            <button
              className="w-40 h-10 cursor-pointer text-black font-normal opacity-70 border flex items-center justify-center rounded-md text-md gap-2"
              type="button"
            >
              Select Category
              <GoChevronDown className="w-5 h-6" />
            </button>

            <p className="opacity-75 ml-auto">Filter by :</p>
            <button
              className="mr-10 w-72 px-3 h-10 cursor-pointer text-black font-normal opacity-70 border flex items-center justify-between rounded-md text-md gap-2"
              type="button"
            >
              Highest Estimated Orders
              <GoChevronDown className="w-5 h-6" />
            </button>
          </div>
        </main>
      </div>

      {/* Product Page Section */}
      <ProductPage />
    </div>
  );
}

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [popupProductIndex, setPopupProductIndex] = useState(null);
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const navigate = useNavigate();

  console.log("products", products);
  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem("access_token");
      
      try {
        const response = await fetch(
          "https://api.tanutra.com/api/product/get/all/",
          
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            
          }
        );
        

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        

        const data = await response.json();

        const parsedProducts = data.results.data.map((product) => ({
          id: product.id,
          title: product.title,
          hsnCode: product.hsn_code,
          category: product.category,
          materialUsed: product.material_used,
          pricePerUnit: product.price_per_unit,
          minimumOrderQuantity: product.minimum_order_quantity,
          quantityAvailable: product.quantity_available,
          images: product.product_images.map((image) => image.url),
        }));
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Function to handle image click
  const handleImageClick = (images, index) => {
    setSelectedProductImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductImages([]);
    setCurrentImageIndex(0);
  };

  // Navigate to next image
  const viewNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedProductImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Navigate to previous image
  const viewPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedProductImages.length - 1
    );
  };

  // Handle popup open/close
  const togglePopup = (index) => {
    setPopupProductIndex(popupProductIndex === index ? null : index);
  };

  // Ref for the popup
  const popupRef = useRef(null);

  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupProductIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleDeleteSuccess = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="flex bg-slate-100 w-full mt-4">
      <main className="ml-0 md:ml-60 flex-1 p-8">
        <h1 className="text-xl font-bold opacity-70">Product Page</h1>

        <div className="bg-white py-4 px-8 shadow mt-4">
          {loading ? (
            <p>Loading data...</p>
          ) : products.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200 text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    S.No.
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Product Images
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Category
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    HSN Code
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Material Used
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Price per Unit
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    M.O.Q
                  </th>
                  <th className="border border-gray-300 py-2 text-center">
                    Q.T Available
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center items-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {(currentPage - 1) * productsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                      <div className="flex gap-2 justify-center flex-wrap">
                        {product.images.slice(0, 1).map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`Product-${index}-${imgIndex}`}
                            className="w-16 h-16 object-cover rounded"
                            onClick={() => handleImageClick(product.images, 0)}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.hsnCode}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.materialUsed}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.pricePerUnit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.minimumOrderQuantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {product.quantityAvailable}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="relative flex justify-center items-center cursor-pointer">
                        <BsThreeDotsVertical
                          onClick={() => togglePopup(index)}
                          className="h-5 w-5"
                        />
                        {popupProductIndex === index && (
                          <div
                            ref={popupRef} // Attach the ref here
                            className="absolute top-6 right-0 bg-white border shadow-lg p-2 rounded z-10"
                          >
                            <button
                              className="block px-4 py-2 text-sm text-blue-600 font-semibold hover:bg-gray-100 w-full"
                              onClick={() =>
                                navigate(`/editproducts/${product.id}`, {
                                  state: { product },
                                })
                              } // Pass product data
                            >
                              Edit
                            </button>
                            <DeleteProducts
                              productId={product.id}
                              onDeleteSuccess={handleDeleteSuccess} // Pass the success callback to DeleteProducts
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded shadow-lg p-4">
            <img
              src={selectedProductImages[currentImageIndex]}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain mb-4"
            />
            <div className="flex justify-between items-center">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded"
                onClick={viewPrevImage}
              >
                Previous
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded"
                onClick={viewNextImage}
              >
                Next
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-right"></div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageInventory;





// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [popupProductIndex, setPopupProductIndex] = useState(null);
//   const [selectedProductImages, setSelectedProductImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductData = async () => {
//       const token = localStorage.getItem("access_token");
//       try {
//         const response = await fetch("https://api.tanutra.com/api/product/get/all/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();
//         const parsedProducts = data.results.data.map((product) => ({
//           id: product.id,
//           title: product.title,
//           hsnCode: product.hsn_code,
//           category: product.category,
//           materialUsed: product.material_used,
//           pricePerUnit: product.price_per_unit,
//           minimumOrderQuantity: product.minimum_order_quantity,
//           quantityAvailable: product.quantity_available,
//           images: product.product_images.map((image) => image.url),
//         }));
//         setProducts(parsedProducts);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, []);

//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const currentProducts = products.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleImageClick = (images, index) => {
//     setSelectedProductImages(images);
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProductImages([]);
//     setCurrentImageIndex(0);
//   };

//   const viewNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex < selectedProductImages.length - 1 ? prevIndex + 1 : 0
//     );
//   };

//   const viewPrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : selectedProductImages.length - 1
//     );
//   };

//   const togglePopup = (index) => {
//     setPopupProductIndex(popupProductIndex === index ? null : index);
//   };

//   const handleDeleteSuccess = (productId) => {
//     setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
//   };

//   return (
//     <div className="flex bg-slate-100 w-full mt-4">
//       <main className="ml-0 md:ml-60 flex-1 p-8">
//         <h1 className="text-xl font-bold opacity-70">Product Page</h1>

//         <div className="bg-white py-4 px-8 shadow mt-4">
//           {loading ? (
//             <p>Loading data...</p>
//           ) : products.length > 0 ? (
//             <>
//               <table className="w-full border-collapse border border-gray-200 text-left">
//                 <thead>
//                   <tr>
//                     <th className="border px-4 py-2 text-center">S.No.</th>
//                     <th className="border px-4 py-2 text-center">Product Images</th>
//                     <th className="border px-4 py-2 text-center">Title</th>
//                     <th className="border px-4 py-2 text-center">Category</th>
//                     <th className="border px-4 py-2 text-center">HSN Code</th>
//                     <th className="border px-4 py-2 text-center">Material Used</th>
//                     <th className="border px-4 py-2 text-center">Price per Unit</th>
//                     <th className="border px-4 py-2 text-center">M.O.Q</th>
//                     <th className="border px-4 py-2 text-center">Q.T Available</th>
//                     <th className="border px-4 py-2 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentProducts.map((product, index) => (
//                     <tr key={product.id}>
//                       <td className="border px-4 py-2 text-center">
//                         {(currentPage - 1) * productsPerPage + index + 1}
//                       </td>
//                       <td className="border px-4 py-2 text-center">
//                         <img
//                           src={product.images[0]}
//                           alt={product.title}
//                           className="w-16 h-16 object-cover rounded cursor-pointer"
//                           onClick={() => handleImageClick(product.images, 0)}
//                         />
//                       </td>
//                       <td className="border px-4 py-2 text-center">{product.title}</td>
//                       <td className="border px-4 py-2 text-center">{product.category}</td>
//                       <td className="border px-4 py-2 text-center">{product.hsnCode}</td>
//                       <td className="border px-4 py-2 text-center">{product.materialUsed}</td>
//                       <td className="border px-4 py-2 text-center">{product.pricePerUnit}</td>
//                       <td className="border px-4 py-2 text-center">{product.minimumOrderQuantity}</td>
//                       <td className="border px-4 py-2 text-center">{product.quantityAvailable}</td>
//                       <td className="border px-4 py-2 text-center">
//                         <button
//                           className="text-blue-500"
//                           onClick={() => navigate(`/editproducts/${product.id}`, { state: { product } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {products.length > productsPerPage && (
//                 <div className="flex justify-between items-center mt-4">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//                   >
//                     Previous
//                   </button>
//                   <p>Page {currentPage} of {totalPages}</p>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p>No products available.</p>
//           )}
//         </div>
//       </main>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative bg-white rounded shadow-lg p-4">
//             <img
//               src={selectedProductImages[currentImageIndex]}
//               alt="Preview"
//               className="max-w-full max-h-[70vh] object-contain mb-4"
//             />
//             <div className="flex justify-between">
//               <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={viewPrevImage}>Previous</button>
//               <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={viewNextImage}>Next</button>
//               <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductPage;

// 