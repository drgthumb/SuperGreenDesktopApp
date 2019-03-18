<template>
  <section :id='$style.container'>
    <b>Monitoring</b>
    <div :id='$style.graphs'>
      <Graphs title='Temperature' color='#3bb30b' :value='(temperature ? temperature[temperature.length-1] : "-")+"°"' :metrics='temperature' :loading='loading' :min=10 :max=40 />
      <Graphs title='Humidity' color='#0b81b3' :value='(humidity ? humidity[humidity.length-1] : "-")+"%"' :metrics='humidity' :loading='loading' :min=0 :max=100 />
    </div>
  </section>
</template>

<script>
import Graphs from './graphs'

export default {
  components: { Graphs },
  props: [ 'i', 'box', 'controller' ],
  created() {
    const { i, controller } = this.$props,
      graph_id = `temphumi.${controller.broker_clientid.value}.${i}`
    console.log(`http://metrics.supergreenlab.com?box=${i}&controller=${controller.broker_clientid.value}`)
    this.$store.dispatch('graphs/load_graph', {id: graph_id, url: `http://metrics.supergreenlab.com?box=${i}&controller=${controller.broker_clientid.value}`})
  },
  computed: {
    loading() {
      const {i, controller} = this.$props,
            graph_id = `temphumi.${controller.broker_clientid.value}.${i}`,
            source = this.$store.getters['graphs/source'](graph_id)
      if (!source) {
        return true
      }
      return !source.loaded
    },
    temperature() {
      const {i, controller} = this.$props,
            graph_id = `temphumi.${controller.broker_clientid.value}.${i}`,
            source = this.$store.getters['graphs/source'](graph_id)
      if (!source || !source.metrics.temp) {
        return []
      }
      return source.metrics.temp.map((t) => t[1])
    },
    humidity() {
      const {i, controller} = this.$props,
            graph_id = `temphumi.${controller.broker_clientid.value}.${i}`,
            source = this.$store.getters['graphs/source'](graph_id)
      if (!source || !source.metrics.humi) {
        return []
      }
      return source.metrics.humi.map((h) => h[1])
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
