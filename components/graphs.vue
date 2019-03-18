<template>
  <section :id='$style.container'>
    <div :id='$style.value' :style='{color}'>
      {{ title }}
      <h1>{{ value }}</h1>
    </div>
    <div :id='$style.graph'>
      <svg width='100%' height='100%' ref='graph'>
        <g v-if='!loading'>
          <polygon :points="fill_points" :style="{fill: color, opacity: 0.2}"></polygon>
          <path :d="stroke_path" :style="{stroke: color, 'stroke-width': 2}" fill=none></path>
        </g>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
    title: String,
    color: String,
    value: String,
    metrics: Array,
    loading: Boolean,
  },
  computed: {
    fill_points() {
      if (!this.$refs.graph) return ''
      const width = this.$refs.graph.clientWidth,
            height = this.$refs.graph.clientHeight,
            { min, max, metrics } = this.$props,
            xspan = width / (metrics.length - 1),
            ymin = min - (max - min) * 0.2,
            ymax = max + (max - min) * 0.2
      let points = `0,${height} `,
          x = 0
      for (let i in metrics) {
        const value = (metrics[i] - ymin) / (ymax - ymin)
        points += `${x},${value * height} `
        x += xspan
      }
      points += `${width},${height}`
      return points
    },

    stroke_path() {
      if (!this.$refs.graph) return ''
      const width = this.$refs.graph.clientWidth,
            height = this.$refs.graph.clientHeight,
            { min, max, metrics } = this.$props,
            xspan = width / (metrics.length - 1),
            ymin = min - (max - min) * 0.2,
            ymax = max + (max - min) * 0.2
      let points = '',
          x = 0
      for (let i in metrics) {
        if (i == 0) {
          points += 'M'
        } else {
          points += 'L'
        }
        const value = (metrics[i] - ymin) / (ymax - ymin)
        points += `${x} ${value * height} `
        x += xspan
      }
      return points
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex  
  margin: 10pt

#value
  display: flex
  width: 70pt
  font-size: 0.8em
  flex-direction: column
  align-items: center
  justify-content: center

#graph
  flex: 1
  border-radius: 1pt
  border-left: 1.5pt solid #dddddd
  border-bottom: 1.5pt solid #dddddd

</style>
