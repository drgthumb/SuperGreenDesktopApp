<template>
  <section :id='$style.container'>
    <nuxt-link v-if='to' :to='to'>{{ label }} &gt;</nuxt-link>
    <a v-else-if='onClick' href='javascript:void(0)' v-on:click='onClick()'>{{ label }} &gt;</a>
    <span v-else>{{ label }} &gt;</span>
  </section>
</template>

<script>
export default {
  props: {
    'onClick': Function,
    'to': String, 
    'label': {
      type: String,
      default: 'Next',
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  padding: 5pt

#container > a
  color: #5dbd37
  text-decoration: none
  font-size: 15pt
  font-weight: bold
  transition: opacity 0.2s

#container > a:hover
  opacity: 0.3

</style>
