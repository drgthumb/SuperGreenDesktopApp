<template>
  <section :id='$style.container'>
    <b>Monitoring</b>
    <div :id='$style.graphs'>
      <Graphs title='Temperature' color='#3bb30b' :value='temperature.value+"°"' :values='temperature.values' :loading='!temperature.loaded' />
      <Graphs title='Humidity' color='#0b81b3' :value='humidity.value+"%"' :values='humidity.values' :loading='!humidity.loaded' />
    </div>
  </section>
</template>

<script>
import Graphs from './graphs'

export default {
  components: { Graphs },
  props: [ 'i', 'box', 'controller' ],
  created() {
    const controller = this.$props.controller,
          temp_id = `temp.${controller.broker_clientid.value}`,
          humi_id = `humi.${controller.broker_clientid.value}`
    this.$store.dispatch('graphs/load_graph', temp_id)
    this.$store.dispatch('graphs/load_graph', humi_id)
  },
  computed: {
    temperature() {
      const controller = this.$props.controller,
            temp_id = `temp.${controller.broker_clientid.value}`
      return this.$store.getters['graphs/source'](temp_id)
    },
    humidity() {
      const controller = this.$props.controller,
            humi_id = `humi.${controller.broker_clientid.value}`
      return this.$store.getters['graphs/source'](humi_id)
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
