<template>
  <section :id='$style.container' :class='(selected ? $style.selected : "")'>
    <h2>{{ title }}</h2>
    <div :id='$style.iconw'>
      <img :src='require(`~/assets/img/presets/${icon}`)' />
    </div>
    <p>{{ description }}</p>
  </section>
</template>

<script>
export default {
  props: [ 'id', 'title', 'icon', 'description', 'selected' ],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  border: 1pt solid #b4b4b4
  border-radius: 2pt
  text-align: center
  padding: 10pt
  box-sizing: border-box
  align-items: center
  max-width: 250pt
  width: 90%
  height: 80%
  transition: border .2s, opacity .2s
  opacity: 0.5

.selected
  border: 3pt solid #3bb30b !important
  opacity: 1 !important

#iconw
  flex: 1
  display: flex
  align-items: center
  justify-content: center

#iconw > img
  width: auto
  height: auto

</style>
