<template>
  <section :id='$style.container'>
    <section :id='$style.body'>
      <p><b>Welcome to</b></p>
      <Logo color='black' size='3em' />
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/new-step-plug' />
      <small>* clicking this "Next &gt;" button confirms that you are major in your state and are not violating any laws.</small>
    </section>
  </section>
</template>

<script>
import Logo from '../components/logo'
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'

export default {
  components: { Logo, CloseButton, NextButton, },
  layout: 'fullscreen',
  methods: {
    onNext(e) {
      this.$store.commit('localstorage/first_start')
      this.$store.commit('controllers/configure_search_ap_controller', {url: '192.168.4.1', is_sta: false})
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
  max-height: 100pt

#nav
  display: flex
  align-items: flex-end
  flex-direction: column

</style>
