import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, createSale } from '../api';

function POS() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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
    <div className="pos-container">
      <div className="products-section">
        <h2>🛍️ เลือกสินค้า</h2>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">ทุกหมวดหมู่</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => addToCart(product)}
            >
              <h4>{product.name}</h4>
              <div className="product-price">฿{product.price}</div>
              <div className="product-stock">
                คงเหลือ: {product.stock} ชิ้น
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <h3>ไม่พบสินค้า</h3>
            <p>ลองค้นหาด้วยคำอื่นหรือเปลี่ยนหมวดหมู่</p>
          </div>
        )}
      </div>

      <div className="cart-section">
        <h3>🛒 ตะกร้าสินค้า</h3>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-state">
              <p>ตะกร้าว่างเปล่า</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ฿{item.price} x {item.quantity} = ฿{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <div className="total-amount">
            <span>ยอดรวม:</span>
            <span>฿{getTotal().toFixed(2)}</span>
          </div>
          
          <button
            className="checkout-btn"
            onClick={() => setShowCheckoutModal(true)}
            disabled={cart.length === 0}
          >
            💳 ชำระเงิน
          </button>
          
          {cart.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>
              🗑️ ล้างตะกร้า
            </button>
          )}
        </div>
      </div>

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>ยืนยันการชำระเงิน</h3>
            <p>ยอดรวมทั้งหมด: <strong>฿{getTotal().toFixed(2)}</strong></p>
            <p>จำนวนสินค้า: {cart.length} รายการ</p>
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
