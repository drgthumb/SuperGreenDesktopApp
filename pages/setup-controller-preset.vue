<template>
  <section v-if='controller' :id='$style.container'>
    <h1>New box detected.</h1>
    <h3>Pick your kit:</h3>
    <div :id='$style.presets'>
      <div v-for='(preset, i) in presets' :class='$style.preset' v-on:click='select(i)'>
        <Preset :id='preset.id' :title='preset.title' :icon='preset.icon' :description='preset.description' :selected='i == selected' />
      </div>
    </div>

    <section :id='$style.nav'>
      <NextButton :onClick='writePreset' label='Configure' />
    </section>
    <Loading v-if='loading' label='Uploading config..' />
  </section>
</template>

<script>
import Preset from '../components/preset'
import NextButton from '../components/nextbutton'
import Loading from '../components/loading'

export default {
  data: () => ({
    selected: 0,
    loading: false
  }),
  components: { Preset, NextButton, Loading, },
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
    },
    async writePreset() {
      this.$data.loading = true
      const preset = this.$store.state.presets.configs[this.$data.selected],
        id = this.$store.state.controllers.selected
      const shoot_presets = (keys, type, req) =>
        Object.keys(keys)
          .filter((k) => typeof keys[k] == 'string' || typeof keys[k] == 'number')
          .map((k) => this.$store.dispatch(`controllers/set_${type}_param`, req(k, keys[k])))

      let promises = shoot_presets(preset.keys, 'controller', (k, v) => ({id, key: k, value: v,}))
      preset.keys.leds.forEach((led, i) => promises.push(...shoot_presets(led, 'led', (k, v) => ({id, key: k, value: v, i}))))
      preset.keys.boxes.forEach((box, i) => promises.push(...shoot_presets(box, 'box', (k, v) => ({id, key: k, value: v, i}))))
      await Promise.all(promises)
      this.$router.push('/setup-controller-name')
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex: 1
  position: relative
  flex-direction: column
  min-height: 100vh
  background-color: #efefef
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

#nav
  display: flex
  justify-content: flex-end
  width: 100%

</style>
