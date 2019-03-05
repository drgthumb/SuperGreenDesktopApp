<template>
  <section :id='$style.container'>
    <b>Live view</b>
    <div :id='$style.liveviews'>
      <div v-for='source in sources' :class='$style.liveview' :style='{"background-image": `url(${source.url})`}'></div>
      <div :class='`${$style.liveview} ${$style.add}`' v-on:click='show_add_source'></div>
      <div v-if='showing_add_source' :id='$style.add_source'>
        <input type='text' ref='name' />
        <button v-on:click='add_source()'>add timelapse</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    showing_add_source: false,
  }),
  props: [ 'i', 'box', 'controller' ],
  computed: {
    sources() {
      const controller = this.$props.controller,
            box = this.$props.box
      return this.$store.getters['liveviews/sources'](controller.broker_clientid)
    }
  },
  methods: {
    show_add_source() {
      this.$data.showing_add_source = !this.$data.showing_add_source
    },
    add_source() {
      const controller = this.$props.controller
      console.log(this.$refs.name.value)
      this.$data.showing_add_source = false
      this.$store.commit('liveviews/add_source', {
        id: 'test',
        url: this.$refs.name.value,
      })
    },
  },
}
</script>

<style module lang=stylus>

#container
  flex: 1

#liveviews
  position: relative
  display: flex
  margin-top: 10pt

.liveview
  width: 120pt
  height: 90pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  cursor: pointer

.add
  background-image: url('~/assets/img/add-timelapse.svg')

#add_source
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: absolute
  width: 100%
  height: 100%
  left: 0
  top: 0
  background-color: rgba(255, 255, 255, 0.7)

#add_source > input
  border: 1pt solid #bdbdbd
  border-radius: 2pt
  padding: 2pt
  margin: 5pt

#add_source > button
  background: transparent
  border: 1pt solid #bdbdbd
  border-radius: 2pt

</style>
