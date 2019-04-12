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
  <section v-if='controller' :id='$style.container'>
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <h1>New box detected.</h1>
    <h3>Connect your computer back to the wifi network</h3>
    <small>Check that the <div :id='$style.ssid'></div> is not back, it means wifi configuration failed. If it is back on, please connect to it, and <a href='javascript:void(0)' v-on:click='goBack'>go back to previous step</a></small>
    <Loading v-if='loading' />
    <a v-else href='javascript:void()' v-on:click='waitOnline'>Oups, did you try turning it off and back on again ? then click here to retry.</a>
    <section :id='$style.body'>
    </section>
    <section :id='$style.nav'>
      <NextButton  :onClick='saveWifi' label='Connect wifi' />
    </section>
  </section>
</template>

<script>
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'
import Loading from '../components/loading'

export default {
  data() {
    return {
      loading: false,
      failed: true,
    }
  },
  components: { CloseButton, NextButton, Loading, },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
  },
  methods: {
    async waitOnline() {
      this.$data.failed = false
      this.$data.loading = true
      try {
        await this.$store.dispatch('controllers/set_controller_param', {id: controller.broker_clientid.value, key: 'wifi_ssid', value: this.$data.ssid}) 
      } catch(e) {
        console.log(e)
        this.$data.failed = true
      }
      this.$data.loading = false
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: relative
  align-items: center
  justify-content: center
  flex: 1
  flex-direction: column
  min-height: 100vh

#top
  display: flex
  justify-content: flex-end
  align-self: flex-end
  margin-bottom: 10pt

#body
  display: flex
  flex-direction: column
  flex: 1
  padding: 20pt
  align-items: center
  justify-content: center

#body > img
  margin: 10pt

#body > small
  color: #e84a4a
  padding: 5pt 0 20pt 0

#body > input
  width: 100%
  margin-bottom: 10pt

#nav
  display: flex
  justify-content: flex-end
  width: 100%

</style>
