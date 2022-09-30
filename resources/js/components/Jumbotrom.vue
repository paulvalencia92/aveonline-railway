<template>
  <mdb-card class="card-image"
            style="background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient12.webp)">
    <div class="text-white text-center py-5 px-4 my-5">
      <div>
        <h2 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>Productos</strong></h2>
        <p class="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aut blanditiis
          consequuntur corporis cupiditate dolore dolorem eveniet explicabo illum impedit inventore ipsam laboriosam
        </p>
        <slot name="action"></slot>

      </div>
    </div>
  </mdb-card>
</template>

<script>
import {mdbCard} from 'mdbvue';

export default {
  name: "Jumbotrom",
  components: {
    mdbCard
  }
}
</script>

<style scoped>

</style>
