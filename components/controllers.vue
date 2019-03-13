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
      <img src='~/assets/img/add.svg' v-on:click="show" />
      <div v-if='overlay':id='$style.overlay'>
        <b>Add controller</b>
        <div v-on:click='first'>
          First time setup
        </div>
        <div>
          Wifi
          <input v-model='url' type='text' placeholder='IP or name.local' />
          <button v-on:click='wifi'>ok</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    url: '',
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
    },
    first() {
      this.$store.commit('controllers/configure_search_ap_controller', {url: '192.168.4.1', is_sta: false})
      this.$router.push('/new-step-plug')
    },
    wifi() {
      this.$store.commit('controllers/configure_search_ap_controller', {url: this.$data.url, is_sta: true})
      this.$router.push('/new-step-plug')
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
  cursor: pointer
  transition: opacity .2s

#add > img
  width: 35pt
  margin: 5pt

#add > img:hover
  opacity: 0.7

#add > img:active
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

#overlay
  position: absolute
  left: 100%
  bottom: 0
  background-color: #fcfcfc
  border-radius: 2pt
  border: 1px solid #ebebeb
  margin: 3pt

#overlay > b
  display: block
  margin: 5pt

#overlay > div
  padding: 10pt 5pt
  font-size: 0.8em
  border-bottom: 1px solid #dedede

#overlay input
  margin: 10pt 5pt
  padding: 5pt
  background-color: #fcfcfc
  border-radius: 2pt
  border: 1px solid #dedede
  
#overlay > div:hover
  background-color: #dedede

</style>
