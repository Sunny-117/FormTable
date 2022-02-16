<template>
  <div class="about">
    <h1 >{{data}}</h1>
  </div>
</template>

<script>

export default {
  data() {
    return{
      data:''
    }
  },
   mounted() {
     this.data = this.$route.query.user
  }
}
</script>

