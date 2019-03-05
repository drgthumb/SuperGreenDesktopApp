<template>
  <section :id='$style.container'>
    <b>Monitoring</b>
    <div :id='$style.graphs'>
      <Graphs title='Temperature' color='#3bb30b' :value='temperature' :values='temperature_points' loading=true />
      <Graphs title='Humidity' color='#0b81b3' :value='humidity' :values='humidity_points' loading=true />
    </div>
  </section>
</template>

<script>
import Graphs from './graphs'

export default {
  components: { Graphs },
  props: [ 'i', 'box', 'controller' ],
  computed: {
    temperature() {
      return '25°'
    },
    temperature_points() {
      return [21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 25, 25, 25, 24, 24, 23, 24, 25,]
    },

    humidity() {
      return '51%'
    },
    humidity_points() {
      return [65, 65, 65, 63, 62, 60, 60, 60, 56, 56, 56, 56, 56, 54, 52, 51, 51, 51, 51, 51,]
    },
  }
}
</script>

<style module lang=stylus>

#container
  flex: 1

#graphs
  display: flex
  flex-direction: column

</style>
