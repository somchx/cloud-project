import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>🛒 POS ร้านขายของชำ</h1>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/pos">ขายของ (POS)</Link>
          <Link to="/products">จัดการสินค้า</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
