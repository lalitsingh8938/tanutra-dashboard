import { useState } from 'react';
import axios from 'axios';

// You might want to pass `id` and `accessToken` as props or get them from context
const ImageUpdate = ({ id, accessToken }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', newImage);

    try {
      const response = await fetch(
        `https://api.tanutra.com/product/update-images/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData, // Sending form data instead of JSON
        }
      );

      // Parse the response as JSON
      const responseData = await response.json();

      // Assuming responseData contains the updated images
      if (response.ok) {
        setUploadedImages([...uploadedImages, ...responseData.product_images]);
      } else {
        console.error("Error uploading image:", responseData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Update Image</button>

      <div className="flex items-center gap-4 overflow-x-auto p-4 border-b">
        {uploadedImages.length > 0 && (
          <div className="flex items-center gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative w-10 h-10 border rounded-lg overflow-hidden">
                <img
                  src={image.image_url} // Assuming each image object has an image_url field
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover w-16 h-16"
                />
                <button
                  className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                  title="Remove Image"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpdate;
