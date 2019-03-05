<template>
  <section :id='$style.container' v-on:mousedown='onMouseDown' v-on:mouseup='onMouseUp' v-on:mouseout='onMouseOut' v-on:mousemove='onMouseMove'>
    <div :id='$style.course'></div>
    <div :id='$style.plot' :style="{left: `${mouseX}px`}"></div>
  </section>
</template>

<script>
export default {
  props: [ 'onValueChanged' ],
  data: () => ({
    value: 0,
    mouseValue: 0,
    mouseX: 0,
    mouseState: '',
  }),
  methods: {
    preventDefault(evt) {
      evt.preventDefault()
    },
    onMouseDown(evt) {
      this.$data.mouseState = 'down'
      this.$data.value = this.$data.mouseValue
      this.$data.mouseX = evt.layerX
    },

    onMouseUp(evt) {
      if (this.$data.mouseState == 'down') {
        this.$props.onValueChanged(this.$data.value)
      }
      this.$data.mouseState = ''
    },

    onMouseOut(evt) {
      if (this.$data.mouseState == 'down') {
        this.$props.onValueChanged(this.$data.value)
      }
      this.$data.mouseState = ''
    },

    onMouseMove(evt) {
      this.$data.mouseValue = evt.layerX / evt.toElement.clientWidth
      if (this.$data.mouseState == 'down') {
        this.$data.value = this.$data.mouseValue
        this.$data.mouseX = evt.layerX
      }
    },
  }
}
</script>

<style module lang=stylus>

#container
  position: relative
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  cursor: pointer

#course
  width: 100%
  height: 3.3pt
  border-radius: 1.65pt
  background-color: #c4c4c4

#plot
  position: absolute
  background-image: url('~/assets/img/plot.svg')
  top: 50%
  width: 10pt
  height: 10pt
  margin-top: -5pt
  margin-left: -5pt
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  pointer-events: none

</style>
