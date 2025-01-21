import * as categoryService from "../../services/categoryService";
import * as subcategoryService from "../../services/subcategoryService";
import CategoryModal from "./CategoryModal";
import CategoryTable from "./CategoryTable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Modal, Table, message } from "antd";
import { fetchCategoryById } from "../../services/categories";

 

const CategoryManagement = () => {
   
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  
   
  const [showModal, setShowModal] = useState(false);
  const [subcatListModalVisible, setSubcatListModalVisible] = useState(false);
  const [subcatFormModalVisible, setSubcatFormModalVisible] = useState(false);
  
   
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [subcategoryData, setSubcategoryData] = useState({
    name: '',
    budgetAmount: 0,
    currentSpending: 0,
    description: ''
  });
const fetchCategories = async () => {
    try {
      const categories = await categoryService.fetchCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Failed to fetch categories', error);

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
const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
 
    } catch (error) {
      console.error('Failed to delete category', error);
    
    }
  };


  const handleSave = async categoryData => {
    try {
      if (isUpdate && selectedCategory) {
        await categoryService.updateCategory(selectedCategory._id, categoryData);
      } else {
await categoryService.addCategory(categoryData);
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
     console.log('Failed to save category', error);
     
    }
  };

   
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
     
      handleSubcategoryFormModalClose();
      await handleView(selectedCategory);
    } catch (error) {
      console.error('Failed to add subcategory', error);
 
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
      
    
      handleSubcategoryFormModalClose();
      await handleView(selectedCategory);
    } catch (error) {
      console.log('Failed to update subcategory', error);
   
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      if (!selectedCategory?._id) {
        message.error('Invalid category!');
        return;
      }

      await subcategoryService.deleteSubcategory(subcategoryId);

      await handleView(selectedCategory);
    } catch (error) {
      console.error('Failed to delete subcategory', error);

    }
  };

   
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setIsView(false);
  };

  const handleSubcategoryFormModalClose = () => {
    setSubcatFormModalVisible(false);
    resetFormStates();
     fetchCategories(); 
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

      setSelectedCategory(null);
      setSubcategories([]);
    }
  };

   
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

   
  useEffect(() => {
    fetchCategories();
  }, []);

   
  return (

      <div className='category-management'>
        <h1>Category Management</h1>
        

        <div style={{ marginBottom: '16px', textAlign: 'right' }}>
          <Button type='primary' onClick={handleAdd}>
            Add Category
          </Button>
        </div>

   
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        <CategoryModal
          show={showModal}
          isAdd={isAdd}
          isUpdate={isUpdate}
          category={selectedCategory}
          onClose={handleModalClose}
          onSave={handleSave}
        />

 
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
  
  );
};

export default CategoryManagement;