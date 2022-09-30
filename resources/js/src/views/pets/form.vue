<template>
  <form class="needs-validation" novalidate @submit.prevent="save">
    <div class="grey-text">


      <div class="form-group">
        <label for="reference" class="grey-text">Referencia</label>
        <input type="number" id="reference" v-model="payload.reference" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>

      <div class="form-group">
        <label for="name" class="grey-text">Nombre</label>
        <input type="text" id="name" v-model="payload.name" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>

      <div class="form-group">
        <label class="grey-text">Estado</label>
        <select class="browser-default custom-select" v-model="payload.status" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>


      <div class="form-group">
        <label for="observations" class="grey-text">Observaciones</label>
        <input type="text" id="observations" v-model="payload.observations" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>

      <div class="form-group">
        <label for="price" class="grey-text">Precio</label>
        <input type="number" step="0.01" id="price" v-model="payload.price" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>


      <div class="form-group">
        <label for="tax" class="grey-text">Impuesto</label>
        <input type="number" id="tax" v-model="payload.tax" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>


      <div class="form-group">
        <label for="amount" class="grey-text">Cantidad</label>
        <input type="number" id="amount" v-model="payload.amount" required class="form-control"/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>


      <div class="form-group">
        <label for="name" class="grey-text">Imagen del producto</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupFileAddon01">Cargar</span>
          </div>
          <div class="custom-file">
            <input @change="onFileChange" type="file" class="custom-file-input" id="inputGroupFile01"
                   aria-describedby="inputGroupFileAddon01">
            <label class="custom-file-label" for="inputGroupFile01">{{ imgDesc }}</label>
          </div>
        </div>
      </div>


      <figure v-if="picture != ''">
        <img width="200" height="200" :src="picture" alt="Img miniatura">
      </figure>


    </div>
    <div class="text-right" v-if="picture != '' || (product && product.hasOwnProperty('id'))">
      <mdb-btn type="submit" color="primary">Guardar</mdb-btn>
    </div>
  </form>
</template>

<script>
import {
  mdbInput,
  mdbBtn,
  mdbContainer
} from 'mdbvue';

export default {
  name: "formProduct",
  props: ['product'],
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
  },
  created() {
    if (this.product) {
      this.payload = this.product;
      this.payload.file = "";
    }
  },
  data() {
    return {
      payload: {
        name: '',
        reference: '',
        status: 'activo',
        observations: '',
        price: 0,
        tax: 0,
        amount: 0,
        file: '',
      },
      picture: '',
      imgDesc: 'Elija el archivo...',

    }
  },
  methods: {
    onFileChange(e) {
      let file = e.target.files[0];
      this.imgDesc = file.name
      this.payload.file = file;
      this.createImage(file);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.picture = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    save() {
      event.preventDefault();
      event.target.classList.add('was-validated');
      const payload = this.buildFormData();
      this.$emit('save', payload)
    },
    buildFormData() {
      const formData = new FormData();
      for (let prop in this.payload) {
        formData.append(prop, this.payload[prop])
      }
      return formData
    }
  }
}
</script>

<style scoped>

</style>
