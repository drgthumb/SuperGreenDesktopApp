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

.right_body
  flex: 1

</style>
