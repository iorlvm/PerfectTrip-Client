<script setup>
import { addProductAPI, getAllProductsAPI, updateRoomAPI, deleteProductAPI, getFacilitiesAPI } from '@/apis/product';
import { ref, reactive, computed, onMounted } from 'vue';
import { imageUpdateAPI } from '@/apis/image';

// Modal state and new product form data
const showModal = ref(false);
const isEditing = ref(false);
const currentProduct = reactive({
  productId: null,
  productName: '',
  maxOccupancy: '',
  price: '',
  stock: '',
  productPhotos: [],
  productDetails:
  {
    includesBreakfast: false,
    allowDateChanges: false,
    isRefundable: false,
    allowFreeCancellation: false
  }
});

const facilities = ref([]);
const products = ref([]);
const facilityCheckList = ref([]);

onMounted(async () => {
  try {
    const response = await getAllProductsAPI();
    if (response.success) {
      products.value = response.data;
    } else {
      console.error('產品獲取失敗');
    }
  } catch (error) {
    console.error('產品獲取發生錯誤', error);
  }

  const res = await getFacilitiesAPI();

  facilities.value = res.data;
});

const productTypes = ref(['單人房', '雙人房']);
const filterType = ref('');

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

const baseURL = 'http://localhost:8080/';
const photoList = computed(() => {
  return currentProduct.productPhotos.map(photo => ({
    name: photo.description,
    url: baseURL + photo.photoUrl,
  })) || [];
})

const customUpload = async ({ file }) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('cacheEnabled', false);
  formData.append('resizeEnabled', true);
  formData.append('width', 1200);
  formData.append('height', 900);

  const res = await imageUpdateAPI(formData);

  console.log(res);
  const count = currentProduct.productPhotos.length + 1;
  currentProduct.productPhotos.push(
    {
      photoUrl: res.data,
      description: '房間照片' + count
    }
  )
};

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage;
  const end = start + productsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Add Product
const addProduct = async () => {
  const response = await addProductAPI({
    productName: currentProduct.productName,
    maxOccupancy: currentProduct.maxOccupancy,
    price: currentProduct.price,
    stock: currentProduct.stock,
    productPhotos: currentProduct.productPhotos,
    productFacilities: facilityCheckList.value.map(value => ({ facilityId: value })),
    productDetails: currentProduct.productDetails
  });
  const data = await response.data;
  if (response.success) {
    products.value.push({
      productId: data.productId,
      productName: data.productName,
      maxOccupancy: data.maxOccupancy,
      price: data.price,
      stock: data.stock,
    });
    resetForm();
    showModal.value = false;
    console.log(response);
  }
};

// Update Product
const updateProduct = async () => {
  try {
    const response = await updateRoomAPI({
      roomId: currentProduct.productId,
      productName: currentProduct.productName,
      roomPrice: currentProduct.price,
      stock: currentProduct.stock,
      photo: currentProduct.photo,
    });

    if (response.success) {
      const updatedProduct = response.data;
      console.log('產品已經更新', updatedProduct);
    } else {
      console.error('更新產品失敗');
    }
  } catch (error) {
    console.error('更新產品時發生錯誤', error);
  }
};

const editProduct = (product) => {
  isEditing.value = true;
  currentProduct.productName = product.productName;
  currentProduct.maxOccupancy = product.maxOccupancy;
  currentProduct.price = product.price;
  currentProduct.stock = product.stock;
  currentProduct.productId = product.productId;
  showModal.value = true;
};


const resetForm = () => {
  currentProduct.productName = '';
  currentProduct.maxOccupancy = '';
  currentProduct.price = '';
  currentProduct.stock = '';
  currentProduct.productId = null;
  isEditing.value = false;
  facilityCheckList.value = [];
  currentProduct.productDetails = {
    includesBreakfast: false,
    allowDateChanges: false,
    isRefundable: false,
    allowFreeCancellation: false
  };
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
  const confirmed = confirm("確定刪除嗎？");

  if (!confirmed) return;

  try {
    const response = await deleteProductAPI(productId);

    if (response.success) {
      products.value = products.value.filter(product => product.productId !== productId);
      console.log(`產品ID ${productId} 已刪除成功`);
    } else {
      console.error('產品刪除失敗');
    }
  } catch (error) {
    console.error('產品刪除時發生錯誤', error);
  }
};
</script>

<template>
  <el-Scrollbar>
    <header class="header">
      <h2>現存商品列表</h2>
      <button @click="showModal = true" class="add-room-btn">新增一個商品</button>
    </header>

    <div class="filter-section">
      <label for="filterType">商品名稱篩選器</label>
      <select v-model="filterType" id="filterType">
        <option value="">篩選中...</option>
        <option v-for="type in productTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="clearFilter" class="filter-btn">清除篩選</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Max Occupancy</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.productId">
          <td>{{ product.productId }}</td>
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
        <el-Scrollbar>
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ isEditing ? 'Edit Product' : 'Add a New Product' }}</h2>
          <form class="form" @submit.prevent="isEditing ? updateProduct() : addProduct()">
            <div class="form-group full">
              <label for="productName">商品照片</label>
              <el-upload v-model:file-list="photoList" :http-request="customUpload" list-type="picture-card"
                :on-remove="handleRemove">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
            <div class="form-group half">
              <label for="productName">商品名稱</label>
              <input type="text" v-model="currentProduct.productName" id="productName" required />
            </div>
            <div class="form-group half">
              <label for="maxOccupancy">入住人數</label>
              <input type="number" v-model="currentProduct.maxOccupancy" id="maxOccupancy" required />
            </div>
            <div class="form-group half">
              <label for="price">價格</label>
              <input type="number" v-model="currentProduct.price" id="price" required />
            </div>
            <div class="form-group half">
              <label for="stock">庫存</label>
              <input type="number" v-model="currentProduct.stock" id="stock" required />
            </div>
            <div class="form-group full">
              <label>設施</label>
              <el-checkbox-group v-model="facilityCheckList" class="flex">
                <el-checkbox :label="facility.facilityName" :value="facility.facilityId" size="small"
                  v-for="(facility, index) in facilities" :key="index" />
              </el-checkbox-group>
            </div>
            <div class="form-group full">
              <label>服務</label>
              <div class="flex">
                <el-checkbox label="包含早餐" v-model="currentProduct.productDetails.includesBreakfast" size="small" />
                <el-checkbox label="允許更改日期" v-model="currentProduct.productDetails.allowDateChanges" size="small" />
                <el-checkbox label="允許免費取消" v-model="currentProduct.productDetails.allowFreeCancellation"
                  size="small" />
                <el-checkbox label="可退款" v-model="currentProduct.productDetails.isRefundable" size="small" />
              </div>
            </div>
            <button type="submit" class="save-btn">{{ isEditing ? 'Update Product' : 'Save Product' }}</button>
          </form>
        </el-Scrollbar>
      </div>
    </div>
  </el-Scrollbar>
</template>

<style scoped>
.el-scrollbar {
  padding: 10px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

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
  margin: 20px;
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
  padding: 15px 20px;
  border-radius: 8px;
  max-width: 550px;
  width: 100%;
  height: 95vh;
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
  margin-bottom: 15px;
  color: #495057;
  font-size: 20px;
  font-weight: 600;
}

.form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
}

.full {
  width: 100%;
}

.half {
  width: 48%;
}

.modal .form-group {
  margin-bottom: 10px;
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
