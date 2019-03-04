<template>
  <section :id='$style.container'>
    Control
    <div :id='$style.control'>
      <div :id='$style.boxonoff'>
        on
        <img :src='box.enabled ? "~/assets/img/on.svg" : "~/assets/img/off.svg"' />
        off
      </div>
      <div :id='$style.leds'>
        <div v-for='(led, j) in controller.leds' v-if='led.box.value == i' :key='j' :class='$style.led'>
          <LedControl :i='i' :box='box' :controller='controller' :j='j' :led='led' />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LedControl from '../components/ledcontrol'

export default {
  components: { LedControl, },
  props: [ 'i', 'box', 'controller', ]
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

.led
  flex: 50%
  display: flex
  align-items: center
  justify-content: center

</style>
