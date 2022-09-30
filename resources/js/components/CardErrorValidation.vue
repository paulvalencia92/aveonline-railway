<template>
<div class="alert alert-danger">
  <h4 class="alert-heading">Se encontraron los siguientes errores</h4>
  <p v-for="(error,index) in errorMessages" :key="index">
    <i class="iconsminds-close"/> {{ error.join() }}
  </p>
</div>
</template>

<script>
export default {
  name: "CardErrorValidation",
  props: ['errorMessages']
}
</script>

<style scoped>

</style>
