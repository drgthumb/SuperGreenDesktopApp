<template>
  <section :id='$style.container'>
    <nuxt-link :to='to'>{{ label }} &gt;</nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
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
  color: #5DBD37
  text-decoration: none
  font-size: 15pt
  font-weight: bold
  transition: opacity 0.2s

#container > a:hover
  opacity: 0.3

</style>
