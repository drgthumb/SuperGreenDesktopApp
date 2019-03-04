<template>
  <section v-if='controller' :id='$style.container'>
    <div :id='$style.setup'>
      Setup
    </div>
    <section :id='$style.nav'>
      <NextButton to='/' label='Save' />
    </section>
  </section>
</template>

<script>
import Box from '../components/box'
import NextButton from '../components/nextbutton'

export default {
  components: { Box, NextButton,  },
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

#setup
  flex: 1
  padding: 20pt

#nav
  display: flex
  justify-content: flex-end
  width: 100%

</style>
