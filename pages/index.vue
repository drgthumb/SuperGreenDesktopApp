<template>
  <section v-if='controller' :id='$style.container'>
    <div v-for='(box, i) in controller.boxes'>
      <Box :i='i' :controller='controller' :box='box' :key='controller.broker_clientid.value + i' />
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
  background-color: #efefef
  overflow-y: auto

#container > div
  max-width: 700pt

</style>
