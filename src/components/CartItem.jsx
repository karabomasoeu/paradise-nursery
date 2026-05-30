import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../store/CartSlice';
import Navbar from './Navbar';

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Coming Soon! Checkout will be available in a future update. Thank you for shopping at Paradise Nursery!');
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-hero">
        <h2> Your Cart</h2>
      </div>
      <div className="cart-container">
        <div className="cart-summary-bar">
          <div className="summary-stat">
            <div className="label">Total Plants</div>
            <div className="value">{totalItems}</div>
          </div>
          <div className="summary-stat">
            <div className="label">Total Cost</div>
            <div className="value">${totalCost.toFixed(2)}</div>
          </div>
          <div className="summary-stat">
            <div className="label">Unique Types</div>
            <div className="value">{items.length}</div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <p>Add some plants to get started!</p>
            <br />
            <Link to="/plants" className="btn-secondary">Browse Plants</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map(item => (
                <div className="cart-item-row" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="unit-price">Unit price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(updateQuantity({ id: item.id, type: 'decrement' }))}
                    >
                      -
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(updateQuantity({ id: item.id, type: 'increment' }))}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button className="btn-delete" onClick={() => dispatch(removeItem(item.id))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/plants" className="btn-secondary">Continue Shopping</Link>
              <button className="btn-checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
