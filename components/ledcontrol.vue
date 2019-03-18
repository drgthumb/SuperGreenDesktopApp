<template>
  <section :id='$style.container'>
    <b>{{ j + 1 }}</b>
    <div :id='$style.box'>
      <div :class='`${$style.onoff} ${duty > 75 ? $style.on : (duty > 25 ? $style.mid : $style.off)}`'></div>
      <b>{{ led.duty.value }}%</b>
    </div>
    <div :id='$style.slider'>
      <Slider v-model='duty' />
    </div>
    <Loading v-if='loading' />
  </section>
</template>

<script>
import Slider from '../components/slider'
import Loading from '../components/loading'

export default {
  components: { Slider, Loading, },
  props: [ 'i', 'box', 'controller', 'j', 'led' ],
  computed: {
    loading() {
      const { led } = this.$props
      return led.enabled.loading || led.duty.loading || led.box.loading
    },
    duty: {
      get() {
        return this.$props.led.duty.value
      },
      set(value) {
        const { 
          i, box, controller, j, led
        } = this.$props
        this.$store.dispatch('controllers/set_led_param', {id: controller.broker_clientid.value, i: j, key: 'duty', value: Math.round(value)}) 
      },
    },
  },
  mounted() {
    const { 
      i, box, controller, j, led
    } = this.$props
    this.$store.dispatch('controllers/load_led_param', {id: controller.broker_clientid.value, i: j, key: 'enabled'})
    this.$store.dispatch('controllers/load_led_param', {id: controller.broker_clientid.value, i: j, key: 'duty'})
    this.$store.dispatch('controllers/load_led_param', {id: controller.broker_clientid.value, i: j, key: 'box'})
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: relative
  flex-direction: column
  align-items: center
  justify-content: center
  margin: 4pt

#container > b
  align-self: flex-start
  margin-left: 2pt
  margin-bottom: -6pt
  z-index: 2
  text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff

#box
  display: flex
  flex-direction: column
  background-color: white
  border: 1px solid #ebebeb
  border-radius: 3pt
  color: #8b8b8b
  align-items: center
  justify-content: center
  width: 45pt
  height: 45pt

.onoff
  width: 25pt
  height: 25pt
  align-self: flex-end 
  margin: 2pt
  background-repeat: no-repeat
  background-size: contain
  background-position: center

.on
  background-image: url('~/assets/img/lighton.svg')

.mid
  background-image: url('~/assets/img/lightmid.svg')

.off
  background-image: url('~/assets/img/lightoff.svg')

#slider
  width: 100%

</style>
