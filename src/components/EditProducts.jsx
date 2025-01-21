import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProducts = () => {
  // const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [productImages, setProductImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    minicategory: "",
    description: "",
    material_used: "",
    hsn_code: "",
    price_per_unit: "",
    minimum_order_quantity: "",
    quantity_available: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    weight_gm: "",
    use_case_or_utility: "",
  });

  const [isKYCApproved, setIsKYCApproved] = useState(false); // Track KYC status

  const accessToken = localStorage.getItem("access_token");

  // Fetch KYC status on component mount
  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        const response = await fetch(
          "https://api.tanutra.com/api/get/kyc-status/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsKYCApproved(data.is_kyc_approved); // Assuming API returns a boolean
        } else {
          toast.error("Failed to fetch KYC status. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching KYC status:", error);
        toast.error("Error fetching KYC status. Please try again.");
      }
    };

    fetchKYCStatus();
  }, [accessToken]);

  const categories = [
    {
      category: "Home Decor",
      subcategories: [
        {
          name: "Wall Decor",
          miniCategories: ["Wall Art", "Wall Hangings", "Clocks", "Mirrors"],
        },
        {
          name: "Lighting",
          miniCategories: [
            "Table Lamps",
            "Floor Lamps",
            "Pendant Lights",
            "Chandeliers",
          ],
        },
        {
          name: "Furniture",
          miniCategories: ["Tables", "Chairs", "Shelves", "Stools"],
        },
        {
          name: "Textiles & Cushions",
          miniCategories: [
            "Curtains",
            "Cushion Covers",
            "Throws",
            "Rugs & Carpets",
          ],
        },
        {
          name: "Tableware",
          miniCategories: ["Table Runners", "Placemats", "Coasters"],
        },
        {
          name: "Vases & Planters",
          miniCategories: [
            "Decorative Vases",
            "Indoor Planters",
            "Outdoor Planters",
          ],
        },
      ],
    },
    {
      category: "Handicrafts",
      subcategories: [
        {
          name: "Wooden Crafts",
          miniCategories: [],
        },
        {
          name: "Terracotta Items",
          miniCategories: [],
        },
        {
          name: "Metalware",
          miniCategories: [
            "Brass Decor",
            "Copper Crafts",
            "Stone & Marble Crafts",
          ],
        },
        {
          name: "Sculptures",
          miniCategories: [],
        },
        {
          name: "Decorative Bowls",
          miniCategories: [],
        },
        {
          name: "Paper Mache Products",
          miniCategories: [],
        },
        {
          name: "Embroidered Textiles",
          miniCategories: [],
        },
        {
          name: "Bamboo & Cane Products",
          miniCategories: [],
        },
        {
          name: "Tribal Art & Crafts",
          miniCategories: [],
        },
      ],
    },
    {
      category: "Giftware",
      subcategories: [
        {
          name: "Personalized Gifts",
          miniCategories: [],
        },
        {
          name: "Festive Gifts",
          miniCategories: ["Diwali Hampers", "Christmas Gifts"],
        },
        {
          name: "Corporate Gifts",
          miniCategories: [],
        },
        {
          name: "Office Decor",
          miniCategories: ["Desk Accessories"],
        },
        {
          name: "Wedding & Anniversary Gifts",
          miniCategories: [],
        },
        {
          name: "Handmade Journals & Stationery",
          miniCategories: [],
        },
        {
          name: "Jewelry Boxes",
          miniCategories: [],
        },
        {
          name: "Candle Holders",
          miniCategories: [],
        },
        {
          name: "Gift Baskets",
          miniCategories: [],
        },
      ],
    },
    {
      category: "Seasonal/Theme-Based",
      subcategories: [
        {
          name: "Eco-Friendly Decor",
          miniCategories: [],
        },
        {
          name: "Vintage & Antique Items",
          miniCategories: [],
        },
        {
          name: "Minimalist Design Items",
          miniCategories: [],
        },
        {
          name: "Bohemian Style Decor",
          miniCategories: [],
        },
        {
          name: "Traditional Indian Crafts",
          miniCategories: [],
        },
      ],
    },
  ];
  // const accessToken = localStorage.getItem("access_token");

  // const [productImages, setProductImages] = useState([]);
  // const navigate = useNavigate();
  const handleCategoryChange = (event) => {
    const selectedCat = categories.find(
      (cat) => cat.category === event.target.value
    );
    setSelectedCategory(selectedCat);
    setFormData({
      ...formData,
      category: event.target.value,
      subcategory: "",
      miniCategory: "",
    });
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcat = selectedCategory.subcategories.find(
      (sub) => sub.name === e.target.value
    );
    setSelectedSubcategory(selectedSubcat);
    setFormData({
      ...formData,
      subcategory: e.target.value,
      miniCategory: "",
    });
  };

  const handleMiniCategoryChange = (e) => {
    setFormData({
      ...formData,
      miniCategory: e.target.value,
    });
  };

  // Get access token from localStorage
  // const accessToken = localStorage.getItem("access_token");

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
    setProductImages((prevImages) => [...prevImages, ...files]);
  };
  const validateForm = () => {
    if (!formData.title || !formData.category || productImages.length === 0) {
      toast.error(
        "Please fill all required fields and upload at least one image."
      );
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isKYCApproved) {
    //   toast.error("Please complete your KYC first to upload products.");
    //   return;
    // }

    // Create FormData object
    const data = new FormData();

    // Add product data as a JSON string (stringify the object)
    data.append(
      "product_data",
      JSON.stringify({
        title: formData.title,
        category: formData.category,
        sub_category: formData.subcategory,
        mini_category: formData.minicategory,
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
        quantity_available: formData.quantity_available, //fix this
        price_per_unit: formData.price_per_unit,
        hsn_code: formData.hsn_code,
        minimum_order_quantity: formData.minimum_order_quantity,
      })
    );

    // Add images to FormData (image files)
    productImages.forEach((image) => {
      data.append("product_images", image);
    });
    setIsLoading(true); // Start loading

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
        toast.success("Product uploaded successfully!");
        navigate("/ThanksYou");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error uploading product. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          {/* Logo */}
          {/* <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          /> */}

          <div className="rounded-xl bg-transparent p-2 border">
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-2 bg-transparent">
              {/* Product Data Section */}

              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                {/* <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                /> */}
                <p className="px-5 py-1 flex text-xl font-semibold text-black w-full">
                  Product Details:
                </p>
              </div>

              {/* Title Name and Category Name */}
              <p className="items-center px-5 py-1 mt-3 rounded-lg flex text-lg font-semibold text-black w-52 text-center opacity-60 bg-[#ECB59D]">
                Product Attributes:
              </p>
              {/* <p className="border mt-2"></p> */}
              <div className="flex flex-wrap justify-center items-center gap-16 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-1">
                    Product Title
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
                  <label className="font-semibold text-slate-800 p-1">
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

                {/* Render Category */}
                <div className="flex flex-col w-72 space-y-2">
                  {/* Category Dropdown */}
                  <div className="flex flex-col">
                    <label className="font-semibold text-slate-800 p-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className="w-full h-9 p-1 border border-gray-300 rounded-md focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.category} value={cat.category}>
                          {cat.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Dropdown */}
                  {formData.category &&
                    selectedCategory?.subcategories.length > 0 && (
                      <div className="flex flex-col">
                        <label className="font-semibold text-semibold text-slate-800 p-1">
                          Subcategory
                        </label>
                        <select
                          value={formData.subcategory}
                          onChange={handleSubcategoryChange}
                          className="w-full h-9 p-1 border border-gray-300 rounded-md focus:outline-none"
                        >
                          <option value="">Select Subcategory</option>
                          {selectedCategory.subcategories.map((sub) => (
                            <option key={sub.name} value={sub.name}>
                              {sub.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  {/* Mini Category Dropdown */}
                  {formData.subcategory &&
                    selectedSubcategory?.miniCategories.length > 0 && (
                      <div className="flex flex-col">
                        <label className="font-semibold text-semibold text-slate-800">
                          Mini Category 
                        </label>
                        <select
                          value={formData.miniCategory}
                          onChange={handleMiniCategoryChange}
                          className="w-full h-9 p-1 border border-gray-300 rounded-md focus:outline-none"
                        >
                          <option value="">Select Mini Category</option>
                          {selectedSubcategory.miniCategories.map((mini) => (
                            <option key={mini} value={mini}>
                              {mini}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                </div>
                
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
              </div>

              
              {/* Material Used and HSN Code */}
              <div className="flex flex-wrap justify-center items-center gap-16 p-5">
                
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

              {/* Description and Use Case */}
              <div className="flex flex-wrap justify-center items-center gap-16 p-5">
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

              {/* Price and Minimum Order Quantity */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
               

               
              </div>

              <div className="flex flex-col w-72 ml-32">
                <label className="font-semibold text-slate-800 p-2">
                  Quantity Available:
                </label>
                <input
                  type="integer"
                  name="quantity_available"
                  placeholder="20"
                  value={formData.quantity_available}
                  onChange={handleChange}
                  className="w-full h-9 border rounded-md p-3"
                />
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

              

              {/* Product Images */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                {/* Image Box on Left */}
                <div className="flex flex-col w-72 ">
                  <div className="flex flex-col w-full border bg-white rounded-lg p-3">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-28"
                      alt="logo"
                    />
                    <div className="font-medium text-slate-800 p-1 text-center">
                      Drag and drop your Product images
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange} // Handle file input
                      multiple // Allow multiple file selection
                      className="w-56 h-10 rounded-md p-2 ml-6"
                    />
                  </div>

                  {/* Display Image Previews */}
                  <div className="mt-2">
                    {productImages.length > 0 && (
                      <>
                        <div>
                          <strong>
                            {productImages.length} image(s) uploaded
                          </strong>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 justify-start">
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
                  className="text-white font-semibold bg-green-500 py-2 px-6 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading ..." : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
