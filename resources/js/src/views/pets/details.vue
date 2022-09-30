<template>
  <div>
    <mdb-card>
      <mdb-card-image :src="`/storage/products/${product.file}`"></mdb-card-image>
      <mdb-card-body>
        <mdb-card-title><b>Nombre:</b> {{ product.name }}</mdb-card-title>
        <mdb-btn size="sm" :color="product.status | statusColors">{{ product.status }}</mdb-btn>
        <p class="my-2 text-justify"><b>Observaciones</b> {{ product.observations}}</p>
        <p class="m-0"><b>Precio</b> {{ product.price}}</p>
        <p class="m-0"><b>Impuesto</b> {{ product.tax}}</p>
        <p class="m-0"><b>Cantidad</b> {{ product.amount}}</p>
        <hr>
        <p class="lead">Acciones</p>
        <mdb-btn-group>
          <mdb-btn @click="editProduct(product)" color="primary" size="sm">Editar</mdb-btn>
          <mdb-btn @click="modalDeleteProduct(product.id)" color="danger" size="sm">Eliminar</mdb-btn>
        </mdb-btn-group>
      </mdb-card-body>
    </mdb-card>

    <!--============================
        MODAL PET
    ==============================-->
    <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>Formulario productos</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <CardErrorValidation v-if="errors.length" :error-messages="errors"></CardErrorValidation>
        <formProduct :product="productDraf" @save="save"></formProduct>
      </mdb-modal-body>
    </mdb-modal>


    <!--============================
        MODAL DELETE PET
    ==============================-->
    <mdb-modal :show="modalDelete" @close="modalDelete = false" danger>
      <mdb-modal-header>
        <mdb-modal-title>Eliminar producto</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <p class="lead">¿ Esta seguro que desea eliminar el producto?</p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="danger" @click="deleteProduct()">Eliminar
          <mdb-icon icon="gem" far class="ml-1" color="white"/>
        </mdb-btn>
        <mdb-btn outline="danger" @click="modalDelete = false">Cancelar</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>


  </div>
</template>

<script>

import CardErrorValidation from "../../../components/CardErrorValidation";
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
  mdbBadge,
  mdbBtnGroup,
  mdbIcon,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter
} from 'mdbvue';
import formProduct from './form';

export default {
  name: "ProductDetails",
  props: ['product'],
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbBtn,
    mdbBadge,
    mdbBtnGroup,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbIcon,
    formProduct,
    CardErrorValidation
  },
  created() {
    this.errors = []
  },
  data() {
    return {
      productDraf: null,
      productId: '',
      modal: false,
      modalDelete: false,
      errors: []
    }
  },
  methods: {
    editProduct(product) {
      this.modal = true;
      this.productDraf = JSON.parse(JSON.stringify(product));
    },
    save(data) {
      this.updateProduct(data).then(response => {
        this.$emit('updateList', true)
        this.$toast.success("Producto actualizado correctamente");
        this.modal = false;
      });
    },
    async updateProduct(data) {
      try {
        data.append('_method', 'PUT')
        const response = await axios.post('/api/products/' + data.get('id'), data);
        return Promise.resolve(response.data);
      } catch (e) {
        this.$toast.error("No se pudo registrar los datos");
        this.errors = Object.values(e.response.data.errors);
        return Promise.reject('danger');
      }

    },
    modalDeleteProduct(petId) {
      this.productId = petId;
      this.modalDelete = true;
    },
    async deleteProduct() {
      await axios.delete('/api/products/' + this.productId);
      this.$emit('updateList', true)
      this.modalDelete = false;
    },
    toGoDetails() {
      this.$router.push({name: 'product-details', params: {id: this.product.id}})
    }
  },
  filters: {
    statusColors(value) {
      let color = "";
      if (value == 'activo') {
        color = 'success';
      } else if (value == 'inactivo') {
        color = 'danger';
      }
      return color
    }
  }
}
</script>

<style scoped>

</style>
