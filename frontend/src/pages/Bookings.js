import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space, DatePicker } from 'antd';
import { bookingService, customerService, packageService } from '../services';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, customersRes, packagesRes] = await Promise.all([
        bookingService.getAll(),
        customerService.getAll(),
        packageService.getAll(),
      ]);
      setBookings(bookingsRes.data);
      setCustomers(customersRes.data);
      setPackages(packagesRes.data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (booking = null) => {
    setEditingBooking(booking);
    if (booking) {
      form.setFieldsValue(booking);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      if (editingBooking) {
        await bookingService.update(editingBooking.id, values);
        message.success('Booking updated successfully');
      } else {
        await bookingService.create(values);
        message.success('Booking created successfully');
      }
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookingService.delete(id);
      message.success('Booking deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete booking');
    }
  };

  const columns = [
    { title: 'Customer', dataIndex: 'customer_name', key: 'customer_name' },
    { title: 'Package', dataIndex: 'package_name', key: 'package_name' },
    { title: 'Persons', dataIndex: 'no_of_persons', key: 'no_of_persons' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Booking
      </Button>
      <Table columns={columns} dataSource={bookings} loading={loading} rowKey="id" />
      <Modal
        title={editingBooking ? 'Edit Booking' : 'Add Booking'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item label="Customer" name="customer_id" rules={[{ required: true }]}>
            <Select placeholder="Select customer" options={customers.map(c => ({ value: c.id, label: c.name }))} />
          </Form.Item>
          <Form.Item label="Package" name="package_id" rules={[{ required: true }]}>
            <Select placeholder="Select package" options={packages.map(p => ({ value: p.id, label: p.name }))} />
          </Form.Item>
          <Form.Item label="Number of Persons" name="no_of_persons" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Booking Date" name="booking_date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select options={[{ value: 'pending', label: 'Pending' }, { value: 'confirmed', label: 'Confirmed' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bookings;
