<template>
  <section :id='$style.container'>
    <h3 v-if='i == 0'>Bloom box<span :class='$style.grey'> - 34th day</span></h3>
    <h3 v-else>Veg box {{ i }}</h3>
    <div :id='$style.body'>
      <div :class='$style.bodies'>
        <BoxControl :i='i' :box='box' :controller='controller' />
      </div>
      <div :class='$style.bodies' :id='$style.monitoring'>
        <BoxMonitoring :i='i' :box='box' :controller='controller' />
        <BoxLiveview :i='i' :box='box' :controller='controller' />
      </div>
    </div>
  </section>
</template>

<script>
import BoxControl from '../components/boxcontrol'
import BoxMonitoring from '../components/boxmonitoring'
import BoxLiveview from '../components/boxliveview'

export default {
  components: { BoxControl, BoxMonitoring, BoxLiveview, },
  props: [ 'i', 'box', 'controller' ]
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  background-color: white
  border-radius: 2pt
  margin-bottom: 20pt

.grey
  font-size: 0.8em
  color: #B1B1B1

#body
  display: flex

.bodies
  flex: 1

</style>
