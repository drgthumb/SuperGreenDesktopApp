<template>
  <section :id='$style.container'>
    <b>Control</b>
    <div :id='$style.control'>
      <div :id='$style.boxonoff'>
        Off
        <div :class='`${$style.onoff} ${(box.enabled.value ? $style.on : $style.off)}`' v-on:click='toggleOnOff()'></div>
        On
      </div>
      <div :id='$style.leds'>
        <div v-for='(led, j) in controller.leds' v-if='led.box.value == i' :key='j' :class='$style.led'>
          <LedControl :i='i' :box='box' :controller='controller' :j='j' :led='led' />
        </div>
      </div>
      <div :id='$style.blower'>
        <img src='~/assets/img/vent-small.svg' />
        <div :id='$style.sliderw'><Slider v-model='blower' /></div>
        <img src='~/assets/img/vent-big.svg' />
      </div>
    </div>
  </section>
</template>

<script>
import LedControl from '../components/ledcontrol'
import Slider from '../components/slider'

export default {
  components: { LedControl, Slider, },
  props: [ 'i', 'box', 'controller', ],
  computed: {
    blower: {
      get() {
        return this.$props.box.blower.value
      },
      set(value) {
       const { 
          i, box, controller,
        } = this.$props
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'blower', value: Math.round(value)}) 
      },
    },
  },
  methods: {
    toggleOnOff() {
       const { 
          i, box, controller,
        } = this.$props
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'enabled', value: (box.enabled.value == 1 ? 0 : 1)}) 
    },
  },
  mounted() {
    const { 
      i, box, controller
    } = this.$props
    this.$store.dispatch('controllers/load_box_param', {id: controller.broker_clientid.value, i: i, key: 'enabled'})
    this.$store.dispatch('controllers/load_box_param', {id: controller.broker_clientid.value, i: i, key: 'blower'})
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  border-radius: 2pt

#control
  background-color: #fcfcfc
  border: 1px solid #ebebeb
  margin: 10pt

#boxonoff
  display: flex
  align-items: center
  justify-content: center

#leds
  flex: 1
  flex-wrap: wrap
  display: flex
  background-color: #f6f6f6
  padding: 20pt 15pt

.led
  flex: 50%
  display: flex
  align-items: center
  justify-content: center

.onoff
  display: inline-block
  width: 40pt
  height: 20pt
  margin: 10pt 20pt
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  cursor: pointer

.on
  background-image: url('~/assets/img/on.svg')

.off
  background-image: url('~/assets/img/off.svg')

#blower
  display: flex
  padding: 5pt 30pt
  align-items: center
  justify-content: center

#sliderw
  flex: 1
  display: inline-block
  margin: 2pt 10pt
  height: 20pt

</style>
