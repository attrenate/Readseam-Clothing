import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (minPrice && maxPrice) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (sortOption === "price-asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, minPrice, maxPrice, sortOption]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-page">
      <div className="logo">
        <div className="logo-child">
          <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
        </div>
        <h1 className="logo-text">Redseam Clothing</h1>
      </div>

      <div className="products-header">
        <h2 className="products-title">Products</h2>
        <span className="products-info">Showing 1-10 of 100 results</span>
        <div className="products-actions">
          <div className="dropdown">
            <button
              className="products-btn"
              onClick={() => {
                setFilterOpen(!filterOpen);
                setSortOpen(false);
              }}
            >
              Filter
            </button>
            {filterOpen && (
              <div className="dropdown-content">
                <label>
                  Min Price:
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="10"
                  />
                </label>
                <label>
                  Max Price:
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="100"
                  />
                </label>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="apply-btn"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button
              className="products-btn"
              onClick={() => {
                setSortOpen(!sortOpen);
                setFilterOpen(false);
              }}
            >
              Sort by
            </button>
            {sortOpen && (
              <div className="dropdown-content">
                <button
                  onClick={() => {
                    setSortOption("price-asc");
                    setSortOpen(false);
                  }}
                >
                  Lowest Price
                </button>
                <button
                  onClick={() => {
                    setSortOption("price-desc");
                    setSortOpen(false);
                  }}
                >
                  Highest Price
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img
              src={product.cover_image || product.image}
              alt={product.name}
              className="product-img"
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
