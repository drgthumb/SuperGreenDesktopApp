<template>
  <section :id='$style.container'>
    <b>Monitoring</b>
    <div :id='$style.graphs'>
    </div>
  </section>
</template>

<script>
export default {
  props: [ 'i', 'box', 'controller' ]
}
</script>

<style module lang=stylus>

#container
  flex: 1

#graphs
  display: flex

</style>
