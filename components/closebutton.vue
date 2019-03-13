<template>
  <section :id='$style.container'>
    <nuxt-link to='/'>
      <img src='~/assets/img/remove-timelapse.svg' />
    </nuxt-link>
  </section>
</template>

<script>
export default {
}
</script>

<style module lang=stylus>

#container
  display: flex
  padding: 5pt

#container > a > img
  text-decoration: none
  transition: opacity 0.2s

#container > a:hover > img
  opacity: 0.3

</style>
