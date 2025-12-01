import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../api';
import '../Dashboard.css';

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
    <div className="dashboard-minimal">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Sales Overview</p>
      </div>

      <div className="stats-grid-minimal">
        <div className="stat-card-minimal">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value-minimal">
            ฿{stats?.total_sales_today?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
          </div>
          <div className="stat-trend">+12% from yesterday</div>
        </div>

        <div className="stat-card-minimal">
          <div className="stat-label">Orders</div>
          <div className="stat-value-minimal">
            {stats?.total_orders_today || 0}
          </div>
          <div className="stat-trend">Today</div>
        </div>

        <div className="stat-card-minimal">
          <div className="stat-label">Average Order</div>
          <div className="stat-value-minimal">
            ฿{stats?.total_orders_today > 0
              ? ((stats?.total_sales_today || 0) / stats.total_orders_today).toFixed(2)
              : '0.00'}
          </div>
          <div className="stat-trend">Per transaction</div>
        </div>
      </div>

      <div className="top-products-minimal">
        <div className="section-header">
          <h3>Top Selling Products</h3>
        </div>

        <div className="products-table">
          <div className="table-header">
            <div className="col-rank">#</div>
            <div className="col-name">Product</div>
            <div className="col-sold">Sold</div>
            <div className="col-revenue">Revenue</div>
          </div>

          {stats?.top_selling_products?.length > 0 ? (
            stats.top_selling_products.map((product, index) => (
              <div key={product.id} className="table-row">
                <div className="col-rank">
                  <span className={`rank-badge ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="col-name">{product.name}</div>
                <div className="col-sold">{product.total_sold} units</div>
                <div className="col-revenue">฿{(product.total_sold * (product.price || 0)).toFixed(2)}</div>
              </div>
            ))
          ) : (
            <div className="empty-state-minimal">
              <p>No sales data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
