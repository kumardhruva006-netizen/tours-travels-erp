import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, message, Space } from 'antd';
import { packageService } from '../services';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await packageService.getAll();
      setPackages(response.data);
    } catch (error) {
      message.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (pkg = null) => {
    setEditingPackage(pkg);
    if (pkg) {
      form.setFieldsValue(pkg);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      if (editingPackage) {
        await packageService.update(editingPackage.id, values);
        message.success('Package updated successfully');
      } else {
        await packageService.create(values);
        message.success('Package created successfully');
      }
      setIsModalVisible(false);
      fetchPackages();
    } catch (error) {
      message.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await packageService.delete(id);
      message.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      message.error('Failed to delete package');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'Days', dataIndex: 'days', key: 'days' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
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
        Add Package
      </Button>
      <Table columns={columns} dataSource={packages} loading={loading} rowKey="id" />
      <Modal
        title={editingPackage ? 'Edit Package' : 'Add Package'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Days" name="days" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Capacity" name="capacity" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Start Date" name="start_date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="End Date" name="end_date">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Packages;
