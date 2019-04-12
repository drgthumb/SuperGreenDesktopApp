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
    <div v-if='!controller.found' :id='$style.loading'>
      <Loading :label='`Searching controller.. ${controller.found_try.value}/3`' />
      <a v-if='failed' href='javascript:void(0)'>Retry now</a>
    </div>
    <div v-else v-for='(box, i) in controller.boxes'>
      <Box :i='i' :controller='controller' :box='box' :key='controller.broker_clientid.value + i' />
    </div>
  </section>
</template>

<script>
import Box from '../components/box'
import Loading from '../components/loading'

export default {
  data() {
    return {
      failed: false,
    }
  },
  components: { Box, Loading, },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
  },
  async mounted() {
    const controller = this.$store.getters['controllers/getSelected']
    if (controller && controller.found == false) {
      try {
        this.$data.failed = false
        await this.$store.dispatch('controllers/search_controller', {id: controller.broker_clientid.value})
      } catch(e) {
        this.$data.failed = true
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('controllers/init')
    await store.dispatch('liveviews/init')
    await store.dispatch('graphs/init')
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: relative
  flex: 1
  flex-direction: column
  background-color: #efefef
  overflow-y: auto

#container > div
  max-width: 700pt


#loading
  display: flex
  flex: 1
  flex-direction: column
  align-items: center
  justify-content: center
  position: relative


</style>
