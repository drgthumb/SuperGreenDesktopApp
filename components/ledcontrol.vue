<template>
  <section :id='$style.container'>
    <b>{{ j + 1 }}</b>
    <div :id='$style.box'>
      <img :src='led.duty.value > 5 ? "~/assets/img/lighton.svg" : "~/assets/img/lightoff.svg"' />
      <b>{{ led.duty.value }}%</b>
    </div>
  </section>
</template>

<script>
export default {
  props: [ 'i', 'box', 'controller', 'j', 'led' ]
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin: 10pt

#container > b
  align-self: flex-start

#box
  display: flex
  flex-direction: column
  background-color: white
  border: 1px solid #ebebeb
  color: #8b8b8b
  align-items: center
  justify-content: center

#box > img
  width: 25pt
  height: 25pt
  align-self: flex-end 

</style>
