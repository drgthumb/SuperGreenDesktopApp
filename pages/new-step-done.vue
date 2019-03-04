<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <h1>
        Ok all good, move on:)
      </h1>
    </section>

    <section :id='$style.nav'>
      <NextButton :to='controller.state.value == 0 ? "/first_setup_controller" : "/"' />
    </section>
  </section>
</template>

<script>
import NextButton from '../components/nextbutton'

export default {
  components: { NextButton, },
  layout: 'fullscreen',
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#body
  display: flex
  flex-direction: column
  flex: 1
  justify-content: center
  align-items: center
  text-align: center

#body img
  max-height: 200pt

#nav
  display: flex
  justify-content: flex-end

</style>
