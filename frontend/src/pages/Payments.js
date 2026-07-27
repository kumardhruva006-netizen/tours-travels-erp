import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space } from 'antd';
import { paymentService, bookingService } from '../services';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [paymentsRes, bookingsRes] = await Promise.all([
        paymentService.getAll(),
        bookingService.getAll(),
      ]);
      setPayments(paymentsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async (values) => {
    try {
      await paymentService.create(values);
      message.success('Payment recorded successfully');
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const columns = [
    { title: 'Customer', dataIndex: 'customer_name', key: 'customer_name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Method', dataIndex: 'payment_method', key: 'payment_method' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'created_at', key: 'created_at' },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => { form.resetFields(); setIsModalVisible(true); }} style={{ marginBottom: 16 }}>
        Add Payment
      </Button>
      <Table columns={columns} dataSource={payments} loading={loading} rowKey="id" />
      <Modal
        title="Record Payment"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item label="Booking" name="booking_id" rules={[{ required: true }]}>
            <Select placeholder="Select booking" options={bookings.map(b => ({ value: b.id, label: `${b.customer_name} - ${b.package_name}` }))} />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Payment Method" name="payment_method" rules={[{ required: true }]}>
            <Select options={[{ value: 'credit_card', label: 'Credit Card' }, { value: 'debit_card', label: 'Debit Card' }, { value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'cash', label: 'Cash' }]} />
          </Form.Item>
          <Form.Item label="Transaction ID" name="transaction_id">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
