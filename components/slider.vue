<template>
  <section :id='$style.container'>
    <vue-slider :min='0' :max='100' v-model='vcomp' :id='$style.slider' width='100%' />
  </section>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  props: [ 'value' ],
  components: {
    VueSlider,
  },
  computed: {
    vcomp: {
      get() {
        return this.$props.value
      },
      set(v) {
        this.$emit('input', v)
      },
    }
  }
}
</script>

<style module lang=stylus>

#container
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  
#slider
  width: 100%

</style>
