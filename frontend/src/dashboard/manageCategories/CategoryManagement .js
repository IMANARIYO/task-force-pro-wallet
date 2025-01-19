import * as subcategoryService from "../../services/subcategoryService";
import CategoryModal from "./CategoryModal";
import CategoryTable from "./CategoryTable";
import DefaultLayout from "../../components/DefaultLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Modal, Table, message } from "antd";
import { fetchCategoryById } from "../../services/categories";

// Import statements

const CategoryManagement = () => {
  // State Management
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  
  // Modal visibility states
  const [showModal, setShowModal] = useState(false);
  const [subcatListModalVisible, setSubcatListModalVisible] = useState(false);
  const [subcatFormModalVisible, setSubcatFormModalVisible] = useState(false);
  
  // Form states
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [subcategoryData, setSubcategoryData] = useState({
    name: '',
    budgetAmount: 0,
    currentSpending: 0,
    description: ''
  });

  // API Configuration
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  // Category CRUD Operations
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/listCategories`
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
      message.error('Failed to fetch categories!');
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsAdd(true);
    setIsUpdate(false);
    setShowModal(true);
  };

  const handleEdit = category => {
    setSelectedCategory(category);
    setIsAdd(false);
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDelete = async id => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/delete/${id}`
      );
      fetchCategories();
      message.success('Category deleted successfully!');
    } catch (error) {
      console.error('Failed to delete category', error);
      message.error('Failed to delete category!');
    }
  };

  const handleSave = async categoryData => {
    try {
      if (isUpdate && selectedCategory) {
        await axiosInstance.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories/update/${selectedCategory._id}`,
          categoryData
        );
      } else {
        await axiosInstance.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories/add`,
          categoryData
        );
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category', error);
      message.error('Failed to save category!');
    }
  };

  // Subcategory CRUD Operations
  const handleAddSubcategory = async () => {
    try {
      if (!selectedCategory._id) {
        message.error('Please select a category first!');
        return;
      }

      if (!subcategoryData.name || !subcategoryData.budgetAmount) {
        message.error('Name and budget amount are required!');
        return;
      }

      await subcategoryService.addSubcategory(selectedCategory._id, subcategoryData);
      message.success('Subcategory added successfully!');
      handleSubcategoryFormModalClose();
      await handleView(selectedCategory);
    } catch (error) {
      console.error('Failed to add subcategory', error);
      message.error('Failed to add subcategory!');
    }
  };

  const handleUpdateSubcategory = async () => {
    try {
      if (!selectedCategory?._id || !currentSubcategory?._id) {
        message.error('Invalid category or subcategory!');
        return;
      }

      if (!subcategoryData.name || !subcategoryData.budgetAmount) {
        message.error('Name and budget amount are required!');
        return;
      }

      await subcategoryService.updateSubcategory(
        selectedCategory._id, 
        currentSubcategory._id, 
        subcategoryData
      );
      
      message.success('Subcategory updated successfully!');
      handleSubcategoryFormModalClose();
      await handleView(selectedCategory);
    } catch (error) {
      console.error('Failed to update subcategory', error);
      message.error('Failed to update subcategory!');
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      if (!selectedCategory?._id) {
        message.error('Invalid category!');
        return;
      }

      await subcategoryService.deleteSubcategory(subcategoryId);
      message.success('Subcategory deleted successfully!');
      await handleView(selectedCategory);
    } catch (error) {
      console.error('Failed to delete subcategory', error);
      message.error('Failed to delete subcategory!');
    }
  };

  // Modal Handlers
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setIsView(false);
  };

  const handleSubcategoryFormModalClose = () => {
    setSubcatFormModalVisible(false);
    resetFormStates();
  };

  const handleAddNewSubcategory = () => {
    if (!selectedCategory) {
      message.error('Please select a category first!');
      return;
    }
    resetFormStates();
    setSubcatFormModalVisible(true);
  };

  const handleSubcategoryEdit = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setSubcategoryData({
      name: subcategory.name,
      budgetAmount: subcategory.budgetAmount,
      currentSpending: subcategory.currentSpending,
      description: subcategory.description || ''
    });
    setSubcatFormModalVisible(true);
  };

  // Utility Functions
  const resetFormStates = () => {
    setSubcategoryData({
      name: '',
      budgetAmount: 0,
      currentSpending: 0,
      description: ''
    });
    setCurrentSubcategory(null);
  };

  const handleView = async category => {
    try {
   
      const categoryData = await fetchCategoryById(category._id);
      const subcategories=await subcategoryService.getSubcategories(category._id);

      setSelectedCategory(categoryData);
      
      setSubcategories(subcategories || []);
      setSubcatListModalVisible(true);
    } catch (error) {
      console.error('Failed to fetch category', error);
      message.error('Failed to fetch category!');
      setSelectedCategory(null);
      setSubcategories([]);
    }
  };

  // Table Configurations
  const subcategoryColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { 
      title: 'Budget Amount', 
      dataIndex: 'budgetAmount', 
      key: 'budgetAmount',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    { 
      title: 'Current Spending', 
      dataIndex: 'currentSpending', 
      key: 'currentSpending',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button 
            onClick={() => handleSubcategoryEdit(record)} 
            style={{ marginRight: 8 }}
            type="primary"
          >
            Edit
          </Button>
          <Button 
            onClick={() => handleDeleteSubcategory(record._id)} 
            danger
          >
            Delete
          </Button>
        </span>
      )
    }
  ];

  // Effects
  useEffect(() => {
    fetchCategories();
  }, []);

  // Render
  return (
    <DefaultLayout>
      <div className='category-management'>
        <h1>Category Management</h1>
        
        {/* Add Category Button */}
        <div style={{ marginBottom: '16px', textAlign: 'right' }}>
          <Button type='primary' onClick={handleAdd}>
            Add Category
          </Button>
        </div>

        {/* Category Table */}
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        {/* Category Modal */}
        <CategoryModal
          show={showModal}
          isAdd={isAdd}
          isUpdate={isUpdate}
          category={selectedCategory}
          onClose={handleModalClose}
          onSave={handleSave}
        />

        {/* Subcategories List Modal */}
        <Modal
          title={`${selectedCategory?.name } Subcategories`}
          open={subcatListModalVisible}
          onCancel={() => setSubcatListModalVisible(false)}
          width={1000}
          footer={[
            <Button 
              key="add" 
              type="primary" 
              onClick={handleAddNewSubcategory}
            >
              Add New Subcategory
            </Button>,
            <Button 
              key="close" 
              onClick={() => setSubcatListModalVisible(false)}
            >
              Close
            </Button>
          ]}
        >
          <Table 
            columns={subcategoryColumns} 
            dataSource={subcategories} 
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Modal>

        {/* Subcategory Form Modal */}
        <Modal
          title={currentSubcategory ? "Edit Subcategory" : "Add Subcategory"}
          open={subcatFormModalVisible}
          onCancel={handleSubcategoryFormModalClose}
          footer={[
            <Button key="cancel" onClick={handleSubcategoryFormModalClose}>
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              onClick={currentSubcategory ? handleUpdateSubcategory : handleAddSubcategory}
            >
              {currentSubcategory ? 'Update' : 'Add'}
            </Button>
          ]}
          maskClosable={false}
          closable={true}
          centered
        >
          <div className="space-y-4">
            <div>
              <label>Subcategory Name</label>
              <Input
                placeholder="Subcategory Name"
                value={subcategoryData.name}
                onChange={(e) => setSubcategoryData({ ...subcategoryData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label>Budget Amount</label>
              <Input
                placeholder="Budget Amount"
                type="number"
                value={subcategoryData.budgetAmount}
                onChange={(e) => setSubcategoryData({ 
                  ...subcategoryData, 
                  budgetAmount: parseFloat(e.target.value) || 0 
                })}
              />
            </div>
            
            <div>
              <label>Current Spending</label>
              <Input
                placeholder="Current Spending"
                type="number"
                value={subcategoryData.currentSpending}
                onChange={(e) => setSubcategoryData({ 
                  ...subcategoryData, 
                  currentSpending: parseFloat(e.target.value) || 0 
                })}
              />
            </div>
            
            <div>
              <label>Description</label>
              <Input.TextArea
                placeholder="Description"
                value={subcategoryData.description}
                onChange={(e) => setSubcategoryData({ 
                  ...subcategoryData, 
                  description: e.target.value 
                })}
                rows={4}
              />
            </div>
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default CategoryManagement;