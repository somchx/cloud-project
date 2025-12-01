import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">กำลังโหลด...</div>;
  }

  return (
    <div className="dashboard">
      <h2>📊 Dashboard - สรุปยอดขาย</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>ยอดขายวันนี้</h3>
          <div className="stat-value">
            ฿{stats?.total_sales_today?.toFixed(2) || '0.00'}
          </div>
        </div>
        
        <div className="stat-card">
          <h3>จำนวนบิลวันนี้</h3>
          <div className="stat-value">
            {stats?.total_orders_today || 0}
          </div>
        </div>
      </div>

      <div className="top-products">
        <h3>🏆 สินค้าขายดี (Top 5)</h3>
        {stats?.top_selling_products?.length > 0 ? (
          stats.top_selling_products.map((product, index) => (
            <div key={product.id} className="product-item">
              <span>
                {index + 1}. {product.name}
              </span>
              <span>
                ขายไป {product.total_sold} ชิ้น
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>ยังไม่มีข้อมูลการขาย</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
