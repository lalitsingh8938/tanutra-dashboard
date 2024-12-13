import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    material_used: "",
    hsn_code: "",
    price_per_unit: "",
    minimum_order_quantity: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    weight_gm: "",
    use_case_or_utility: "",
  });

  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  // Get access token from localStorage
  const accessToken = localStorage.getItem("access_token");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();

    // Add product data as a JSON string (stringify the object)
    data.append(
      "product_data",
      JSON.stringify({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        dimensions: {
          lenght_cm: formData.length_cm,
          width_cm: formData.width_cm,
          height_cm: formData.height_cm,
          weight_gm: formData.weight_gm,
        },
        material_used: formData.material_used
          ? formData.material_used.split(",")
          : ["Gold"],
        utility_or_usecase: formData.use_case_or_utility,
        quantity_available: "5", //fix this
        price_per_unit: formData.price_per_unit,
        hsn_code: formData.hsn_code,
        minimum_order_quantity: formData.minimum_order_quantity,
      })
    );

    // Add images to FormData (image files)
    productImages.forEach((image) => {
      data.append("product_images", image);
    });

    try {
      const response = await fetch(
        "https://api.tanutra.com/api/product/upload/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization header
          },
          body: data, // Send FormData
        }
      );

      if (response.ok) {
        alert("Product uploaded successfully!");
        navigate("/ThanksYou");
      } else {
        const errorData = await response.json();
        alert(`Failed to upload product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          {/* Logo */}
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="rounded-xl bg-transparent p-2 border">
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
              {/* Product Data Section */}
              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  Product Data:
                </p>
              </div>

              {/* Title Name and Category Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Golden Brass Ganesha"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Home Decor"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Material Used and HSN Code */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Material Used
                  </label>
                  <input
                    type="text"
                    name="material_used"
                    placeholder="Copper, Brass..."
                    value={formData.material_used}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsn_code"
                    placeholder="1234"
                    value={formData.hsn_code}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Price and Minimum Order Quantity */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Price per unit
                  </label>
                  <input
                    type="text"
                    name="price_per_unit"
                    placeholder="200 per product"
                    value={formData.price_per_unit}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Minimum Order Quantity
                  </label>
                  <input
                    type="text"
                    name="minimum_order_quantity"
                    placeholder="20"
                    value={formData.minimum_order_quantity}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length_cm"
                    placeholder="20"
                    value={formData.length_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width_cm"
                    placeholder="15"
                    value={formData.width_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height_cm"
                    placeholder="10"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Weight (gm)
                  </label>
                  <input
                    type="number"
                    name="weight_gm"
                    placeholder="500"
                    value={formData.weight_gm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Description and Use Case */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="abc..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-16 border rounded-md p-1"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Use Case or Utility
                  </label>
                  <textarea
                    name="use_case_or_utility"
                    placeholder="abc..."
                    value={formData.use_case_or_utility}
                    onChange={handleChange}
                    className="w-full h-16 border rounded-md p-1"
                  />
                </div>
              </div>

              {/* Product Images */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full h-9 border rounded-md p-1"
                  />

                  {/* Display Image Previews */}
                  {/* Display Image Previews */}
                  <div className="mt-2">
                    {productImages.length > 0 && (
                      <>
                        <div>
                          <strong>
                            {productImages.length} image(s) uploaded
                          </strong>
                        </div>
                        <div className="flex gap-4 mt-2">
                          {productImages.map((image, index) => (
                            <div
                              key={index}
                              className="w-20 h-20 bg-gray-200 p-2"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`preview-${index}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center p-5">
                <button
                  type="submit"
                  className="text-white bg-blue-500 py-2 px-6 rounded-full"
                >
                  Upload Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
