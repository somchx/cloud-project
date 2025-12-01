import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, createSale } from '../api';
import { getProductImage } from '../utils/productImages';
import '../POS.css';

function POS() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        alert('สินค้าไม่เพียงพอ');
      }
    } else {
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      } else {
        alert('สินค้าหมด');
      }
    }
  };

  const updateQuantity = (productId, change) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    const newQuantity = cartItem.quantity + change;

    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else if (newQuantity <= product.stock) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      alert('สินค้าไม่เพียงพอ');
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getTotal() * 0.07; // 7% VAT
  };

  const getFinalTotal = () => {
    return getTotal() + getTax();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('ตะกร้าสินค้าว่างเปล่า');
      return;
    }

    try {
      const saleData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await createSale(saleData);
      alert('ชำระเงินสำเร็จ!');
      setCart([]);
      setShowCheckoutModal(false);
      fetchData(); // Refresh products to update stock
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('เกิดข้อผิดพลาดในการชำระเงิน');
    }
  };

  const clearCart = () => {
    if (window.confirm('ต้องการล้างตะกร้าสินค้าหรือไม่?')) {
      setCart([]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || product.category_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="loading">กำลังโหลด...</div>;
  }

  return (
    <div className="pos-container-modern">
      <div className="pos-main-content">
        {/* Left Section - Products */}
        <div className="products-section-modern">
          {/* Category Tabs */}
          <div className="category-tabs">
            <button
              className={!selectedCategory ? 'category-tab active' : 'category-tab'}
              onClick={() => setSelectedCategory('')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={selectedCategory === cat.id.toString() ? 'category-tab active' : 'category-tab'}
                onClick={() => setSelectedCategory(cat.id.toString())}
              >
                {cat.name}
              </button>
            ))}
            <div className="menu-search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid-modern">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card-modern">
                <div className="product-image">
                  <img
                    src={getProductImage(product.name)}
                    alt={product.name}
                    onError={(e) => { e.target.src = '/img/default.png'; }}
                  />
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="product-description">คงเหลือ {product.stock} ชิ้น</p>
                </div>
                <div className="product-footer">
                  <div className="product-price-modern">฿{product.price.toFixed(1)}</div>
                  <div className="product-actions">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        const item = cart.find(i => i.id === product.id);
                        if (item) updateQuantity(product.id, -1);
                      }}
                      disabled={!cart.find(i => i.id === product.id)}
                    >
                      -
                    </button>
                    <span className="qty-display">
                      {cart.find(i => i.id === product.id)?.quantity || 0}
                    </span>
                    <button
                      className="qty-btn-add"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Invoice */}
        <div className="invoice-section">
          <h2 className="invoice-title">Invoice</h2>

          {/* Cart Items */}
          <div className="invoice-items">
            {cart.length === 0 ? (
              <div className="empty-invoice">
                <p>ไม่มีสินค้าในตะกร้า</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="invoice-item">
                  <div className="invoice-item-image">
                    <img
                      src={getProductImage(item.name)}
                      alt={item.name}
                      onError={(e) => { e.target.src = '/img/default.png'; }}
                    />
                  </div>
                  <div className="invoice-item-details">
                    <h4>{item.name}</h4>
                    <div className="invoice-item-quantity">{item.quantity}x</div>
                    <div className="invoice-item-note">Don't Add Vegetables</div>
                  </div>
                  <div className="invoice-item-price">
                    ฿{(item.price * item.quantity).toFixed(1)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Summary */}
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="summary-row">
              <span>Sub Total</span>
              <span>฿{getTotal().toFixed(1)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>฿{getTax().toFixed(1)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Payment</span>
              <span>฿{getFinalTotal().toFixed(1)}</span>
            </div>

            {/* Place Order Button */}
            <button
              className="place-order-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Place An Order
            </button>

            {cart.length > 0 && (
              <button className="clear-cart-btn-modern" onClick={clearCart}>
                🗑️ Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>ยืนยันการชำระเงิน</h3>
            <p>ยอดรวมทั้งหมด: <strong>฿{getFinalTotal().toFixed(2)}</strong></p>
            <p>วิธีการชำระเงิน: <strong>{paymentMethod === 'credit-card' ? 'บัตรเครดิต' : paymentMethod === 'paylater' ? 'จ่ายทีหลัง' : 'เงินสด'}</strong></p>
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={handleCheckout}>
                ยืนยัน
              </button>
              <button className="btn btn-secondary" onClick={() => setShowCheckoutModal(false)}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POS;
