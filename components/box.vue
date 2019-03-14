<template>
  <section :id='$style.container'>
    <h1 v-if='i == 0'>Bloom box<span :class='$style.grey'> - 34th day</span></h1>
    <h1 v-else>Veg box {{ i }}<span :class='$style.grey'> - 34th day</span></h1>
    <div :id='$style.body'>
      <div :class='$style.left_body'>
        <BoxControl :i='i' :box='box' :controller='controller' />
      </div>
      <div :class='$style.right_body' :id='$style.monitoring'>
        <BoxMonitoring :i='i' :box='box' :controller='controller' />
        <BoxLiveview :i='i' :box='box' :controller='controller' />
      </div>
    </div>
    <div v-if='!box.enabled.value' :id='$style.disabled_overlay'>
      <button v-on:click='enable()'>Enable</button>
    </div>
  </section>
</template>

<script>
import BoxControl from '../components/boxcontrol'
import BoxMonitoring from '../components/boxmonitoring'
import BoxLiveview from '../components/boxliveview'

export default {
  components: { BoxControl, BoxMonitoring, BoxLiveview, },
  props: [ 'i', 'box', 'controller' ],
  methods: {
    enable() {
       const { 
          i, box, controller,
        } = this.$props
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'enabled', value: 1}) 
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'timer_type', value: 2}) 
    },
  }
}
</script>

<style module lang=stylus>

#container
  position: relative
  display: flex
  padding: 10pt
  margin: 20pt
  flex-direction: column
  background-color: white
  border-radius: 2pt

.grey
  font-size: 0.8em
  color: #B1B1B1

#body
  display: flex

.left_body
  flex: 0.7
  max-width: 250pt

.right_body
  flex: 1

#disabled_overlay
  position: absolute
  display: flex
  width: 100%
  height: 100%
  background-color: rgba(255, 255, 255, 0.8)
  z-index: 5
  align-items: center
  justify-content: center

#disabled_overlay > button
  background-color: #3bb30b
  border: none
  padding: 5pt 20pt
  border-radius: 3pt
  color: white
  cursor: pointer
  
</style>
