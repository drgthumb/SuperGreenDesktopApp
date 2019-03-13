<template>
  <section :id='$style.container'>
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <section :id='$style.body'>
      <img src="~/assets/img/plug-driver.png">
      <p>
        Plug your driver’s power plug.
      </p>
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' :to='is_sta ? "/new-step-searching" : "/new-step-wifi-ap"' />
    </section>
  </section>
</template>

<script>
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'

export default {
  components: { CloseButton, NextButton, },
  layout: 'fullscreen',
  methods: {
    onNext(e) {
    }
  },
  computed: {
    is_sta() {
      return this.$store.state.controllers.search_ap_is_sta
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#top
  display: flex
  justify-content: flex-end

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
