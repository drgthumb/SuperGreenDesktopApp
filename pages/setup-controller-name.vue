<template>
  <section v-if='controller' :id='$style.container'>
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <h1>New box detected.</h1>
    <h3>Give it a name:</h3>
    <section :id='$style.body'>
      <h2>Hi <img src='~/assets/img/robot.png' /> ! My name is:</h2>
      <small>We’ll need that to find it once it’s on your wifi network.</small>
      <input type='text' v-model='name' placeholder='Ex: officebox, Daryl... whatnot' />
    </section>
    <section :id='$style.nav'>
      <NextButton :onClick='saveName' label='Save name' />
    </section>
  </section>
</template>

<script>
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'

export default {
  data() {
    return {
      name: '',
    }
  },
  components: { CloseButton, NextButton,  },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
  },
  methods: {
    async saveName() {
      const controller = this.controller
      await this.$store.dispatch('controllers/set_controller_param', {id: controller.broker_clientid.value, key: 'device_name', value: this.$data.name}) 
      this.$router.push('/setup-controller-wifi-sta')
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  flex: 1
  flex-direction: column
  min-height: 100vh

#top
  display: flex
  justify-content: flex-end
  align-self: flex-end
  margin-bottom: 10pt

#body
  display: flex
  flex-direction: column
  flex: 1
  padding: 20pt
  align-items: center
  justify-content: center

#body > small
  color: #3bb30b
  padding: 5pt 0 20pt 0

#body > input
  width: 100%

#nav
  display: flex
  justify-content: flex-end
  width: 100%

</style>
