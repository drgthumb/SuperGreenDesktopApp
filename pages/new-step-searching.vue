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
    <section :id='$style.top'>
      <CloseButton />
    </section>
    <section :id='$style.body'>
      <img src="~/assets/img/loading.png">
      <h3>Pease wait...</h3>
      <small>Probing {{ retries }} / 5</small>
    </section>
  </section>
</template>

<script>
import CloseButton from '../components/closebutton'
import NextButton from '../components/nextbutton'

export default {
  components: { CloseButton, NextButton, },
  layout: 'fullscreen',
  mounted() {
    this.$store.dispatch('controllers/search_ap_controller')
  },
  computed: {
    retries() {
      return this.$store.state.controllers.search_n_tries
    },
  },
  created() {
    this.$store.watch(state => state.controllers.searching_ap, () => {
      const state = this.$store.state.controllers
      if (state.searching_ap == true) {
        return
      }
      if (state.found_ap_controller != null) {
        this.$router.push('/new-step-found')
      } else if (state.search_ap_failed) {
        this.$router.push('/new-step-notfound')
      }
    })
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#top
  display: flex
  justify-content: flex-end

#body
  display: flex
  flex-direction: column
  flex: 1
  justify-content: center
  align-items: center
  text-align: center

#body img
  max-height: 200pt
  padding-bottom: 50pt

#nav
  display: flex
  justify-content: flex-end

</style>
