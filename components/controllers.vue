<template>
  <section :id='$style.container'>
    <div :id='$style.list'>
      <div v-for='(controller, i) in controllers' :class='controller.broker_clientid.value === selected ? $style.selected : ""' v-on:click='select(controller)'>
        <small>Controller {{ i + 1 }}</small><br />
        <b>{{ controller.device_name.value }}</b><br />
        <small :class='$style.green'>Online</small>
      </div>
    </div>
    <div :id='$style.add'>
      <img :class='$style.add_img' :src='!overlay ? require("~/assets/img/add.svg") : require("~/assets/img/remove.svg")' v-on:click="show" />
      <div :id='$style.overlay' :class='overlay ? $style.show : $style.hide'>
        <AddController />
      </div>
    </div>
  </section>
</template>

<script>
import AddController from './addcontroller'

export default {
  components: {AddController},
  data: () => ({
    overlay: false,
  }),
  computed: {
    controllers() {
      return this.$store.state.controllers.controllers
    },
    selected() {
      return this.$store.state.controllers.selected
    },
  },
  methods: {
    select(controller) {
      if (controller.state.value == 0) {
        this.$router.push('/first_setup_controller')
      } else {
        this.$router.push('/')
      }
      this.$store.commit('controllers/set_selected', controller.broker_clientid.value)
    },
    show() {
      this.$data.overlay = !this.$data.overlay
      return evt => evt.preventDefault()
    },
  },
}
</script>

<style module lang=stylus>
#container
  display: flex
  height: 100%
  align-items: center
  justify-content: space-between
  flex-direction: column

#list
  display: flex
  width: 100%
  flex-direction: column
  margin: 5pt

#list > div
  color: white
  padding: 10pt
  transition: background-color .2s
  line-height: 15pt

#list > div:hover
  background-color: #020202
  cursor: pointer

#list > div:active
  background-color: #222222

#list > div > small
  font-size: 0.7em

#add
  position: relative
  transition: opacity .2s

.add_img
  cursor: pointer
  width: 35pt
  margin: 5pt

#add > img:hover
  opacity: 0.7

#add > img:active
  opacity: 0.2

.selected
  background-color: #020202

.selected::after
  content: ''
  display: block
  position: absolute
  margin-left: -1px
  width: 30pt
  height: 100%
  top: 0
  left: 100%
  background-image: url('~/assets/img/selected.svg')
  background-repeat: no-repeat
  background-size: contain
 
.green
  color: #3BB30B

.red
  color: #FF4B4B

#overlay
  display: flex
  position: absolute
  left: 0
  bottom: 0
  width: 100vw
  background-color: #454545
  border-radius: 2pt
  z-index: 10
  color: white
  padding-left: 15pt
  transition: margin-left 0.2s, opacity 0.5s

.show
  margin-left: 100%
  opacity: 1

.hide
  margin-left: -100vw
  opacity: 0

</style>
