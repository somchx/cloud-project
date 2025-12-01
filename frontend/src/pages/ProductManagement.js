import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from '../api';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    stock: '',
    image_url: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || null
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('แก้ไขสินค้าสำเร็จ!');
      } else {
        await createProduct(productData);
        alert('เพิ่มสินค้าสำเร็จ!');
      }

      setFormData({
        name: '',
        price: '',
        category_id: '',
        stock: '',
        image_url: ''
      });
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      stock: product.stock,
      image_url: product.image_url || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('ต้องการลบสินค้านี้หรือไม่?')) {
      try {
        await deleteProduct(id);
        alert('ลบสินค้าสำเร็จ!');
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category_id: '',
      stock: '',
      image_url: ''
    });
  };

  if (loading) {
    return <div className="loading">กำลังโหลด...</div>;
  }

  return (
    <div className="product-management">
      <h2>📦 จัดการสินค้า</h2>

      <div className="add-product-form">
        <h3>{editingProduct ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>ชื่อสินค้า *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ราคา (บาท) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>หมวดหมู่ *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">-- เลือกหมวดหมู่ --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>จำนวนคงเหลือ *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>URL รูปภาพ (ถ้ามี)</label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              {editingProduct ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มสินค้า'}
            </button>
            {editingProduct && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อสินค้า</th>
              <th>ราคา</th>
              <th>หมวดหมู่</th>
              <th>คงเหลือ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>฿{product.price}</td>
                <td>{product.category?.name || '-'}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-secondary" onClick={() => handleEdit(product)}>
                      ✏️ แก้ไข
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                      🗑️ ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="empty-state">
            <h3>ยังไม่มีสินค้า</h3>
            <p>เพิ่มสินค้าใหม่เพื่อเริ่มต้น</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
