import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space } from 'antd';
import { inventoryService } from '../services';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await inventoryService.getAll();
      setInventory(response.data);
    } catch (error) {
      message.error('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      if (editingItem) {
        await inventoryService.update(editingItem.id, values);
        message.success('Item updated successfully');
      } else {
        await inventoryService.create(values);
        message.success('Item created successfully');
      }
      setIsModalVisible(false);
      fetchInventory();
    } catch (error) {
      message.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const columns = [
    { title: 'Type', dataIndex: 'item_type', key: 'item_type' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Total Qty', dataIndex: 'total_quantity', key: 'total_quantity' },
    { title: 'Available', dataIndex: 'available_quantity', key: 'available_quantity' },
    { title: 'Cost Price', dataIndex: 'cost_price', key: 'cost_price' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Item
      </Button>
      <Table columns={columns} dataSource={inventory} loading={loading} rowKey="id" />
      <Modal
        title={editingItem ? 'Edit Item' : 'Add Item'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item label="Item Type" name="item_type" rules={[{ required: true }]}>
            <Select options={[{ value: 'hotel', label: 'Hotel' }, { value: 'transport', label: 'Transport' }, { value: 'guide', label: 'Guide' }]} />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Total Quantity" name="total_quantity" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Available Quantity" name="available_quantity" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Cost Price" name="cost_price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
