<template>
  <div>

    <Jumbotrom>
      <template v-slot:action>
        <mdb-btn color="primary" @click="goToProductForm">Registrar producto</mdb-btn>
      </template>
    </Jumbotrom>

    <mdb-container>
      <mdb-row>

        <mdb-col col="12" class="text-center mt-4">
          <mdb-btn-group>
            <mdb-btn color="success" @click="searchByStatus('activo')">Activo</mdb-btn>
            <mdb-btn color="danger" @click="searchByStatus('inactivo')">Inactivo</mdb-btn>
            <mdb-btn color="primary" @click="getProducts()">Todos</mdb-btn>
          </mdb-btn-group>
        </mdb-col>

        <mdb-col v-for="product in products" :key="product.id" col="4" class="mt-5">
          <productDetails @updateList="updateList" class="mt-4" :product="product"/>
        </mdb-col>
      </mdb-row>
    </mdb-container>


  </div>

</template>

<script>
import {mdbContainer, mdbRow, mdbCol, mdbBtn, mdbBtnGroup} from 'mdbvue';
import productDetails from "./details";
import Jumbotrom from './../../../components/Jumbotrom'

export default {
  name: "index",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    productDetails,
    mdbBtn,
    mdbBtnGroup,
    Jumbotrom
  },
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
      modal: false,
      show: true
    }
  },
  methods: {
    async getProducts() {
      const response = await axios.get('/api/products');
      this.products = response.data
    },
    async goToProductForm() {
      this.$router.push({name: 'add-product'});
    },
    updateList() {
      this.getProducts();
    },
    async searchByStatus(status) {
      const response = await axios.get('/api/products/findByStatus', {params: {status}});
      this.products = response.data;
    }
  }
}
</script>

<style scoped>


.placement {
  position: absolute;
  right: 0;
}
</style>
