<template>
  <section :id='$style.container'>
    <nuxt-link :to='to'>Next &gt;</nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['to'],
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

</style>
