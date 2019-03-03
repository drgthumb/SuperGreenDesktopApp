<template>
  <section :id='$style.container'>
    <div :id='$style.list'>
      <div v-for='(controller, i) in controllers' :class='controller.mqtt_client_id === selected ? $style.selected : ""' v-on:click='setSelected(controller.mqtt_client_id)'>
        <small>Controller {{ i + 1 }}</small><br />
        <b>{{ controller.device_name }}</b><br />
        <small :class='$style.green'>Online</small>
      </div>
    </div>
    <nuxt-link :id='$style.add' to="/new-step-plug">
      <img src='~/assets/img/add.svg' />
    </nuxt-link>
  </section>
</template>

<script>
export default {
  computed: {
    controllers() {
      return this.$store.state.controllers.controllers
    },
    selected() {
      return this.$store.state.controllers.selected
    },
  },
  methods: {
    setSelected(mqtt_client_id) {
      this.$store.commit('controllers/set_selected', mqtt_client_id)
    }
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
  transition: opacity .2s

#add > img
  width: 35pt
  margin: 5pt

#add:hover
  opacity: 0.7

#add:active
  opacity: 0.2

.selected
  position: relative
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

</style>
