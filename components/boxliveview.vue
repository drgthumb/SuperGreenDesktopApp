<template>
  <section :id='$style.container'>
    <b>Live view</b>
    <div :id='$style.liveviews'>
      <div v-for='source in sources' :class='$style.liveview' :style='{"background-image": `url(${source.url})`}' v-on:click='open_pic(source)'>
        <div><img v-on:click='evt => remove_source(evt, source)' src='~/assets/img/remove-timelapse.svg' /></div>
      </div>
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
            box = this.$props.box,
            i = this.$props.i
      return this.$store.getters['liveviews/sources'](`${controller.broker_clientid.value}.${i}.`)
    }
  },
  methods: {
    show_add_source() {
      this.$data.showing_add_source = !this.$data.showing_add_source
    },
    add_source() {
      const controller = this.$props.controller,
            i = this.$props.i,
            sources = this.sources
      this.$data.showing_add_source = false
      this.$store.commit('liveviews/add_source', {
        id: `${controller.broker_clientid.value}.${i}.${sources.length}`,
        url: this.$refs.name.value,
      })
    },
    remove_source(evt, source) {
      evt.preventDefault()
      evt.stopPropagation()
      this.$store.commit('liveviews/remove_source', source)
    },
    open_pic(source) {
      window.open(source.url, source.id)
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
  flex-wrap: wrap;

.liveview
  width: 140pt
  height: 110pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  cursor: pointer
  margin: 0pt 4pt 4pt 0

.liveview > div > img
  margin-top: 4pt
  margin-left: 2pt
  opacity: 0.5
  transition: opacity 0.2s

.liveview > div > img:hover
  opacity: 1

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
