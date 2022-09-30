<template>
  <div>

    <Jumbotrom>
      <template v-slot:action>
        <mdb-btn color="primary" @click.native="goToProductsList">Volver</mdb-btn>
      </template>
    </Jumbotrom>

    <div class="row mt-4 d-flex justify-content-center">
      <div class="col-md-8 bg-light p-4">
        <h1 class="text-center lead">Registro de productos</h1>
        <CardErrorValidation :error-messages="errors" v-if="errors.length"></CardErrorValidation>
        <formProduct @save="save"></formProduct>
      </div>
    </div>


  </div>
</template>

<script>
import Jumbotrom from "../../../components/Jumbotrom";
import formProduct from "./form"
import {mdbBtn} from 'mdbvue';
import CardErrorValidation from "../../../components/CardErrorValidation";

export default {
  name: "createPet",
  components: {
    formProduct,
    Jumbotrom,
    mdbBtn,
    CardErrorValidation
  },
  data() {
    return {
      show: false,
      errors: [],
    }
  },
  methods: {
    save(data) {
      this.addProduct(data).then(response => {
        this.$toast.success("Producto registrado correctamente");
        this.$router.push({name: 'pets'})
      });
    },
    async addProduct(data) {
      try {
        const response = await axios.post('/api/products', data);
        return Promise.resolve(response.data);
      } catch (e) {
        this.$toast.error("No se pudo registrar los datos");
        this.errors = Object.values(e.response.data.errors);
        return Promise.reject('danger');
      }

    },
    goToProductsList() {
      this.$router.push({name: 'products'})
    }
  }
}
</script>

<style scoped>

</style>
