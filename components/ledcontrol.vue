<template>
  <section :id='$style.container'>
    <b>{{ j + 1 }}</b>
    <div :id='$style.box'>
      <div :class='`${$style.onoff} ${duty.value > 5 ? $style.on : $style.off}`'></div>
      <b>{{ led.duty.value }}%</b>
    </div>
    <div :id='$style.slider'>
      <Slider v-model='duty' />
    </div>
  </section>
</template>

<script>
import Slider from '../components/slider'

export default {
  components: { Slider },
  props: [ 'i', 'box', 'controller', 'j', 'led' ],
  computed: {
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
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin: 10pt

#container > b
  align-self: flex-start

#box
  display: flex
  flex-direction: column
  background-color: white
  border: 1px solid #ebebeb
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
  cursor: pointer

.on
  background-image: url('~/assets/img/lighton.svg')

.off
  background-image: url('~/assets/img/lightoff.svg')

#slider
  width: 100%
  height: 15pt

</style>
