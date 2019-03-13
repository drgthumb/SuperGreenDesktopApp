<template>
  <section :id='$style.container'>
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <section :id='$style.body'>
      <img src="~/assets/img/loading.png">
      <h3>Pease wait...</h3>
    </section>
  </section>
</template>

<script>
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'

export default {
  components: { CloseButton, NextButton, },
  layout: 'fullscreen',
  mounted() {
    this.$store.dispatch('controllers/search_ap_controller')
  },
  created() {
    this.$store.watch(state => state.controllers.searching_ap, () => {
      const state = this.$store.state.controllers
      if (state.searching_ap == true) {
        return
      }
      if (state.found_ap_controller != null) {
        this.$router.push('/new-step-found')
      } else if (state.search_ap_failed) {
        this.$router.push('/new-step-notfound')
      }
    })
  },
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
  padding-bottom: 50pt

#nav
  display: flex
  justify-content: flex-end

</style>
