<template>
  <section v-if='controller' id='container'>
    {{ controller.device_name }}
  </section>
</template>

<script>
export default {
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  min-height: 100vh
  background-color: #efefef

  justify-content: center
  align-items: center

  text-align: center

</style>
