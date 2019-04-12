<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <section :id='$style.container'>
    <div :id='$style.body'>
      <h1 v-if='i == 0'>Bloom box<span :class='$style.grey'> - 34th day</span></h1>
      <h1 v-else>Veg box {{ i }}<span :class='$style.grey'> - 34th day</span></h1>
      <div :id='$style.controls'>
        <div :class='$style.left_body'>
          <BoxControl :i='i' :box='box' :controller='controller' />
        </div>
        <div :class='$style.right_body' :id='$style.monitoring'>
          <BoxMonitoring :i='i' :box='box' :controller='controller' />
          <BoxLiveview :i='i' :box='box' :controller='controller' />
        </div>
      </div>
    </div>
    <div v-if='!box.enabled.value' :id='$style.disabled_overlay'>
      <button v-on:click='enable()'>Enable</button>
      <Loading v-if='box.enabled.loading' />
    </div>
  </section>
</template>

<script>
import BoxControl from '../components/boxcontrol'
import BoxMonitoring from '../components/boxmonitoring'
import BoxLiveview from '../components/boxliveview'
import Loading from '../components/loading'

export default {
  components: { BoxControl, BoxMonitoring, BoxLiveview, Loading, },
  props: [ 'i', 'box', 'controller' ],
  methods: {
    enable() {
       const { 
          i, box, controller,
        } = this.$props
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'enabled', value: 1}) 
        this.$store.dispatch('controllers/set_box_param', {id: controller.broker_clientid.value, i, key: 'timer_type', value: 1}) 
    },
  }
}
</script>

<style module lang=stylus>

#container
  position: relative
  margin: 20pt
  background-color: white
  border-radius: 2pt

#body
  display: flex
  padding: 10pt
  flex-direction: column

.grey
  font-size: 0.8em
  color: #B1B1B1

#controls
  display: flex

.left_body
  flex: 0.7
  max-width: 250pt

.right_body
  flex: 1

#disabled_overlay
  position: absolute
  display: flex
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.8)
  z-index: 5
  align-items: center
  justify-content: center

#disabled_overlay > button
  background-color: #3bb30b
  border: none
  padding: 5pt 20pt
  border-radius: 3pt
  color: white
  cursor: pointer
  
</style>
