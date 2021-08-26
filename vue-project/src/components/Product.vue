<template>
  <div class="product">
    <div class="container py-3">
      <div class="d-flex justify-content-end pb-3"> 
        <button class="btn btn-outline-success mx-3" @click="()=>{addModal=true}">新增</button>
        <button class="btn btn-outline-danger mx-3" @click="deleteData()" >刪除</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">序號</th>
            <th scope="col">商品編號</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品價錢</th>
            <th scope="col">商品數量</th>
            <th scope="col">商品明細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productList" :key="index">
            <td><input class="form-check-input" type="checkbox" :value="index" v-model="deleteIndex"></td>
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ product.productId }}</td>
            <td>{{ product.productName }}</td>
            <td>{{ product.productPrice }}</td>
            <td>{{ product.productQty }}</td>
            <td><button class="btn" @click="getDtData(product.productId)">明細</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="dtModal"  class="su-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{isModify ? "修改商品":"商品名細"}}</h4>
            <button type="button" class="btn-close" @click="() => {dtModal=false}"></button>
          </div>
          <div class="modal-body">

            <div class="d-flex mb-2">    
              <label for="productId" class="col-form-label">產品編號：</label>
              <input type="text" readonly="true" class="form-control-plaintext w-50" id="productId" v-model="productDt.productId">
            </div>
            <div class="d-flex mb-2">
              <label for="productName" class="col-form-label">產品名稱：</label>
              <input type="text" :readonly="!isModify" :class="modifyInputClass()" id="productName" v-model="productDt.productName">
            </div>
            <div>
              <div class="d-flex mb-2">
                <label for="productPrice" class="col-form-label">產品價錢：</label>
                <input type="text" :readonly="!isModify" :class="modifyInputClass()" id="productPrice" v-model="productDt.productPrice">
              </div>
              <div class="d-flex mb-2">
                <label for="productQty" class="col-form-label">產品數量：</label>
                <input type="text" :readonly="!isModify" :class="modifyInputClass()" id="productQty" v-model="productDt.productQty">
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="()=> {dtModal = false}">關閉</button>
            <button type="button" class="btn btn-primary" @click="modify()">{{isModify ? "確定":"修改"}}</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="addModal"  class="su-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">新增商品</h4>
            <button type="button" class="btn-close" @click="()=> {addModal = false}"></button>
          </div>
          <div class="modal-body">

            <div class="d-flex mb-2">
              <label for="productName" class="col-form-label">產品名稱：</label>
              <input type="text" class="form-control w-50" id="productName" v-model="addProduct.productName">
            </div>
            <div>
              <div class="d-flex mb-2">
                <label for="productPrice" class="col-form-label">產品價錢：</label>
                <input type="text" class="form-control w-50" id="productPrice" v-model="addProduct.productPrice">
              </div>
              <div class="d-flex mb-2">
                <label for="productQty" class="col-form-label">產品數量：</label>
                <input type="text" class="form-control w-50" id="productQty" v-model="addProduct.productQty">
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="()=> {addModal = false}">關閉</button>
            <button type="button" class="btn btn-primary" @click="add()">新增</button>
          </div>
        </div>
      </div>
    </div>

    

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getProductList,getProduct,updateProduct,addProduct,deleteProduct } from "@/axios/axios"

export default defineComponent({
  name: "product",
  async mounted() {
    try {
      this.productList = (await getProductList()).data;
    }catch(e){
      console.log(e);
    }
  },
  data: () => {
    return { productList: {}, 
             productDt: {}, 
             addProduct: {
               peoductId :'',
               productName:'',
               productPrice:'',
               productQty:'',
             },
             deleteIndex:[], 
             isModify: false,
             addModal:false,
             dtModal:false };
  },
  methods : {
    modifyInputClass() {
      if(this.isModify){
         return 'form-control w-50';
      } else {
        return 'form-control-plaintext w-50';
      }
    },
    async getDtData(id:string) {
      try {
        this.dtModal = true;
        this.isModify = false;
        this.productDt = (await getProduct(id)).data;
      }catch(e){
        console.log(e);
      }     
    },
    async modify() {
      if(this.isModify) {
        try {
          await updateProduct(this.productDt);
          this.productList = (await getProductList()).data;
          alert("更新成功");
          this.dtModal = false;
        }catch(e){
          console.log(e);
        }
      } else {
        this.isModify = !this.isModify;
      }
    },
    async add() {
      try {
        await addProduct(this.addProduct);
        this.productList = (await getProductList()).data;
        alert("新增成功");
        this.addModal = false;
      }catch(e){
        console.log(e);
      }
    },
    async deleteData() {
      try {
        let deleteProductDtos = this.deleteIndex.map(index => {
          return this.productList[index];
        })
        deleteProduct(deleteProductDtos);
      }catch(e){
        console.log(e);
      }
    },

  }
});
</script>

<style scoped lang="scss">
.su-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1055;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
}

.modal-body {
  font-size: 1.25em;
}

</style>