<template>
  <section v-if='controller' :id='$style.container'>
    <h1>New box detected.</h1>
    <h3>Pick your kit:</h3>
    <div :id='$style.presets'>
    </div>
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
  align-items: center
  justify-content: center

#presets
  display: flex
  flex: 1

</style>
