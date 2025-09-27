import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Uh-oh, you've got nothin in your cart just yet!</p>
          <button
            onClick={() => navigate("/products")}
            className="shop-now-btn"
          >
            Start Shopping 🛒
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="cart-item"
              >
                <img
                  src={item.cover_image || item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: ${item.price}</p>

                  <div className="cart-qty">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          Math.max(item.quantity - 1, 1)
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id, item.color, item.size)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <p>Total items: {cart.length}</p>
            <p>Total price: ${total.toFixed(2)}</p>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
