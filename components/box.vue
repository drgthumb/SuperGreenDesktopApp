<template>
  <section :id='$style.container'>
  </section>
</template>

<script>
export default {
  props: [ 'box' ]
}
</script>

<style module lang=stylus>

#container
  display: flex

</style>
