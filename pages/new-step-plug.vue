<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <img src="~/assets/img/plug-driver.png">
      <p>
        Plug your driver’s power plug.
      </p>
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/new-step-wifi-ap' />
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
  max-height: 200pt

#nav
  display: flex
  justify-content: flex-end

</style>
