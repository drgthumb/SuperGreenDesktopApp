<template>
  <section v-if='controller' :id='$style.container'>
    <h1>New box detected.</h1>
    <h3>Pick your kit:</h3>
    <div :id='$style.presets'>
      <div v-for='(preset, i) in presets' :class='$style.preset' v-on:click='select(i)'>
        <Preset :id='preset.id' :title='preset.title' :icon='preset.icon' :description='preset.description' :selected='i == selected' />
      </div>
    </div>
  </section>
</template>

<script>
import Preset from '../components/preset'

export default {
  data: () => ({
    selected: 0,
  }),
  components: { Preset },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
    presets() {
      return this.$store.state.presets.configs
    },
  },
  methods: {
    select(i) {
      this.$data.selected = i
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex: 1
  flex-direction: column
  min-height: 100vh
  background-color: #efefef
  padding: 20pt
  align-items: center
  justify-content: center
  background-color: white

#presets
  display: flex
  flex: 1
  width: 100%

.preset
  width: 50%
  display: flex
  align-items: center
  justify-content: center

</style>
