import React from "react";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.cartContent}>
        {/* Cart Items List */}
        <div className={styles.cartItems}>
          {/* Dummy Item 1 */}
          <div className={styles.cartItem}>
            <div className={styles.itemImagePlaceholder}>Image</div>
            <div className={styles.itemDetails}>
              <h3>Avocado Toast Pack</h3>
              <p className={styles.itemPrice}>$12.99</p>
              <div className={styles.quantityControl}>
                <button className={styles.quantityBtn}>-</button>
                <span>1</span>
                <button className={styles.quantityBtn}>+</button>
              </div>
            </div>
          </div>

          {/* Dummy Item 2 */}
          <div className={styles.cartItem}>
            <div className={styles.itemImagePlaceholder}>Image</div>
            <div className={styles.itemDetails}>
              <h3>Organic Acai Bowl</h3>
              <p className={styles.itemPrice}>$15.50</p>
              <div className={styles.quantityControl}>
                <button className={styles.quantityBtn}>-</button>
                <span>2</span>
                <button className={styles.quantityBtn}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary Panel */}
        <div className={styles.cartSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>$43.99</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>$48.99</span>
          </div>
          <button className={styles.checkoutButton}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
