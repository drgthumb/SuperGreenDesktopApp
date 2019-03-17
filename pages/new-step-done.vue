<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <h1>
        Ok all good, move on:)
      </h1>
    </section>

    <section :id='$style.nav'>
      <NextButton :to='nextUrl' />
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
    },
    nextUrl() {
      const controller = this.controller
      if (controller.state.value == 0) {
        return '/setup-controller-preset'
      } else if (controller.wifi_status.value == 4) {
        return '/setup-controller-wifi-sta'
      }
      return '/'
    },
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
