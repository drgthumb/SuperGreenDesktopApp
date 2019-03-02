<template>
  <section :id='$style.container'>
    <div :id='$style.list'>
      
    </div>
    <nuxt-link to="/welcome">New</nuxt-link>
  </section>
</template>

<script>
export default {
}
</script>

<style module lang=stylus>
#container
  display: flex
  height: 100%
  justify-content: space-between
  flex-direction: column

#list ul
  padding: 3pt 10pt
  list-style: none

#list p
  text-align: center
  margin: 0 10pt 40pt 10pt
  padding: 15pt 5pt 10pt 5pt
  font-weight: bold
  border-bottom: 1px solid #efefef

</style>
