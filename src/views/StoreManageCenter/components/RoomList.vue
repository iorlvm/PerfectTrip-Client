<template>
  <div>
    <header class="header">
      <h2>Existing Products</h2>
      <button @click="showModal = true" class="add-room-btn">Add New Product</button>
    </header>

    <div class="filter-section">
      <label for="filterType">Filter products by name</label>
      <select v-model="filterType" id="filterType">
        <option value="">Select a product to filter...</option>
        <option v-for="type in productTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="clearFilter" class="filter-btn">Clear Filter</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company ID</th>
          <th>Product Name</th>
          <th>Max Occupancy</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td>{{ product.companyId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.maxOccupancy }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button @click="editProduct(product)" class="edit-btn">View/Edit</button>
            <button @click="deleteProduct(product.productId)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="currentPage = page"
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </div>

    <!-- Modal for Add/Edit Product -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEditing ? 'Edit Product' : 'Add a New Product' }}</h2>
        <form @submit.prevent="isEditing ? updateProduct() : addProduct()">
          <div class="form-group">
            <label for="companyId">Company ID</label>
            <input type="number" v-model="currentProduct.companyId" id="companyId" required />
          </div>
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input type="text" v-model="currentProduct.productName" id="productName" required />
          </div>
          <div class="form-group">
            <label for="maxOccupancy">Max Occupancy</label>
            <input type="number" v-model="currentProduct.maxOccupancy" id="maxOccupancy" required />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" v-model="currentProduct.price" id="price" required />
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="number" v-model="currentProduct.stock" id="stock" required />
          </div>
          <button type="submit" class="save-btn">{{ isEditing ? 'Update Product' : 'Save Product' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { addProductAPI } from '@/apis/product';
import { ref, reactive, computed, onMounted } from 'vue';

// Modal state and new product form data
const showModal = ref(false);
const isEditing = ref(false); // 是否處於編輯模式
const currentProduct = reactive({
  companyId: '',
  productName: '',
  maxOccupancy: '',
  price: '',
  stock: '',
  productId: null, // 用來存儲正在編輯的產品的ID
});

const products = ref([]);  // 用來存放從後端獲取的產品數據

// 在組件加載時，從後端撈取所有產品
onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:8080/product/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer admin`  // 添加token到請求頭部
      }
    });
    if (response.ok) {
      const data = await response.json();
      products.value = data;  // 將數據存入 products 中
    } else {
      console.error('產品選取失敗');
    }
  } catch (error) {
    console.error('選取產品的時候發生錯誤:', error);
  }
});

// Product filtering
const productTypes = ref(['Default Product Name', 'Sample Product']);
const filterType = ref('');

// Pagination logic
const currentPage = ref(1);
const productsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / productsPerPage);
});

const filteredProducts = computed(() => {
  if (filterType.value) {
    return products.value.filter(product => product.productName === filterType.value);
  }
  return products.value;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage;
  const end = start + productsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Add Product
const addProduct = async () => {
  const response = await addProductAPI({
    companyId: currentProduct.companyId,
    productName: currentProduct.productName,
    maxOccupancy: currentProduct.maxOccupancy,
    price: currentProduct.price,
    stock: currentProduct.stock,
  })
  const data = await response.data;
  if (response.success) {
    products.value.push({
      productId: data.productId,
      companyId: data.companyId,
      productName: data.productName,
      maxOccupancy: data.maxOccupancy,
      price: data.price,
      stock: data.stock,
    });
    resetForm();
    showModal.value = false;
    console.log(response);
    //   const token = localStorage.getItem('authToken');

    //   try {
    //     const response = await fetch('http://localhost:8080/product/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer admin`
    //       },
    //       body: JSON.stringify(formData),
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //       products.value.push({
    //         productId: data.productId,
    //         companyId: data.companyId,
    //         productName: data.productName,
    //         maxOccupancy: data.maxOccupancy,
    //         price: data.price,
    //         stock: data.stock,
    //       });
    //       resetForm();
    //       showModal.value = false;
    //     } else {
    //       console.error('Error adding product:', data);
    //     }
    //   } catch (error) {
    //     console.error('Error adding product:', error);
  }
};

// Update Product
const updateProduct = async () => {
  const formData = new FormData();
  formData.append('productName', currentProduct.productName);
  formData.append('roomPrice', currentProduct.price);
  formData.append('maxOccupancy', currentProduct.maxOccupancy || 0);
  formData.append('stock', currentProduct.stock);
  if (currentProduct.photo) {
    formData.append('photo', currentProduct.photo);
  }

  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch(`http://localhost:8080/product/update/${currentProduct.productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer admin`,
      },
      body: formData,
    });

    if (response.ok) {
      // 更新成功的處理
      const updatedProduct = await response.json();
      console.log('產品已更新:', updatedProduct);
    } else {
      console.error('更新產品失敗');
    }
  } catch (error) {
    console.error('更新產品時發生錯誤:', error);
  }
};


// Edit Product: 打開燈箱，並載入選中的產品數據
const editProduct = (product) => {
  isEditing.value = true;
  currentProduct.companyId = product.companyId;
  currentProduct.productName = product.productName;
  currentProduct.maxOccupancy = product.maxOccupancy;
  currentProduct.price = product.price;
  currentProduct.stock = product.stock;
  currentProduct.productId = product.productId;
  showModal.value = true;
};

// Reset form after product is added
const resetForm = () => {
  currentProduct.companyId = '';
  currentProduct.productName = '';
  currentProduct.maxOccupancy = '';
  currentProduct.price = '';
  currentProduct.stock = '';
  currentProduct.productId = null;
  isEditing.value = false;
};

// Close modal
const closeModal = () => {
  resetForm();
  showModal.value = false;
};

// Clear filter
const clearFilter = () => {
  filterType.value = '';
};

// Delete product
const deleteProduct = async (productId) => {
  const confirmed = confirm("確定要刪除這個產品嗎？");

  if (!confirmed) return;

  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch(`http://localhost:8080/product/delete/room/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer admin`,
      }
    });

    if (response.ok) {
      products.value = products.value.filter(product => product.productId !== productId);
      console.log(`產品ID ${productId} 已成功刪除`);
    } else {
      console.error('刪除產品失敗');
    }
  } catch (error) {
    console.error('刪除產品時發生錯誤:', error);
  }
};
</script>




<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-room-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-room-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filter-btn {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.filter-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

table thead {
  background-color: #007bff;
  color: #fff;
  text-align: left;
}

table th,
table td {
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}

table th {
  font-weight: 600;
}

table tr:hover {
  background-color: #f0f4ff;
}

table td {
  color: #495057;
}

table td button {
  margin-right: 5px;
  padding: 8px 12px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

table td button:hover {
  background-color: #5a6268;
}

table td button:last-child {
  margin-right: 0;
  background-color: mediumblue
}

table td button:last-child:hover {
  background-color: mediumblue;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.pagination button.active {
  background-color: #0056b3;
}

.pagination button:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.modal h2 {
  margin-bottom: 20px;
  color: #495057;
  font-size: 24px;
  font-weight: 600;
}

.modal .form-group {
  margin-bottom: 15px;
}

.modal .form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.modal .form-group input[type="text"],
.modal .form-group input[type="number"] {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 16px;
  color: #495057;
}

.modal .save-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.modal .save-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
</style>
