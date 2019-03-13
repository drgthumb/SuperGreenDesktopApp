<template>
  <section :id='$style.container'>
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <section :id='$style.body'>
      <h1>
        Not Found :(
      </h1>
    </section>
    <section :id='$style.nav'>
      <NextButton v-on:click.native='onNext' to='/' />
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
