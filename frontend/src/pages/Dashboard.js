import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Loading } from 'antd';
import { reportService } from '../services';
import { DollarOutlined, ShoppingOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    customers: 0,
    bookings: 0,
    packages: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [revenue, customers, bookings] = await Promise.all([
        reportService.getRevenue(),
        reportService.getCustomerStats(),
        reportService.getBookingStats(),
      ]);
      setStats({
        revenue: revenue.data?.total_revenue || 0,
        customers: customers.data?.total_customers || 0,
        bookings: bookings.data?.length || 0,
        packages: 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic title="Total Revenue" value={stats.revenue} prefix="$" valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic title="Total Customers" value={stats.customers} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic title="Total Bookings" value={stats.bookings} prefix={<ShoppingOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic title="Active Packages" value={10} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
