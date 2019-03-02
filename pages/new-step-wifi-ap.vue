<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <img src="~/assets/img/wifi-icon.png">
      <section>
        <h3>Connect to the driver’s</b><br />
        wifi network:</h3><br />
        SSID: 🤖🍁<br />
        Pass: multipass
      </section>
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/new-step-searching' />
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

#body img
  max-height: 200pt
  padding-bottom: 50pt

#nav
  display: flex
  justify-content: flex-end

</style>
