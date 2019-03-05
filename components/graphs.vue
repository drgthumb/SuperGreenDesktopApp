<template>
  <section :id='$style.container'>
    <div :id='$style.value' :style='{color}'>
      {{ title }}
      <h1>{{ value }}</h1>
    </div>
    <div :id='$style.graph'>
      <svg v-if='!loading' width='100%' height='100%' ref='graph'>
        <g>
          <polygon :points="fill_points" :style="{fill: color, opacity: 0.5}"></polygon>
          <path :d="stroke_path" :style="{stroke: color, 'stroke-width': '2pt'}"></path>
        </g>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    color: String,
    value: String,
    values: Array,
    loading: Boolean,
  },
  computed: {
    fill_points() {
      if (!this.$refs.graph) return ''
      const width = this.$refs.graph.clientWidth,
            height = this.$refs.graph.clientHeight,
            xspan = width / values.length,
            min = Math.min(values),
            max = Math.max(values),
            ymin = min - (max - min) * 0.2
            ymax = max + (max - min) * 0.2
      console.log(width, height, xspan)
      let points = '0,0 ',
          x = 0
      for (let i in values) {
        const value = (values[i] - ymin) / (ymax - ymin)
        points += `${x},${value * height} `
        x += xspan
      }
      console.log(points)
      return points
    },
    stroke_path() {
      if (!this.$refs.graph) return ''
      const width = this.$refs.graph.clientWidth,
            height = this.$refs.graph.clientHeight
      console.log(width, height)
      return ''
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
