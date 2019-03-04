<template>
  <section :id='$style.container'>
    <b>Live view</b>
    <div :id='$style.liveviews'>
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

#liveviews
  display: flex

</style>
