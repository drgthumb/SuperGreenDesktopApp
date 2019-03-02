<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <p>Welcome to</p>
      <img src="~/assets/img/SuperGreenWallpaper.svg">
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/new-step-plug' />
    </section>
  </section>
</template>

<script>
import NextButton from '../components/nextbutton'

export default {
  components: { NextButton, },
  layout: 'fullscreen',
  methods: {
    onNext(e) {
      this.$store.commit('localstorage/first_start')
    }
  }
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
  max-height: 100pt

#nav
  display: flex
  justify-content: flex-end

</style>
