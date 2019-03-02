<template>
  <section :id='$style.container'>
    <section v-if='!loaded' :id='$style.body'>
      <h1>
        Found !
      </h1>
      <p>Loading a few additional stuffs..</p>
    </section>
    <section v-else :id='$style.body'>
      <h1>
        Ok all good, move on:)
      </h1>
    </section>

    <section v-if='loaded' :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/' />
    </section>
  </section>
</template>

<script>
import NextButton from '../components/nextbutton'

export default {
  computed: {
    loaded () {
      return this.$store.state.boxes.found_ap_box.loaded
    }
  },
  components: { NextButton, },
  layout: 'fullscreen',
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
