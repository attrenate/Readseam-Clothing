import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product details", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img
        src={product.cover_image || product.image}
        alt={product.name}
        className="detail-img"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {/* Size selector */}
      <label>
        Size:
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Choose Size</option>
          {product.sizes?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {/* Color selector */}
      <label>
        Color:
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Choose Color</option>
          {product.colors?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button
        disabled={!selectedSize || !selectedColor}
        onClick={() => addToCart(product, selectedColor, selectedSize)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
