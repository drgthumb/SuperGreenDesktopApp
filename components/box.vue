<template>
  <section :id='$style.container'>
    <b>Box {{ i+1 }}</b>
  </section>
</template>

<script>
export default {
  props: [ 'i', 'box', 'controller' ]
}
</script>

<style module lang=stylus>

#container
  display: flex
  background-color: white
  margin: 5pt 0
  padding: 10pt

</style>
