import React from "react";

const DeleteProducts = ({ productId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.warn("Access token is missing. Please log in again.");
        return;
      }

      const response = await fetch(
        `https://api.tanutra.com/api/product/delete/${productId}/`,
        {
          method: "DELETE", // Use DELETE method
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Product with ID ${productId} deleted successfully.`);
        onDeleteSuccess(productId); // Call the success callback to update the product list in ProductPage
      } else {
        const responseData = await response.json();
        console.error(
          "Delete failed:",
          responseData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 font-semibold"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteProducts;
