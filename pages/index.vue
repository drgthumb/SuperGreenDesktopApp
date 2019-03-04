<template>
  <section v-if='controller' :id='$style.container'>
    <Box v-for='(box, i) in controller.boxes' :i='i' :controller='controller' :box='box' :key='i' />
  </section>
</template>

<script>
import Box from '../components/box'

export default {
  components: { Box },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex: 1
  flex-direction: column
  min-height: 100vh
  background-color: #efefef
  padding: 20pt
  overflow-y: auto

</style>
