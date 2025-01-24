import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleEdit = (productId) => {
    navigate(`/EditProducts/${productId}`); // ProductId ke saath edit page pe navigate karo
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.title}</h3>
          <button onClick={() => handleEdit(product.id)} className="edit-button">
            Edit
          </button>
          {/* <DeleteProducts productId={product.id} onDeleteSuccess={handleDeleteSuccess} /> */}
        </div>
      ))}
    </div>
  );
};

const handleDeleteSuccess = (deletedProductId) => {
  // Product delete hone ke baad list ko update karo
  console.log(`Product with ID ${deletedProductId} has been deleted.`);
};

export default ProductList;
