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
    {{ controller.device_name.value }}
    <Box v-for='(box, i) in controller.boxes' :i='i' :controller='controller' :box='box' :key='i' />
  </section>
</template>

<script>
import Box from '../components/box'

export default {
  components: { Box },
  computed: {
    controller() {
      return this.$store.getters['controllers/getSelected']
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex: 1
  flex-direction: column
  min-height: 100vh
  background-color: #efefef
  padding: 20pt

</style>
